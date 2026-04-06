import { client, YACHTS_QUERY } from "@/sanity/lib/client";
import YachtCatalogue from "@/components/catalogue/YachtCatalogue";
import type { Metadata } from "next";
import { generateAlternates } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: "Location yachts de luxe à Dubaï — Privatisez votre yacht",
    en: "Luxury yacht rental in Dubai — Private charter",
    ru: "Аренда роскошных яхт в Дубае — приватный чартер",
  };
  const descs: Record<string, string> = {
    fr: "Louez un yacht de luxe à Dubaï pour une journée ou plus. Yachts privés avec équipage, livraison au port — réservation rapide sur WhatsApp.",
    en: "Rent a luxury yacht in Dubai for a day or more. Private yachts with crew, port delivery — quick booking on WhatsApp.",
    ru: "Арендуйте роскошную яхту в Дубае на день и более. Частные яхты с экипажем — быстрое бронирование через WhatsApp.",
  };
  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
    alternates: generateAlternates(locale, "/yachts"),
  };
}

export default async function YachtsPage() {
  const yachts = await client.fetch(YACHTS_QUERY);
  return <YachtCatalogue yachts={yachts} />;
}
