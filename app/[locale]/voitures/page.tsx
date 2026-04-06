import { getTranslations } from "next-intl/server";
import { client, VEHICLES_QUERY } from "@/sanity/lib/client";
import VehicleCatalogue from "@/components/catalogue/VehicleCatalogue";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: "Catalogue voitures de luxe | Dubai",
    en: "Luxury car catalogue | Dubai",
    ru: "Каталог роскошных автомобилей | Дубай",
  };
  return { title: titles[locale] ?? titles.fr };
}

export default async function VoituresPage({ params }: { params: Promise<{ locale: string }> }) {
  const vehicles = await client.fetch(VEHICLES_QUERY);
  return <VehicleCatalogue vehicles={vehicles} />;
}
