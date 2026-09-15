"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const t = useTranslations("whatsapp");
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

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        hidden ? "translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      <a
        href="https://api.whatsapp.com/send/?phone=971581515981&text=Hello%2C%20I%27m%20contacting%20you%20from%20your%20website&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("tooltip")}
        className="relative flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 shadow-md shadow-[#25D366]/20 transition-all duration-300 hover:scale-105 hover:shadow-[#25D366]/40"
        onClick={() => {
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "conversion", {
              send_to: "AW-18438884789/QSeNCI3evvgcELWbrNhE",
            });
          }
        }}
      >
        <FaWhatsapp className="h-6 w-6 shrink-0 text-white" />
        <span className="text-sm font-medium text-white whitespace-nowrap">
          {t("cta")}
        </span>
      </a>
    </div>
  );
}
