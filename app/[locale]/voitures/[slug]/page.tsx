import { client, VEHICLE_BY_SLUG_QUERY, urlFor } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/ui/JsonLd";
import Badge from "@/components/ui/Badge";
import PhotoGallery from "@/components/catalogue/PhotoGallery";
import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await client.fetch(VEHICLE_BY_SLUG_QUERY, { slug });
  if (!vehicle) return {};
  return {
    title: `${vehicle.name} — Location Dubai`,
    description: `Louer le ${vehicle.name} à Dubai. ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`,
    openGraph: vehicle.photos?.[0] ? { images: [urlFor(vehicle.photos[0]).width(1200).height(630).url()] } : undefined,
  };
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations("cars");
  const vehicle = await client.fetch(VEHICLE_BY_SLUG_QUERY, { slug });
  if (!vehicle) notFound();

  const whatsappMsg = encodeURIComponent(`${t("whatsapp_msg")} ${vehicle.name}`);
  const description = vehicle.description?.[locale] ?? vehicle.description?.fr ?? "";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    brand: { "@type": "Brand", name: vehicle.brand },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };

  const photos = (vehicle.photos ?? []).map((photo: any, i: number) => ({
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
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-xs tracking-[0.4em] text-[#888888] uppercase">{vehicle.brand}</p>
              <h1 className="font-display mt-2 text-4xl font-light text-[#F5F5F0] md:text-5xl">{vehicle.name}</h1>
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
                    <p className="mt-1 text-[#F5F5F0] capitalize">{spec.value ?? "—"}</p>
                  </div>
                ))}
              </div>
              {description && (
                <>
                  <div className="gold-separator my-8" />
                  <p className="text-[#888888] leading-relaxed">{description}</p>
                </>
              )}
            </div>

            {/* Booking sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 border border-[#222222] p-8">
                <p className="text-xs tracking-widest text-[#888888] uppercase">{t("booking")}</p>
                <p className="font-display mt-2 text-xl text-[#C9A84C]">{t("on_request")}</p>
                <a
                  href={`https://wa.me/971581515981?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex w-full items-center justify-center gap-3 bg-[#C9A84C] py-4 text-sm tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#E8D08A]"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  {t("book_cta")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
