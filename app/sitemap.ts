import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE_URL = "https://www.justdubaiconciergerie.com";
const LOCALES = ["fr", "en", "ru"];

const STATIC_PATHS = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/voitures", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/yachts", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/prestations", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/fidelite", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/qui-sommes-nous", priority: 0.6, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [vehicles, yachts, posts] = await Promise.all([
    client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "vehicle"] { "slug": slug.current, _updatedAt }`
    ),
    client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "yacht"] { "slug": slug.current, _updatedAt }`
    ),
    client.fetch<{ slug: string; publishedAt?: string; _updatedAt: string }[]>(
      `*[_type == "blogPost"] { "slug": slug.current, publishedAt, _updatedAt }`
    ),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of STATIC_PATHS) {
    for (const locale of LOCALES) {
      entries.push({ url: `${BASE_URL}/${locale}${path}`, lastModified: now, priority, changeFrequency });
    }
  }

  for (const vehicle of vehicles) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/voitures/${vehicle.slug}`,
        lastModified: vehicle._updatedAt ? new Date(vehicle._updatedAt) : now,
        priority: 0.7,
        changeFrequency: "monthly",
      });
    }
  }

  for (const yacht of yachts) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/yachts/${yacht.slug}`,
        lastModified: yacht._updatedAt ? new Date(yacht._updatedAt) : now,
        priority: 0.7,
        changeFrequency: "monthly",
      });
    }
  }

  for (const post of posts) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : post._updatedAt ? new Date(post._updatedAt) : now,
        priority: 0.6,
        changeFrequency: "monthly",
      });
    }
  }

  return entries;
}
