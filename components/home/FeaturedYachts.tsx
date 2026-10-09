"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import YachtCard, { yachtSortPrice } from "@/components/catalogue/YachtCard";
import WhatsAppHelpBlock from "@/components/whatsapp/WhatsAppHelpBlock";
import type { Yacht } from "@/types/sanity";

export default function FeaturedYachts({ yachts }: { yachts: Yacht[] }) {
  const t = useTranslations();
  const locale = useLocale();
  // Du moins cher au plus cher, comme sur le catalogue.
  const sorted = [...yachts].sort((a, b) => yachtSortPrice(a) - yachtSortPrice(b));
  const shown = sorted.slice(0, sorted.length >= 8 ? 8 : Math.min(4, sorted.length));

  return (
    <section className="bg-[#111111] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("yachts.label")}</p>
            <h2 className="font-display text-3xl font-light text-[#F5F5F0] sm:text-4xl md:text-5xl">
              {t("home.featured_yachts")}
            </h2>
          </div>
          <Link href={`/${locale}/yachts`} className="self-start text-sm tracking-widest text-[#888888] hover:text-[#C9A84C] sm:self-auto">
            {t("common.view_all")} →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {shown.map((yacht, i) => (
            <motion.div
              key={yacht._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="h-full"
            >
              <YachtCard yacht={yacht} compact placement="home_featured" headingLevel="h3" />
            </motion.div>
          ))}
        </div>

        <WhatsAppHelpBlock
          className="mt-8 sm:mt-12"
          title={t("cro.yachts_help_title")}
          desc={t("cro.yachts_help_desc")}
          cta={t("cro.yachts_help_cta")}
          message={t("wa_msg.yachts_help")}
          service="yacht"
          placement="home_yachts_help"
        />
      </div>
    </section>
  );
}
