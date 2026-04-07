import type { ImageLoaderProps } from "next/image";

export default function sanityLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.delete("fm");
  url.searchParams.delete("h");
  return url.toString();
}

