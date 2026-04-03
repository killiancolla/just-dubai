"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { urlFor } from "@/sanity/lib/client";
import Badge from "@/components/ui/Badge";

interface Yacht {
  _id: string;
  name: string;
  slug: { current: string };
  lengthMeters: number;
  capacity: number;
  mainPhoto: any;
}

export default function FeaturedYachts({ yachts }: { yachts: Yacht[] }) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="bg-[#111111] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Mer</p>
            <h2 className="font-display text-4xl font-light text-[#F5F5F0] md:text-5xl">
              {t("home.featured_yachts")}
            </h2>
          </div>
          <Link href={`/${locale}/yachts`} className="hidden text-sm tracking-widest text-[#888888] hover:text-[#C9A84C] sm:block">
            {t("common.view_all")} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {yachts.map((yacht, i) => (
            <motion.div
              key={yacht._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/${locale}/yachts/${yacht.slug.current}`} className="luxury-card group block bg-[#0A0A0A]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {yacht.mainPhoto ? (
                    <Image
                      src={urlFor(yacht.mainPhoto).width(600).height(450).url()}
                      alt={yacht.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#1a1a1a]">
                      <span className="text-[#444]">Photo bientôt disponible</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs tracking-widest text-[#888888] uppercase">{yacht.lengthMeters}m · {yacht.capacity} pers.</p>
                  <h3 className="font-display mt-1 text-xl text-[#F5F5F0]">{yacht.name}</h3>
                  <div className="mt-4">
                    <span className="text-xs text-[#C9A84C] tracking-widest uppercase">Sur devis</span>
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
