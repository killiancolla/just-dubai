import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return { title: "Prestations incluses — JustDubai" };
}

const services = [
  {
    key: "delivery",
    titleKey: "delivery_title",
    descKey: "delivery_desc",
    detailKey: "delivery_detail",
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={0.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    key: "no_deposit",
    titleKey: "no_deposit_title",
    descKey: "no_deposit_desc",
    detailKey: "no_deposit_detail",
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={0.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    key: "whatsapp",
    titleKey: "whatsapp_title",
    descKey: "whatsapp_desc",
    detailKey: "whatsapp_detail",
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={0.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    key: "maintenance",
    titleKey: "maintenance_title",
    descKey: "maintenance_desc",
    detailKey: "maintenance_detail",
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={0.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
];

export default async function PrestationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("services");

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="border-b border-[#222222] bg-[#111111] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Services</p>
          <h1 className="font-display text-4xl font-light text-[#F5F5F0] md:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-[#888888]">{t("subtitle")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="space-y-16">
          {services.map((s, i) => (
            <div
              key={s.key}
              className={`flex flex-col gap-10 lg:flex-row ${i % 2 === 1 ? "lg:flex-row-reverse" : ""} items-center`}
            >
              <div className="flex-1 border border-[#222222] p-12 text-center">
                <div className="mb-6 flex justify-center text-[#C9A84C]">{s.icon}</div>
                <p className="text-xs tracking-widest text-[#888888] uppercase">{t("label")}</p>
              </div>
              <div className="flex-1">
                <h2 className="font-display text-3xl font-light text-[#F5F5F0]">{t(s.titleKey as any)}</h2>
                <div className="gold-separator my-6 w-24" />
                <p className="text-lg leading-relaxed text-[#888888]">{t(s.descKey as any)}</p>
                <p className="mt-4 text-sm text-[#C9A84C]">{t(s.detailKey as any)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 border border-[#222222] p-12 text-center">
          <h2 className="font-display mb-4 text-3xl font-light text-[#F5F5F0]">{t("cta_title")}</h2>
          <p className="mb-8 text-[#888888]">{t("cta_desc")}</p>
          <a
            href="https://wa.me/971581515981"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C9A84C] px-8 py-4 text-sm tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#E8D08A]"
          >
            {t("cta_btn")}
          </a>
        </div>
      </div>
    </div>
  );
}
