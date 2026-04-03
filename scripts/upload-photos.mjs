#!/usr/bin/env node
/**
 * upload-photos.mjs
 * Scrape gallery images from partner sites and upload to Sanity
 * Run: node scripts/upload-photos.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

// ── Load .env.local ───────────────────────────────────────────────────────────
const envContent = readFileSync(".env.local", "utf-8");
const env = Object.fromEntries(
  envContent
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => {
      const [k, ...v] = l.split("=");
      return [k.trim(), v.join("=").trim()];
    })
);

const sanity = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
};

// ── Parse scrapping.txt ───────────────────────────────────────────────────────
function parseScrapping() {
  const html = readFileSync("scrapping.txt", "utf-8");
  const vehicles = [];
  const yachtUrls = [];

  // ── Vehicles (vipcarrental.ae) ────────────────────────────────────────────
  const blocks = html.split('<div class="custom-card-new">');
  for (const block of blocks.slice(1)) {
    const brand = block.match(/<p class="tag-name bank-bold"[^>]*>\s*([^<]+)\s*<\/p>/)?.[1]?.trim();
    const model = block.match(/<p class="model-name bank-bold"[^>]*>\s*([^<]+)\s*<\/p>/)?.[1]?.trim();
    const detailUrl = block.match(/href="(https:\/\/www\.vipcarrental\.ae\/[^"]+)"/)?.[1];
    const mainImg = block.match(/class="img-car-home w-100"[^>]*src="([^"]+)"/)?.[1];

    if (brand && model) {
      vehicles.push({
        brand: brand.replace(/\s+/g, " "),
        model: model.replace(/\s+/g, " "),
        detailUrl,
        mainImg,
      });
    }
  }

  // ── Yachts (revoluxrentals.com) ───────────────────────────────────────────
  const yachtRegex = /href="(https:\/\/revoluxrentals\.com\/catalog\/[^"]+)"/g;
  let m;
  const seen = new Set();
  while ((m = yachtRegex.exec(html)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      yachtUrls.push(m[1]);
    }
  }

  return { vehicles, yachtUrls };
}

// ── Fetch gallery URLs from a vipcarrental.ae detail page ─────────────────────
async function fetchVipGallery(url) {
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return [];
    const html = await res.text();

    const imgs = new Set();
    // Full-res webp (no size suffix like -300x, -768x, -64x)
    const re = /src="(https:\/\/www\.vipcarrental\.ae\/wp-content\/uploads\/[^"]+\.webp)"/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      const u = m[1];
      if (!/-\d+x\d+-/.test(u) && !u.includes("-64x") && !u.includes("-300x")) {
        imgs.add(u);
      }
    }
    return [...imgs].slice(0, 10);
  } catch {
    return [];
  }
}

// ── Fetch gallery URLs from a revoluxrentals.com detail page ──────────────────
async function fetchRevoluxGallery(url) {
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return [];
    const html = await res.text();

    const imgs = new Set();
    // Look for high-res uploads (not thumbnails)
    const re = /src="(https:\/\/revoluxrentals\.com\/wp-content\/uploads\/[^"]+\.(?:jpg|webp|jpeg))"/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      const u = m[1];
      // Keep full-size images, skip thumbnail sizes
      if (!/-\d{2,3}x\d{2,3}\./.test(u)) {
        imgs.add(u);
      }
    }

    // Fallback: keep 768x432 if nothing better
    if (imgs.size === 0) {
      const re2 = /src="(https:\/\/revoluxrentals\.com\/wp-content\/uploads\/[^"]+\.(?:jpg|webp|jpeg))"/g;
      while ((m = re2.exec(html)) !== null) {
        imgs.add(m[1]);
      }
    }

    return [...imgs].slice(0, 10);
  } catch {
    return [];
  }
}

// ── Download + upload one image to Sanity ────────────────────────────────────
async function uploadImage(imageUrl) {
  const isVip = imageUrl.includes("vipcarrental.ae");
  const isRevolux = imageUrl.includes("revoluxrentals.com");
  const referer = isVip
    ? "https://www.vipcarrental.ae/"
    : isRevolux
    ? "https://revoluxrentals.com/"
    : undefined;

  const headers = { ...HEADERS };
  if (referer) {
    headers["Referer"] = referer;
    headers["Origin"] = referer.replace(/\/$/, "");
  }

  const res = await fetch(imageUrl, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${imageUrl}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`Image trop petite (${buf.length}b), probablement bloquée`);
  const filename = imageUrl.split("/").pop().split("?")[0];
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const asset = await sanity.assets.upload("image", buf, { filename, contentType });
  return asset._id;
}

// ── Patch Sanity doc with photo refs ─────────────────────────────────────────
async function patchPhotos(docId, assetIds) {
  const photos = assetIds.map((id) => ({
    _type: "image",
    _key: id.replace("image-", "").substring(0, 12),
    asset: { _type: "reference", _ref: id },
  }));
  await sanity.patch(docId).set({ photos }).commit();
}

// ── Word-level fuzzy matching ─────────────────────────────────────────────────
function tokenize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, " ").split(/\s+/).filter(Boolean);
}

function matchVehicle(vehicle, scrapped) {
  const targetSet = new Set(tokenize(`${vehicle.brand} ${vehicle.model}`));
  let best = null;
  let bestScore = 0;

  for (const s of scrapped) {
    const candidateTokens = tokenize(`${s.brand} ${s.model}`);
    const shared = candidateTokens.filter((w) => targetSet.has(w)).length;

    // Require at least 2 words in common to avoid false positives
    if (shared < 2) continue;

    // Score = proportion of candidate words found in target
    const score = shared / candidateTokens.length;
    if (score > bestScore) {
      bestScore = score;
      best = s;
    }
  }

  return bestScore >= 0.65 ? best : null;
}

function matchYacht(yacht, yachtUrls) {
  // Slug from yacht name: "Ambrosia 80" → "ambrosia-80"
  const slug = yacht.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return yachtUrls.find((u) => u.includes(slug)) || null;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("📋 Parsing scrapping.txt…");
  const { vehicles: scrapped, yachtUrls } = parseScrapping();
  console.log(`  ${scrapped.length} vehicles, ${yachtUrls.length} yacht URLs found`);

  // ── VEHICLES ──────────────────────────────────────────────────────────────
  console.log("\n🚗 Processing vehicles…");
  const vehicles = await sanity.fetch(
    '*[_type == "vehicle" && !(_id in path("drafts.**"))]{_id, name, brand, model, "hasPhotos": count(photos) > 0}'
  );

  for (const v of vehicles) {
    if (v.hasPhotos) {
      console.log(`  ⏭  ${v.name} (déjà des photos)`);
      continue;
    }

    const match = matchVehicle(v, scrapped);
    if (!match) {
      console.log(`  ❌ Pas de match : ${v.name}`);
      continue;
    }

    process.stdout.write(`  🔍 ${v.name} → ${match.brand} ${match.model} … `);

    let urls = [];
    if (match.detailUrl) {
      urls = await fetchVipGallery(match.detailUrl);
      await sleep(800);
    }
    if (urls.length === 0 && match.mainImg) urls = [match.mainImg];
    if (urls.length === 0) {
      console.log("aucune image");
      continue;
    }

    const ids = [];
    for (const url of urls) {
      try {
        ids.push(await uploadImage(url));
        process.stdout.write("✓");
        await sleep(200);
      } catch (e) {
        process.stdout.write("✗");
        if (process.env.DEBUG) console.error(`\n    [ERR] ${e.message}`);
      }
    }

    if (ids.length) {
      await patchPhotos(v._id, ids);
      console.log(` → ${ids.length} photo(s)`);
    } else {
      console.log(" → échec upload");
    }
    await sleep(400);
  }

  // ── YACHTS ────────────────────────────────────────────────────────────────
  console.log("\n⛵ Processing yachts…");
  const yachts = await sanity.fetch(
    '*[_type == "yacht" && !(_id in path("drafts.**"))]{_id, name, "hasPhotos": count(photos) > 0}'
  );

  for (const y of yachts) {
    if (y.hasPhotos) {
      console.log(`  ⏭  ${y.name} (déjà des photos)`);
      continue;
    }

    const detailUrl = matchYacht(y, yachtUrls);
    if (!detailUrl) {
      console.log(`  ❌ Pas de match : ${y.name}`);
      continue;
    }

    process.stdout.write(`  🔍 ${y.name} … `);

    const urls = await fetchRevoluxGallery(detailUrl);
    await sleep(800);

    if (urls.length === 0) {
      console.log("aucune image");
      continue;
    }

    const ids = [];
    for (const url of urls) {
      try {
        ids.push(await uploadImage(url));
        process.stdout.write("✓");
        await sleep(200);
      } catch (e) {
        process.stdout.write("✗");
        if (process.env.DEBUG) console.error(`\n    [ERR] ${e.message}`);
      }
    }

    if (ids.length) {
      await patchPhotos(y._id, ids);
      console.log(` → ${ids.length} photo(s)`);
    } else {
      console.log(" → échec upload");
    }
    await sleep(400);
  }

  console.log("\n✅ Terminé !");
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
