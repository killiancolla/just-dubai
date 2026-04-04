"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Truck, BadgeCheck, MessageCircle, Wrench } from "lucide-react";

const services = [
  { key: "delivery", icon: <Truck className="h-10 w-10" strokeWidth={0.8} /> },
  { key: "no_deposit", icon: <BadgeCheck className="h-10 w-10" strokeWidth={0.8} /> },
  { key: "whatsapp", icon: <MessageCircle className="h-10 w-10" strokeWidth={0.8} /> },
  { key: "maintenance", icon: <Wrench className="h-10 w-10" strokeWidth={0.8} /> },
];

export default function ServicesTeaser() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Services</p>
          <h2 className="font-display text-4xl font-light text-[#1A1A1A] md:text-5xl">{t("home.services_title")}</h2>
          <p className="mt-4 text-[#666666]">{t("home.services_subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-[#E0D8C8] p-8"
            >
              <div className="mb-5 text-[#C9A84C]">{s.icon}</div>
              <h3 className="font-display mb-2 text-xl text-[#1A1A1A]">{t(`services.${s.key}_title`)}</h3>
              <p className="text-sm leading-relaxed text-[#666666]">{t(`services.${s.key}_desc`)}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/prestations`}
            className="inline-flex items-center gap-2 border border-[#C9A84C] px-8 py-3 text-sm tracking-widest text-[#C9A84C] transition-colors hover:bg-[#C9A84C] hover:text-[#0A0A0A]"
          >
            {t("home.services_cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
