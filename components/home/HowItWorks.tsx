"use client";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";

/** Trois étapes pour lever le doute « comment ça se passe ? » avant le contact. */
export default function HowItWorks() {
  const t = useTranslations("cro");
  const tMsg = useTranslations("wa_msg");
  const steps = [1, 2, 3] as const;

  return (
    <section className="bg-[#0A0A0A] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-14">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("how_label")}</p>
          <h2 className="font-display text-3xl font-light text-[#F5F5F0] sm:text-4xl md:text-5xl">{t("how_title")}</h2>
        </div>
        <ol className="grid grid-cols-1 gap-px bg-[#222222] md:grid-cols-3">
          {steps.map((n) => (
            <li key={n} className="flex gap-5 bg-[#0A0A0A] p-6 md:flex-col md:gap-4 md:p-8">
              <span className="font-display text-4xl leading-none text-[#C9A84C] md:text-5xl">0{n}</span>
              <div>
                <h3 className="font-display text-xl text-[#F5F5F0]">{t(`how_${n}_title`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#9A9A9A]">{t(`how_${n}_desc`)}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <WhatsAppLink
            message={tMsg("general")}
            service="general"
            placement="home_how"
            className="inline-flex w-full items-center justify-center gap-3 bg-[#C9A84C] px-8 py-4 text-sm tracking-wider text-[#0A0A0A] transition-colors hover:bg-[#E8D08A] sm:w-auto"
          >
            <FaWhatsapp className="h-5 w-5 shrink-0" />
            {t("hero_cta_whatsapp")}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
