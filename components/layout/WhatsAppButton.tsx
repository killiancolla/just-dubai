"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";
import type { WhatsAppService } from "@/lib/whatsapp";

/** Fiches produit : elles ont leur propre barre de réservation sticky. */
const DETAIL_PAGE = /^\/(fr|en|ru)\/(voitures|yachts)\/[^/]+\/?$/;

export default function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const tMsg = useTranslations("wa_msg");
  const pathname = usePathname() ?? "";
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      setHidden(scrolledToBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (DETAIL_PAGE.test(pathname)) return null;

  // Message adapté à la section consultée.
  let service: WhatsAppService = "general";
  let message = tMsg("general");
  if (/\/voitures\/?$/.test(pathname)) {
    service = "car";
    message = tMsg("cars");
  } else if (/\/yachts\/?$/.test(pathname)) {
    service = "yacht";
    message = tMsg("yachts");
  } else if (/\/fidelite\/?$/.test(pathname)) {
    service = "loyalty";
    message = tMsg("loyalty");
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 sm:bottom-6 sm:right-6 ${
        hidden ? "translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      <WhatsAppLink
        message={message}
        service={service}
        placement="floating"
        ariaLabel={t("tooltip")}
        className="relative flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 shadow-md shadow-[#25D366]/20 transition-all duration-300 hover:scale-105 hover:shadow-[#25D366]/40 sm:gap-3 sm:px-5 sm:py-3.5"
      >
        <FaWhatsapp className="h-6 w-6 shrink-0 text-white" />
        <span className="text-sm font-medium text-white whitespace-nowrap">{t("cta")}</span>
      </WhatsAppLink>
    </div>
  );
}
