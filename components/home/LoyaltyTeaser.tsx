"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const statuses = [
  { key: "silver", color: "#A8A8A8" },
  { key: "gold", color: "#C9A84C" },
  { key: "platinum", color: "#E8D08A" },
] as const;

export default function LoyaltyTeaser() {
  const t = useTranslations("loyalty");
  const tc = useTranslations("club");
  const locale = useLocale();

  return (
    <section className="bg-[#F5F0E8] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("label")}</p>
          <h2 className="font-display text-4xl font-light text-[#1A1A1A] md:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-[#666666]">{t("subtitle")}</p>
        </div>

        <div className="relative flex flex-col lg:flex-row divide-y divide-[#E0D8C8] lg:divide-y-0 lg:divide-x border border-[#E0D8C8]">
          {statuses.map((status, i) => (
            <motion.div
              key={status.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex-1 bg-white p-8"
            >
              <p className="font-display text-2xl font-light" style={{ color: status.color }}>
                {tc(`${status.key}_name`)}
              </p>
              <p className="mb-4 text-xs text-[#888888]">
                {tc("from")} {tc(`${status.key}_trigger`)}
              </p>
              <p className="text-sm leading-relaxed text-[#1A1A1A]">{tc(`${status.key}_desc`)}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/fidelite`}
            className="inline-flex items-center gap-2 border border-[#C9A84C] px-8 py-3 text-sm tracking-widest text-[#C9A84C] transition-colors hover:bg-[#C9A84C] hover:text-[#0A0A0A]"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
