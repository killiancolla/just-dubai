import { client, YACHT_BY_SLUG_QUERY, urlFor } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/ui/JsonLd";
import Badge from "@/components/ui/Badge";
import PhotoGallery from "@/components/catalogue/PhotoGallery";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const yacht = await client.fetch(YACHT_BY_SLUG_QUERY, { slug });
  if (!yacht) return {};
  return {
    title: `${yacht.name} — Yacht Dubai`,
    description: `Louer le yacht ${yacht.name} à Dubai. ${yacht.lengthMeters}m, ${yacht.capacity} personnes.`,
    openGraph: yacht.photos?.[0] ? { images: [urlFor(yacht.photos[0]).width(1200).height(630).url()] } : undefined,
  };
}

export default async function YachtDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations("yachts");
  const yacht = await client.fetch(YACHT_BY_SLUG_QUERY, { slug });
  if (!yacht) notFound();

  const whatsappMsg = encodeURIComponent(`${t("whatsapp_msg")} ${yacht.name}`);
  const description = yacht.description?.[locale] ?? yacht.description?.fr ?? "";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: yacht.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };

  const photos = (yacht.photos ?? []).map((photo: any, i: number) => ({
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
                  { label: "Longueur", value: `${yacht.lengthMeters}m` },
                  { label: "Capacité", value: `${yacht.capacity} pers.` },
                ].map((spec) => (
                  <div key={spec.label}>
                    <p className="text-xs tracking-widest text-[#888888] uppercase">{spec.label}</p>
                    <p className="mt-1 text-[#F5F5F0]">{spec.value ?? "—"}</p>
                  </div>
                ))}
              </div>
              {yacht.amenities?.length > 0 && (
                <>
                  <div className="gold-separator my-8" />
                  <p className="mb-4 text-xs tracking-widest text-[#888888] uppercase">Équipements</p>
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
                <p className="text-xs tracking-widest text-[#888888] uppercase">Réservation</p>
                <p className="font-display mt-2 text-xl text-[#C9A84C]">Sur devis</p>
                <a
                  href={`https://wa.me/971581515981?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex w-full items-center justify-center gap-3 bg-[#C9A84C] py-4 text-sm tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#E8D08A]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.524 5.851L.057 23.7a.5.5 0 0 0 .623.622l5.947-1.462A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.897 0-3.67-.515-5.192-1.414l-.372-.22-3.53.868.893-3.43-.243-.384A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
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
