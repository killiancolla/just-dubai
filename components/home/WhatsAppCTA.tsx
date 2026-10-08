"use client";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";

/** Bandeau doré de conversion — utilisé en fin de Home, juste avant le footer. */
export default function WhatsAppCTA() {
  const t = useTranslations("whatsapp");
  const tCro = useTranslations("cro");
  const tMsg = useTranslations("wa_msg");

  return (
    <section className="bg-[#C9A84C] px-5 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-xs tracking-[0.4em] text-[#0A0A0A] uppercase">{t("availability")}</p>
        <h2 className="font-display mb-8 text-3xl font-light text-[#0A0A0A] md:text-4xl">{t("cta_title")}</h2>
        <WhatsAppLink
          message={tMsg("general")}
          service="general"
          placement="home_final"
          className="inline-flex w-full items-center justify-center gap-3 bg-[#0A0A0A] px-8 py-4 text-sm tracking-wider text-[#F5F5F0] transition-opacity hover:opacity-80 sm:w-auto sm:tracking-widest"
        >
          <FaWhatsapp className="h-5 w-5 shrink-0" />
          {tCro("hero_cta_whatsapp")}
        </WhatsAppLink>
      </div>
    </section>
  );
}
