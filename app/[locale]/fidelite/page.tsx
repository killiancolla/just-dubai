import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("club");
  return { title: t("meta_title") };
}

export const revalidate = 60;

const SILVER_COLOR = "#A8A8A8";
const GOLD_COLOR = "#C9A84C";
const PLATINUM_COLOR = "#E8D08A";

export default async function ClubPage() {
  const t = await getTranslations("club");

  const tiers = [
    {
      name: t("silver_name"),
      trigger: t("silver_trigger"),
      desc: t("silver_desc"),
      color: SILVER_COLOR,
      generalPerks: [t("silver_general_1"), t("silver_general_2")],
      carPerks: [t("silver_car_1"), t("silver_car_2"), t("silver_car_3")],
      yachtPerks: [t("silver_yacht_1"), t("silver_yacht_2"), t("silver_yacht_3")],
    },
    {
      name: t("gold_name"),
      trigger: t("gold_trigger"),
      desc: t("gold_desc"),
      color: GOLD_COLOR,
      generalPerks: [t("gold_general_1"), t("gold_general_2")],
      carPerks: [t("gold_car_1"), t("gold_car_2"), t("gold_car_3")],
      yachtPerks: [t("gold_yacht_1"), t("gold_yacht_2"), t("gold_yacht_3")],
    },
    {
      name: t("platinum_name"),
      trigger: t("platinum_trigger"),
      desc: t("platinum_desc"),
      color: PLATINUM_COLOR,
      generalPerks: [t("platinum_general_1"), t("platinum_general_2"), t("platinum_general_3")],
      carPerks: [t("platinum_car_1"), t("platinum_car_2"), t("platinum_car_3")],
      yachtPerks: [t("platinum_yacht_1"), t("platinum_yacht_2"), t("platinum_yacht_3")],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-end overflow-hidden pt-20">
        {/* Split background images */}
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="relative overflow-hidden">
            <Image
              src="/club/dubai-left.jpg"
              alt="Dubaï — skyline"
              fill
              className="object-cover brightness-75"
              priority
            />
            <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-r from-transparent to-[#0A0A0A]" />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/club/dubai-right.jpg"
              alt="Dubaï — waterfront"
              fill
              className="object-cover brightness-75"
              priority
            />
            <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-l from-transparent to-[#0A0A0A]" />
          </div>
        </div>

        {/* Top + bottom fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]/95" />

        {/* Decorative vertical gold line */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C9A84C]/25 to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24">
          <p className="mb-4 text-xs tracking-[0.5em] text-[#C9A84C] uppercase">
            {t("hero_label")}
          </p>
          <h1 className="font-display mb-6 text-6xl font-light tracking-tight text-[#F5F5F0] md:text-8xl">
            {t("hero_title")}
          </h1>
          <p className="mb-10 max-w-lg text-lg leading-relaxed text-[#AAAAAA]">
            {t("hero_tagline")}
          </p>
          <a
            href="https://wa.me/971581515981"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C9A84C] px-10 py-4 text-sm tracking-widest text-[#0A0A0A] uppercase transition-colors hover:bg-[#E8D08A]"
          >
            {t("hero_cta")}
          </a>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <section className="border-b border-[#1A1A1A] px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs tracking-[0.5em] text-[#C9A84C] uppercase">
            {t("intro_label")}
          </p>
          <h2 className="font-display mb-8 text-4xl font-light text-[#F5F5F0] md:text-5xl">
            {t("intro_title")}
          </h2>
          <p className="text-lg leading-relaxed text-[#888888]">{t("intro_desc")}</p>
        </div>
      </section>

      {/* ── STATUTS ──────────────────────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs tracking-[0.5em] text-[#C9A84C] uppercase">
              {t("status_label")}
            </p>
            <h2 className="font-display mb-4 text-4xl font-light text-[#F5F5F0] md:text-5xl">
              {t("status_title")}
            </h2>
            <p className="text-[#666666]">{t("status_subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#1A1A1A] lg:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.name} className="relative flex flex-col bg-[#0A0A0A] p-8 md:p-10">
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: tier.color }} />

                {/* Badge */}
                <div className="mb-6">
                  <span
                    className="inline-block border px-4 py-1 text-xs tracking-[0.3em] uppercase"
                    style={{ borderColor: tier.color, color: tier.color }}
                  >
                    {tier.name}
                  </span>
                </div>

                {/* Trigger */}
                <p className="mb-3 text-xs tracking-widest text-[#555555] uppercase">
                  {t("from")} {tier.trigger}
                </p>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-[#888888]">{tier.desc}</p>

                {/* General perks */}
                <ul className="mb-6 space-y-2">
                  {tier.generalPerks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-medium" style={{ color: tier.color }}>
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: tier.color }} />
                      {perk}
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="gold-separator mb-6" />

                {/* Car perks */}
                <div className="mb-6">
                  <p className="mb-3 flex items-center gap-2 text-xs tracking-widest text-[#F5F5F0] uppercase">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
                      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11l5 5v5h-2m-10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4M7 9h4" />
                    </svg>
                    {t("cars_perks")}
                  </p>
                  <ul className="space-y-2">
                    {tier.carPerks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#777777]">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#333333]" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Yacht perks */}
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs tracking-widest text-[#F5F5F0] uppercase">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
                      <path d="M3 17l4-8 4 4 4-6 4 10H3z" />
                      <path d="M3 21h18" />
                    </svg>
                    {t("yachts_perks")}
                  </p>
                  <ul className="space-y-2">
                    {tier.yachtPerks.filter(Boolean).map((perk, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#777777]">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#333333]" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────── */}
      <section className="px-6 pb-32 pt-8">
        <div className="mx-auto max-w-4xl border border-[#C9A84C] p-12 text-center md:p-20">
          <p className="mb-3 text-xs tracking-[0.5em] text-[#C9A84C] uppercase">
            {t("join_label")}
          </p>
          <h2 className="font-display mb-6 text-4xl font-light text-[#F5F5F0] md:text-5xl">
            {t("join_title")}
          </h2>
          <p className="mb-10 text-[#888888]">{t("join_desc")}</p>
          <a
            href="https://wa.me/971581515981"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C9A84C] px-10 py-4 text-sm tracking-widest text-[#0A0A0A] uppercase transition-colors hover:bg-[#E8D08A]"
          >
            {t("join_cta")}
          </a>
        </div>
      </section>
    </div>
  );
}
