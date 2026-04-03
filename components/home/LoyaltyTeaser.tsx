"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const tiers = [
  { points: 700, key: "tier_1_reward" },
  { points: 1500, key: "tier_2_reward" },
  { points: 3000, key: "tier_3_reward" },
  { points: 4500, key: "tier_4_reward" },
];

export default function LoyaltyTeaser() {
  const t = useTranslations("loyalty");
  const locale = useLocale();

  return (
    <section className="bg-[#F5F0E8] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("label")}</p>
          <h2 className="font-display text-4xl font-light text-[#1A1A1A] md:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-[#666666]">{t("subtitle")}</p>
        </div>

        {/* Stepper */}
        <div className="relative flex flex-col gap-0 lg:flex-row">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex-1 border border-[#E0D8C8] bg-white p-8"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A84C] text-xs text-[#C9A84C]">
                {i + 1}
              </div>
              <p className="font-display text-2xl text-[#C9A84C]">{tier.points.toLocaleString("fr-FR")}</p>
              <p className="text-xs text-[#888888]">{t("points")}</p>
              <p className="mt-3 text-sm text-[#1A1A1A]">{t(tier.key as any)}</p>
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
