import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { generateAlternates } from "@/lib/seo";
import { FaWhatsapp } from "react-icons/fa";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: "Prestations incluses — Livraison, sans caution, WhatsApp",
    en: "Included services — Delivery, no deposit, WhatsApp",
    ru: "Включённые услуги — доставка, без залога, WhatsApp",
  };
  return {
    title: titles[locale] ?? titles.fr,
    alternates: generateAlternates(locale, "/prestations"),
  };
}

const services = [
  {
    key: "delivery",
    titleKey: "delivery_title",
    descKey: "delivery_desc",
    detailKey: "delivery_detail",
    image: "/services/delivery.jpg",
  },
  {
    key: "no_deposit",
    titleKey: "no_deposit_title",
    descKey: "no_deposit_desc",
    detailKey: "no_deposit_detail",
    image: "/services/no-deposit.jpg",
  },
  {
    key: "whatsapp",
    titleKey: "whatsapp_title",
    descKey: "whatsapp_desc",
    detailKey: "whatsapp_detail",
    image: "/services/whatsapp.jpg",
  },
  {
    key: "maintenance",
    titleKey: "maintenance_title",
    descKey: "maintenance_desc",
    detailKey: "maintenance_detail",
    image: "/services/maintenance.jpg",
  },
];

export default async function PrestationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("services");
  const tCro = await getTranslations("cro");
  const tMsg = await getTranslations("wa_msg");

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="border-b border-[#222222] bg-[#111111] px-5 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Services</p>
          <h1 className="font-display text-3xl font-light text-[#F5F5F0] sm:text-4xl md:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-[#888888]">{t("subtitle")}</p>
          <WhatsAppLink
            message={tMsg("general")}
            service="general"
            placement="services_header"
            className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-[#C9A84C] px-8 py-4 text-sm tracking-wider text-[#0A0A0A] transition-colors hover:bg-[#E8D08A] sm:w-auto"
          >
            <FaWhatsapp className="h-5 w-5 shrink-0" />
            {tCro("hero_cta_whatsapp")}
          </WhatsAppLink>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="space-y-16">
          {services.map((s, i) => (
            <div
              key={s.key}
              className={`flex flex-col gap-10 lg:flex-row ${i % 2 === 1 ? "lg:flex-row-reverse" : ""} items-center`}
            >
              <div className="relative aspect-4/3 w-full flex-1 overflow-hidden border border-[#222222]">
                <Image
                  src={s.image}
                  alt={t(s.titleKey as Parameters<typeof t>[0])}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-3xl font-light text-[#F5F5F0]">{t(s.titleKey as Parameters<typeof t>[0])}</h2>
                <div className="gold-separator my-6 w-24" />
                <p className="text-lg leading-relaxed text-[#888888]">{t(s.descKey as Parameters<typeof t>[0])}</p>
                <p className="mt-4 text-sm text-[#C9A84C]">{t(s.detailKey as Parameters<typeof t>[0])}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-[#222222] p-6 text-center sm:mt-20 sm:p-12">
          <h2 className="font-display mb-4 text-3xl font-light text-[#F5F5F0]">{t("cta_title")}</h2>
          <p className="mb-8 text-[#888888]">{t("cta_desc")}</p>
          <WhatsAppLink
            message={tMsg("general")}
            service="general"
            placement="services_footer"
            className="inline-flex w-full items-center justify-center gap-3 bg-[#C9A84C] px-8 py-4 text-sm tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#E8D08A] sm:w-auto"
          >
            <FaWhatsapp className="h-5 w-5 shrink-0" />
            {t("cta_btn")}
          </WhatsAppLink>
        </div>
      </div>
    </div>
  );
}
