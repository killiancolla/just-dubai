"use client";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppCTA() {
  const t = useTranslations("whatsapp");

  return (
    <section className="bg-[#C9A84C] py-16 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-xs tracking-[0.4em] text-[#0A0A0A] uppercase">
          {t("availability")}
        </p>
        <h2 className="font-display mb-8 text-3xl font-light text-[#0A0A0A] md:text-4xl">
          {t("cta_title")}
        </h2>
        <a
          href="https://wa.me/971581515981"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#0A0A0A] px-8 py-4 text-sm tracking-widest text-[#F5F5F0] transition-opacity hover:opacity-80"
        >
          <FaWhatsapp className="h-5 w-5 shrink-0" />
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
