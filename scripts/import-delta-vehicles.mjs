#!/usr/bin/env node
/**
 * import-delta-vehicles.mjs
 * Parse deltarentalsdubai.com vehicles from scrapping.txt and import to Sanity
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const envContent = readFileSync(".env.local", "utf-8");
const env = Object.fromEntries(
  envContent.split("\n").filter((l) => l.includes("=") && !l.startsWith("#")).map((l) => {
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
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
  Referer: "https://deltarentalsdubai.com/",
  Origin: "https://deltarentalsdubai.com",
};

// Known brands for parsing
const BRANDS = [
  "Aston Martin", "Rolls Royce", "Range Rover", "Land Rover",
  "Lamborghini", "Mercedes", "Ferrari", "Porsche", "McLaren",
  "Bentley", "Bugatti", "Maserati", "Cadillac", "Chevrolet",
  "Lotus", "Tesla", "Audi", "BMW", "GMC", "Gmc", "Bmw",
];

function parseBrandModel(name) {
  for (const brand of BRANDS) {
    if (name.toLowerCase().startsWith(brand.toLowerCase())) {
      const model = name.slice(brand.length).trim();
      // Normalize brand casing
      const normalized = BRANDS.find(b => b.toLowerCase() === brand.toLowerCase()) || brand;
      return { brand: normalized, model };
    }
  }
  // Fallback: first word is brand
  const [brand, ...rest] = name.split(" ");
  return { brand, model: rest.join(" ") };
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Extract full-size image URL from srcset string
function bestImageFromSrcset(srcset) {
  if (!srcset) return null;
  const entries = srcset.split(",").map(s => s.trim());
  // Take the largest (last) or the one without size suffix
  let best = null;
  for (const entry of entries) {
    const [url] = entry.split(/\s+/);
    if (!/-\d{2,4}x\d{2,4}\./.test(url)) return url; // full size
    best = url; // keep last as fallback
  }
  return best;
}

function parseVehiclesFromHtml(html) {
  const vehicles = [];
  // Split by loop-item divs that contain deltarentalsdubai links
  const blocks = html.split(/(?=<div data-elementor-type="loop-item"[^>]*class="[^"]*e-loop-item)/);

  for (const block of blocks) {
    if (!block.includes("deltarentalsdubai.com/catalog/")) continue;

    // Name + URL
    const nameMatch = block.match(/<h2 class="elementor-heading-title[^"]*"><a href="(https:\/\/deltarentalsdubai\.com\/catalog\/[^"]+)"[^>]*>([^<]+)<\/a><\/h2>/);
    if (!nameMatch) continue;

    const detailUrl = nameMatch[1];
    const name = nameMatch[2].trim();

    // 0-deposit
    const depositRequired = !block.includes("0-deposit");

    // Photos — extract full-size from srcsets in this block
    const photos = new Set();
    const imgRegex = /srcset="([^"]+)"/g;
    let m;
    while ((m = imgRegex.exec(block)) !== null) {
      const url = bestImageFromSrcset(m[1]);
      if (url && url.includes("deltarentalsdubai.com")) photos.add(url);
    }
    // Also grab plain src from img tags (full size often in src when no size suffix)
    const srcRegex = /src="(https:\/\/deltarentalsdubai\.com\/wp-content\/uploads\/[^"]+\.(?:jpg|jpeg|webp|png))"/g;
    while ((m = srcRegex.exec(block)) !== null) {
      if (!/-\d{2,4}x\d{2,4}\./.test(m[1])) photos.add(m[1]);
    }

    vehicles.push({ name, detailUrl, depositRequired, photos: [...photos].slice(0, 10) });
  }

  return vehicles;
}

async function uploadImage(imageUrl) {
  const res = await fetch(imageUrl, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`Trop petite (${buf.length}b)`);
  const filename = imageUrl.split("/").pop().split("?")[0];
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const asset = await sanity.assets.upload("image", buf, { filename, contentType });
  return asset._id;
}

async function main() {
  console.log("📋 Parsing scrapping.txt…");
  const html = readFileSync("scrapping.txt", "utf-8");
  const vehicles = parseVehiclesFromHtml(html);
  console.log(`  ${vehicles.length} véhicules delta trouvés`);

  // Get existing slugs to avoid duplicates
  const existing = await sanity.fetch('*[_type == "vehicle" && !(_id in path("drafts.**"))]{slug}');
  const existingSlugs = new Set(existing.map(v => v.slug?.current).filter(Boolean));

  let created = 0, skipped = 0;

  for (const v of vehicles) {
    const { brand, model } = parseBrandModel(v.name);
    const slug = slugify(v.name);

    if (existingSlugs.has(slug)) {
      console.log(`  ⏭  ${v.name} (existe déjà)`);
      skipped++;
      continue;
    }

    process.stdout.write(`  ✨ ${v.name} … `);

    // Upload photos
    const photoIds = [];
    for (const url of v.photos) {
      try {
        photoIds.push(await uploadImage(url));
        process.stdout.write("✓");
        await sleep(200);
      } catch (e) {
        process.stdout.write("✗");
        if (process.env.DEBUG) console.error(`\n    [ERR] ${e.message}`);
      }
    }

    // Create document
    const doc = {
      _type: "vehicle",
      name: v.name,
      slug: { _type: "slug", current: slug },
      brand,
      model,
      depositRequired: v.depositRequired,
      featured: false,
    };

    if (photoIds.length > 0) {
      doc.photos = photoIds.map((id) => ({
        _type: "image",
        _key: id.replace("image-", "").substring(0, 12),
        asset: { _type: "reference", _ref: id },
      }));
    }

    try {
      await sanity.create(doc);
      existingSlugs.add(slug);
      created++;
      console.log(` → créé (${photoIds.length} photo(s))`);
    } catch (e) {
      console.log(` → échec création: ${e.message}`);
    }

    await sleep(400);
  }

  console.log(`\n✅ Terminé — ${created} créés, ${skipped} ignorés`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
