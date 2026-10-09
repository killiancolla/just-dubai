"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import VehicleCard from "@/components/catalogue/VehicleCard";
import WhatsAppHelpBlock from "@/components/whatsapp/WhatsAppHelpBlock";
import type { Vehicle } from "@/types/sanity";

interface Props {
  vehicles: Vehicle[];
}

export default function FeaturedVehicles({ vehicles }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  // Nombre pair de cartes pour éviter une carte orpheline en grille 2 / 4 colonnes.
  const shown = vehicles.slice(0, vehicles.length >= 8 ? 8 : Math.min(4, vehicles.length));

  return (
    <section className="bg-[#F5F0E8] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
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
          {shown.map((vehicle, i) => (
            <motion.div
              key={vehicle._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="h-full"
            >
              <VehicleCard vehicle={vehicle} tone="light" compact placement="home_featured" headingLevel="h3" />
            </motion.div>
          ))}
        </div>

        <WhatsAppHelpBlock
          className="mt-8 sm:mt-12"
          variant="light"
          title={t("cro.cars_more_title")}
          desc={t("cro.cars_more_desc")}
          cta={t("cro.cars_more_cta")}
          message={t("wa_msg.car_model")}
          service="car"
          placement="home_cars_more"
        />
      </div>
    </section>
  );
}
