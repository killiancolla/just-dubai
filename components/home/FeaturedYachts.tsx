"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { urlFor } from "@/sanity/lib/client";
import PriceDisplay from "@/components/ui/PriceDisplay";
import Badge from "@/components/ui/Badge";

interface Yacht {
  _id: string;
  name: string;
  slug: { current: string };
  lengthMeters: number;
  capacity: number;
  pricePerDay?: number;
  mainPhoto: any;
}

export default function FeaturedYachts({ yachts }: { yachts: Yacht[] }) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="bg-[#111111] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("yachts.label")}</p>
            <h2 className="font-display text-3xl font-light text-[#F5F5F0] sm:text-4xl md:text-5xl">
              {t("home.featured_yachts")}
            </h2>
          </div>
          <Link href={`/${locale}/yachts`} className="self-start text-sm tracking-widests text-[#888888] hover:text-[#C9A84C] sm:self-auto">
            {t("common.view_all")} →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {yachts.map((yacht, i) => (
            <motion.div
              key={yacht._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="h-full"
            >
              <Link href={`/${locale}/yachts/${yacht.slug.current}`} className="luxury-card group flex h-full flex-col bg-[#0A0A0A]">
                <div className="relative aspect-4/3 shrink-0 overflow-hidden">
                  {yacht.mainPhoto ? (
                    <Image
                      src={urlFor(yacht.mainPhoto).width(600).height(450).url()}
                      alt={yacht.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#1a1a1a]">
                      <span className="text-[#888888]">{t("common.photo_soon")}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <p className="text-xs tracking-widest text-[#888888] uppercase">{yacht.lengthMeters}m · {yacht.capacity} pers.</p>
                  <h3 className="font-display mt-0.5 text-base text-[#F5F5F0] sm:mt-1 sm:text-xl">{yacht.name}</h3>
                  <div className="mt-auto pt-2 sm:pt-4">
                    {yacht.pricePerDay ? (
                      <span className="text-xs text-[#C9A84C]"><PriceDisplay aed={yacht.pricePerDay} /> {t("yachts.per_day")}</span>
                    ) : (
                      <span className="text-xs text-[#C9A84C] tracking-widest uppercase">{t("yachts.on_request")}</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
