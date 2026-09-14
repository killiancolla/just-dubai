"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { urlFor } from "@/sanity/lib/client";
import PriceDisplay from "@/components/ui/PriceDisplay";
import type { Vehicle } from "@/types/sanity";

interface Props {
  vehicles: Vehicle[];
}

export default function FeaturedVehicles({ vehicles }: Props) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="bg-[#F5F0E8] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("cars.label")}</p>
            <h2 className="font-display text-3xl font-light text-[#1A1A1A] sm:text-4xl md:text-5xl">
              {t("home.featured_cars")}
            </h2>
          </div>
          <Link href={`/${locale}/voitures`} className="self-start text-sm tracking-widest text-[#666666] underline-offset-4 hover:text-[#C9A84C] sm:self-auto">
            {t("common.view_all")} →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {vehicles.map((vehicle, i) => (
            <motion.div
              key={vehicle._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="h-full"
            >
              <Link href={`/${locale}/voitures/${vehicle.slug.current}`} className="luxury-card group flex h-full flex-col bg-white">
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                  {vehicle.mainPhoto ? (
                    <Image
                      src={urlFor(vehicle.mainPhoto).width(600).height(450).url()}
                      alt={vehicle.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#EDE8DF]">
                      <span className="text-[#999]">{t("common.photo_soon")}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <p className="text-xs tracking-widest text-[#888888] uppercase">{vehicle.brand}</p>
                  <h3 className="font-display mt-0.5 text-base text-[#1A1A1A] sm:mt-1 sm:text-xl">{vehicle.name}</h3>
                  <div className="mt-auto flex flex-col gap-0.5 pt-2 sm:flex-row sm:items-center sm:justify-between sm:pt-4">
                    {vehicle.pricePerDay ? (
                      <span className="text-xs text-[#C9A84C]"><PriceDisplay aed={vehicle.pricePerDay} /> {t("cars.per_day")}</span>
                    ) : (
                      <span className="text-xs text-[#C9A84C] tracking-widest uppercase">{t("cars.on_request")}</span>
                    )}
                    <span className="text-xs text-[#888888]">{vehicle.year}</span>
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
