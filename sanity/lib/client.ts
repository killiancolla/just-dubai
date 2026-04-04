import { createClient } from "@sanity/client";
import { createImageUrlBuilder as imageUrlBuilder } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "../env";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Queries
export const VEHICLES_QUERY = `*[_type == "vehicle"] | order(name asc) {
  _id,
  name,
  slug,
  brand,
  model,
  year,
  fuel,
  transmission,
  seats,
  pricePerDay,
  featured,
  "mainPhoto": photos[0],
  "description": description
}`;

export const FEATURED_VEHICLES_QUERY = `*[_type == "vehicle" && featured == true][0...4] {
  _id,
  name,
  slug,
  brand,
  model,
  year,
  pricePerDay,
  "mainPhoto": photos[0]
}`;

export const VEHICLE_BY_SLUG_QUERY = `*[_type == "vehicle" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  brand,
  model,
  year,
  fuel,
  transmission,
  seats,
  pricePerDay,
  featured,
  photos,
  description
}`;

export const YACHTS_QUERY = `*[_type == "yacht"] | order(name asc) {
  _id,
  name,
  slug,
  lengthMeters,
  capacity,
  pricePerDay,
  featured,
  amenities,
  "mainPhoto": photos[0],
  description
}`;

export const FEATURED_YACHTS_QUERY = `*[_type == "yacht" && featured == true][0...4] {
  _id,
  name,
  slug,
  lengthMeters,
  capacity,
  pricePerDay,
  "mainPhoto": photos[0]
}`;

export const YACHT_BY_SLUG_QUERY = `*[_type == "yacht" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  lengthMeters,
  capacity,
  pricePerDay,
  featured,
  amenities,
  photos,
  description
}`;

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  coverImage,
  excerpt,
  categories
}`;

export const LATEST_BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  publishedAt,
  coverImage,
  excerpt,
  categories
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  coverImage,
  excerpt,
  body,
  categories,
  seo
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  aboutContent,
  aboutImage
}`;
