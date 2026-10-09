"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Truck, BadgeCheck, MessageCircle, Wrench } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";

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
    <section className="bg-white px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-16">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("reassurance.label")}</p>
          <h2 className="font-display text-3xl font-light text-[#1A1A1A] sm:text-4xl md:text-5xl">{t("home.reassurance_title")}</h2>
          <p className="mt-4 text-[#666666]">{t("home.services_subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-[#E0D8C8] p-4 sm:p-8"
            >
              <div className="mb-3 text-[#C9A84C] sm:mb-5 [&_svg]:h-8 [&_svg]:w-8 sm:[&_svg]:h-10 sm:[&_svg]:w-10">{s.icon}</div>
              <h3 className="font-display mb-1.5 text-lg leading-snug text-[#1A1A1A] sm:mb-2 sm:text-xl">{t(`services.${s.key}_title`)}</h3>
              <p className="text-xs leading-relaxed text-[#666666] sm:text-sm">{t(`services.${s.key}_desc`)}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
          <WhatsAppLink
            message={t("wa_msg.general")}
            service="general"
            placement="home_why"
            className="inline-flex items-center justify-center gap-3 bg-[#C9A84C] px-8 py-3.5 text-sm tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#E8D08A]"
          >
            <FaWhatsapp className="h-4 w-4 shrink-0" />
            {t("cro.why_cta")}
          </WhatsAppLink>
          <Link
            href={`/${locale}/prestations`}
            className="inline-flex items-center justify-center gap-2 border border-[#C9A84C] px-8 py-3.5 text-sm tracking-widest text-[#9A7B2C] transition-colors hover:bg-[#C9A84C] hover:text-[#0A0A0A]"
          >
            {t("home.services_cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
