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

export const FEATURED_VEHICLES_QUERY = `*[_type == "vehicle" && featured == true] {
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
  "lengthFeet": coalesce(lengthFeet, lengthMeters),
  capacity,
  pricePerHour,
  pricePerDay,
  featured,
  amenities,
  "mainPhoto": photos[0],
  description
}`;

export const FEATURED_YACHTS_QUERY = `*[_type == "yacht" && featured == true] {
  _id,
  name,
  slug,
  "lengthFeet": coalesce(lengthFeet, lengthMeters),
  capacity,
  pricePerHour,
  pricePerDay,
  "mainPhoto": photos[0]
}`;

export const YACHT_BY_SLUG_QUERY = `*[_type == "yacht" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  "lengthFeet": coalesce(lengthFeet, lengthMeters),
  capacity,
  pricePerHour,
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

export const SOCIAL_PROOF_QUERY = `*[_type == "siteSettings"][0] {
  "socialProof": socialProof
}`;

export const FAQ_QUERY = `*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer
}`;

export const LEGAL_PAGE_QUERY = `*[_type == "legalPage" && pageId == $pageId][0] {
  title,
  content
}`;
