import { client, YACHTS_QUERY } from "@/sanity/lib/client";
import YachtCatalogue from "@/components/catalogue/YachtCatalogue";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: "Catalogue yachts de luxe — Dubai",
    en: "Luxury yacht catalogue — Dubai",
    ru: "Каталог роскошных яхт — Дубай",
  };
  return { title: titles[locale] ?? titles.fr };
}

export default async function YachtsPage() {
  const yachts = await client.fetch(YACHTS_QUERY);
  return <YachtCatalogue yachts={yachts} />;
}
