import { client, VEHICLE_BY_SLUG_QUERY, urlFor } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/ui/JsonLd";
import PhotoGallery from "@/components/catalogue/PhotoGallery";
import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";
import DetailBookingCTA from "@/components/catalogue/DetailBookingCTA";
import PriceDisplay from "@/components/ui/PriceDisplay";
import { generateAlternates } from "@/lib/seo";
import type { Locale } from "@/types/sanity";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const vehicle = await client.fetch(VEHICLE_BY_SLUG_QUERY, { slug });
  if (!vehicle) return {};
  const yearPart = vehicle.year ? ` ${vehicle.year}` : "";
  // FR inchangé (déjà indexé) ; EN et RU ont désormais leur propre title/description.
  const titles: Record<string, string> = {
    fr: `${vehicle.name} | Location Dubai`,
    en: `${vehicle.name} | Rent in Dubai`,
    ru: `${vehicle.name} | Аренда в Дубае`,
  };
  const descriptions: Record<string, string> = {
    fr: `Louez le ${vehicle.brand} ${vehicle.model}${yearPart} à Dubaï avec JustDubai. Livraison 24/7 dans tout Dubaï, réservation rapide sur WhatsApp, sans caution ni frais cachés.`,
    en: `Rent the ${vehicle.brand} ${vehicle.model}${yearPart} in Dubai with JustDubai. 24/7 delivery anywhere in Dubai, quick booking on WhatsApp, no deposit and no hidden fees.`,
    ru: `Аренда ${vehicle.brand} ${vehicle.model}${yearPart} в Дубае с JustDubai. Доставка 24/7 по всему Дубаю, быстрое бронирование в WhatsApp, без залога и скрытых платежей.`,
  };
  const title = titles[locale] ?? titles.fr;
  const description = descriptions[locale] ?? descriptions.fr;
  return {
    title,
    description,
    alternates: generateAlternates(locale, `/voitures/${slug}`),
    openGraph: vehicle.photos?.[0]
      ? {
          images: [urlFor(vehicle.photos[0]).width(1200).height(630).url()],
          title,
          description,
        }
      : undefined,
  };
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations("cars");
  const tCommon = await getTranslations("common");
  const tCro = await getTranslations("cro");
  const tMsg = await getTranslations("wa_msg");
  const vehicle = await client.fetch(VEHICLE_BY_SLUG_QUERY, { slug });
  if (!vehicle) notFound();

  const whatsappMsg = tMsg("car", { name: vehicle.name });
  const l = locale as Locale;
  const description = vehicle.description?.[l] ?? vehicle.description?.fr ?? "";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    brand: { "@type": "Brand", name: vehicle.brand },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      ...(vehicle.pricePerDay ? { price: vehicle.pricePerDay, priceCurrency: "AED" } : {}),
    },
  };

  const photos = (vehicle.photos ?? [])
    .filter((photo: { asset?: { _ref?: string } }) => photo?.asset?._ref)
    .map((photo: { asset: { _ref: string; _type: string }; alt?: string }, i: number) => ({
      url: urlFor(photo).url(),
      thumbUrl: urlFor(photo).width(200).height(150).url(),
      alt: `${vehicle.name} ${i + 1}`,
    }));

  return (
    <>
      <JsonLd data={productSchema} />
      <div className="min-h-screen bg-[#0A0A0A] pt-20">
        <PhotoGallery photos={photos} name={vehicle.name} />

        {/* Details */}
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-8 sm:px-6 sm:pt-12 lg:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-xs tracking-[0.4em] text-[#888888] uppercase">{vehicle.brand}</p>
              <h1 className="font-display mt-2 text-3xl font-light text-[#F5F5F0] sm:text-4xl md:text-5xl">{vehicle.name}</h1>
              <DetailBookingCTA
                service="car"
                item={vehicle.name}
                message={whatsappMsg}
                prices={vehicle.pricePerDay ? [{ aed: vehicle.pricePerDay, prefix: tCommon("starting_from"), suffix: t("per_day") }] : []}
                onRequestLabel={t("on_request")}
                ctaLabel={tCro("check_availability")}
                shortCtaLabel={tCro("availability_short")}
                reassurance={tCro("reassure_car")}
              />
              <div className="gold-separator my-8" />
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {[
                  { label: t("spec_brand"), value: vehicle.brand },
                  { label: t("spec_model"), value: vehicle.model },
                  { label: t("spec_year"), value: vehicle.year },
                  { label: t("spec_fuel"), value: vehicle.fuel },
                  { label: t("spec_transmission"), value: vehicle.transmission },
                  { label: t("spec_seats"), value: vehicle.seats },
                ].map((spec) => (
                  <div key={spec.label}>
                    <p className="text-xs tracking-widest text-[#888888] uppercase">{spec.label}</p>
                    <p className="mt-1 text-[#F5F5F0] capitalize">{spec.value ?? "-"}</p>
                  </div>
                ))}
              </div>
              {description && (
                <>
                  <div className="gold-separator my-8" />
                  <p className="text-[#888888] leading-relaxed">{description}</p>
                </>
              )}
              <Link
                href={`/${locale}/voitures`}
                className="mt-10 inline-block text-xs tracking-widest text-[#888888] uppercase hover:text-[#C9A84C]"
              >
                ← {tCro("back_cars")}
              </Link>
            </div>

            {/* Booking sidebar */}
            <div className="hidden lg:col-span-1 lg:block">
              <div className="sticky top-24 border border-[#222222] p-8">
                <p className="text-xs tracking-widest text-[#888888] uppercase">{t("booking")}</p>
                {vehicle.pricePerDay ? (
                  <p className="font-display mt-2 text-xl text-[#C9A84C]">{tCommon("starting_from")} <PriceDisplay aed={vehicle.pricePerDay} /> {t("per_day")}</p>
                ) : (
                  <p className="font-display mt-2 text-xl text-[#C9A84C]">{t("on_request")}</p>
                )}
                <WhatsAppLink
                  message={whatsappMsg}
                  service="car"
                  placement="detail_sidebar"
                  item={vehicle.name}
                  className="mt-8 flex w-full items-center justify-center gap-3 bg-[#C9A84C] py-4 text-sm tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#E8D08A]"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  {tCro("check_availability")}
                </WhatsAppLink>
                <p className="mt-4 text-center text-xs leading-relaxed text-[#888888]">{tCro("reassure_car")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
