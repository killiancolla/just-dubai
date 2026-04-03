"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { urlFor } from "@/sanity/lib/client";

interface Vehicle {
  _id: string;
  name: string;
  slug: { current: string };
  brand: string;
  model: string;
  year: number;
  mainPhoto: any;
}

interface Props {
  vehicles: Vehicle[];
}

export default function FeaturedVehicles({ vehicles }: Props) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="bg-[#F5F0E8] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Flotte</p>
            <h2 className="font-display text-4xl font-light text-[#1A1A1A] md:text-5xl">
              {t("home.featured_cars")}
            </h2>
          </div>
          <Link
            href={`/${locale}/voitures`}
            className="hidden text-sm tracking-widest text-[#666666] underline-offset-4 hover:text-[#C9A84C] sm:block"
          >
            {t("common.view_all")} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((vehicle, i) => (
            <motion.div
              key={vehicle._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/${locale}/voitures/${vehicle.slug.current}`} className="luxury-card group block bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {vehicle.mainPhoto ? (
                    <Image
                      src={urlFor(vehicle.mainPhoto).width(600).height(450).url()}
                      alt={vehicle.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#EDE8DF]">
                      <span className="text-[#999]">{t("common.photo_soon")}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs tracking-widest text-[#888888] uppercase">{vehicle.brand}</p>
                  <h3 className="font-display mt-1 text-xl text-[#1A1A1A]">{vehicle.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-[#C9A84C] tracking-widest uppercase">Sur devis</span>
                    <span className="text-xs text-[#888888]">{vehicle.year}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href={`/${locale}/voitures`} className="text-sm tracking-widest text-[#C9A84C]">
            {t("common.view_all")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
