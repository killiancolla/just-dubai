import { getTranslations } from "next-intl/server";
import { client, VEHICLES_QUERY } from "@/sanity/lib/client";
import VehicleCatalogue from "@/components/catalogue/VehicleCatalogue";
import type { Metadata } from "next";
import { generateAlternates } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: "Location voitures de luxe à Dubaï — Ferrari, Lamborghini, Rolls-Royce",
    en: "Luxury car rental in Dubai — Ferrari, Lamborghini, Rolls-Royce",
    ru: "Аренда роскошных автомобилей в Дубае — Ferrari, Lamborghini, Rolls-Royce",
  };
  const descs: Record<string, string> = {
    fr: "Découvrez notre catalogue complet de voitures de luxe à louer à Dubaï. Ferrari, Lamborghini, Range Rover, Rolls-Royce — livraison incluse, sans caution.",
    en: "Browse our full luxury car rental catalogue in Dubai. Ferrari, Lamborghini, Range Rover, Rolls-Royce — delivery included, no deposit.",
    ru: "Полный каталог аренды роскошных автомобилей в Дубае. Ferrari, Lamborghini, Range Rover, Rolls-Royce — доставка включена, без залога.",
  };
  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
    alternates: generateAlternates(locale, "/voitures"),
  };
}

export default async function VoituresPage({ params }: { params: Promise<{ locale: string }> }) {
  const vehicles = await client.fetch(VEHICLES_QUERY);
  return <VehicleCatalogue vehicles={vehicles} />;
}
