import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Programme de fidélité — JustDubai" };
}

const tiers = [
  { points: 700, rewardKey: "tier_1_reward", color: "#888888" },
  { points: 1500, rewardKey: "tier_2_reward", color: "#C9A84C" },
  { points: 3000, rewardKey: "tier_3_reward", color: "#C9A84C" },
  { points: 4500, rewardKey: "tier_4_reward", color: "#E8D08A" },
];

export default async function FidelitePage() {
  const t = await getTranslations("loyalty");

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="border-b border-[#222222] bg-[#111111] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("label")}</p>
          <h1 className="font-display text-4xl font-light text-[#F5F5F0] md:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-lg text-[#C9A84C]">{t("subtitle")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* How it works */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("how_label")}</p>
            <h2 className="font-display mb-6 text-3xl font-light text-[#F5F5F0]">{t("how_title")}</h2>
            <p className="text-lg leading-relaxed text-[#888888]">{t("how_desc")}</p>
            <div className="mt-8 border-l-2 border-[#C9A84C] pl-6">
              <p className="font-display text-2xl text-[#C9A84C]">{t("ratio")}</p>
              <p className="mt-1 text-sm text-[#888888]">{t("ratio_desc")}</p>
            </div>
          </div>
          <div className="border border-[#222222] p-8">
            <p className="mb-4 text-xs tracking-widest text-[#888888] uppercase">{t("steps_label")}</p>
            <ol className="space-y-4">
              {([t("step_1"), t("step_2"), t("step_3"), t("step_4")] as string[]).map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#C9A84C] text-xs text-[#C9A84C]">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#888888]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Tiers */}
        <div className="mb-16">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("tiers_label")}</p>
          <h2 className="font-display mb-10 text-3xl font-light text-[#F5F5F0]">{t("tiers_title")}</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier, i) => (
              <div key={i} className="border border-[#222222] p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full" style={{ background: tier.color }} />
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A84C] text-sm text-[#C9A84C]">
                  {i + 1}
                </div>
                <p className="font-display text-3xl" style={{ color: tier.color }}>
                  {tier.points.toLocaleString("fr-FR")}
                </p>
                <p className="text-xs text-[#888888]">{t("points")}</p>
                <div className="gold-separator my-4" />
                <p className="text-sm leading-relaxed text-[#F5F5F0]">{t(tier.rewardKey as any)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-[#C9A84C] p-12 text-center">
          <p className="font-display mb-4 text-3xl font-light text-[#F5F5F0]">{t("cta_title")}</p>
          <p className="mb-8 text-[#888888]">{t("cta_desc")}</p>
          <a
            href="https://wa.me/971581515981"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C9A84C] px-10 py-4 text-sm tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#E8D08A]"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </div>
  );
}
