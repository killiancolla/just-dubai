"use client";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
<a
          href="https://wa.me/971581515981"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("tooltip")}
          className="relative flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 shadow-md shadow-[#25D366]/20 transition-all duration-300 hover:scale-105 hover:shadow-[#25D366]/40"
        >
          <FaWhatsapp className="h-6 w-6 shrink-0 text-white" />
          <span className="text-sm font-medium text-white whitespace-nowrap">
            {t("cta")}
          </span>
        </a>
      </div>
    </div>
  );
}
