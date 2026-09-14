import { client, YACHT_BY_SLUG_QUERY, urlFor } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/ui/JsonLd";
import PhotoGallery from "@/components/catalogue/PhotoGallery";
import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa";
import PriceDisplay from "@/components/ui/PriceDisplay";
import Badge from "@/components/ui/Badge";
import { generateAlternates } from "@/lib/seo";
import type { Locale } from "@/types/sanity";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const yacht = await client.fetch(YACHT_BY_SLUG_QUERY, { slug });
  if (!yacht) return {};
  return {
    title: `${yacht.name} | Yacht Dubai`,
    description: `Louer le yacht ${yacht.name} à Dubai. ${yacht.lengthMeters}m, ${yacht.capacity} personnes.`,
    alternates: generateAlternates(locale, `/yachts/${slug}`),
    openGraph: yacht.photos?.[0]
      ? {
          images: [urlFor(yacht.photos[0]).width(1200).height(630).url()],
          title: `${yacht.name} | Yacht Dubai`,
          description: `Louer le yacht ${yacht.name} à Dubai. ${yacht.lengthMeters}m, ${yacht.capacity} personnes.`,
        }
      : undefined,
  };
}

export default async function YachtDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations("yachts");
  const tCommon = await getTranslations("common");
  const yacht = await client.fetch(YACHT_BY_SLUG_QUERY, { slug });
  if (!yacht) notFound();

  const whatsappMsg = encodeURIComponent(`${t("whatsapp_msg")} ${yacht.name}`);
  const l = locale as Locale;
  const description = yacht.description?.[l] ?? yacht.description?.fr ?? "";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: yacht.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };

  const photos = (yacht.photos ?? []).map((photo: { asset: { _ref: string; _type: string }; alt?: string }, i: number) => ({
    url: urlFor(photo).url(),
    thumbUrl: urlFor(photo).width(200).height(150).url(),
    alt: `${yacht.name} ${i + 1}`,
  }));

  return (
    <>
      <JsonLd data={productSchema} />
      <div className="min-h-screen bg-[#0A0A0A] pt-20">
        <PhotoGallery photos={photos} name={yacht.name} />

        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-xs tracking-[0.4em] text-[#888888] uppercase">Yacht · {yacht.lengthMeters}m</p>
              <h1 className="font-display mt-2 text-4xl font-light text-[#F5F5F0] md:text-5xl">{yacht.name}</h1>
              <div className="gold-separator my-8" />
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {[
                  { label: t("spec_length"), value: `${yacht.lengthMeters}m` },
                  { label: t("spec_capacity"), value: `${yacht.capacity} pers.` },
                ].map((spec) => (
                  <div key={spec.label}>
                    <p className="text-xs tracking-widest text-[#888888] uppercase">{spec.label}</p>
                    <p className="mt-1 text-[#F5F5F0]">{spec.value ?? "-"}</p>
                  </div>
                ))}
              </div>
              {yacht.amenities?.length > 0 && (
                <>
                  <div className="gold-separator my-8" />
                  <p className="mb-4 text-xs tracking-widest text-[#888888] uppercase">{t("equipment")}</p>
                  <div className="flex flex-wrap gap-2">
                    {yacht.amenities.map((a: string) => (
                      <Badge key={a} variant="muted">{a}</Badge>
                    ))}
                  </div>
                </>
              )}
              {description && (
                <>
                  <div className="gold-separator my-8" />
                  <p className="text-[#888888] leading-relaxed">{description}</p>
                </>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 border border-[#222222] p-8">
                <p className="text-xs tracking-widest text-[#888888] uppercase">{t("booking")}</p>
                {yacht.pricePerDay ? (
                  <p className="font-display mt-2 text-xl text-[#C9A84C]">{tCommon("starting_from")} <PriceDisplay aed={yacht.pricePerDay} /> {t("per_day")}</p>
                ) : (
                  <p className="font-display mt-2 text-xl text-[#C9A84C]">{t("on_request")}</p>
                )}
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
