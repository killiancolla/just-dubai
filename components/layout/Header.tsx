"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import CurrencyDropdown from "@/components/ui/CurrencyDropdown";
import LanguageDropdown from "@/components/ui/LanguageDropdown";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CURRENCIES, LOCALES, getLocalizedPath as buildLocalizedPath } from "@/lib/constants";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export default function Header() {
  const t = useTranslations("nav");
  const tRegion = useTranslations("region");
  const tMsg = useTranslations("wa_msg");
  const tCro = useTranslations("cro");
  const locale = useLocale();
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();

  const [menuOpen, setMenuOpen] = useState(false);
  const [deviseOpen, setDeviseOpen] = useState(false);
  const [langueOpen, setLangueOpen] = useState(false);

  function getLocalizedPath(newLocale: string) {
    return buildLocalizedPath(pathname, newLocale);
  }

  const navLinks = [
    { href: "/voitures", label: t("cars") },
    { href: "/yachts", label: t("yachts") },
    { href: "/prestations", label: t("services") },
    { href: "/fidelite", label: t("loyalty") },
    { href: "/blog", label: t("blog") },
    { href: "/qui-sommes-nous", label: t("about") },
  ];

  return (
    <header className="fixed top-0 z-40 w-full border-b border-[#222222] bg-[#0A0A0A]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href={`/${locale}`} className="flex items-center">
          <Image src="/logo.png" alt="JustDubai" width={200} height={68} className="h-14 w-auto object-contain" priority sizes="165px" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="text-sm font-light tracking-widest text-[#888888] transition-colors hover:text-[#C9A84C]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 lg:flex">
            <CurrencyDropdown />
            <LanguageDropdown />
          </div>

          <WhatsAppLink
            message={tMsg("general")}
            service="general"
            placement="header"
            className="hidden items-center gap-2 rounded border border-[#C9A84C] px-4 py-2 text-xs tracking-widest text-[#C9A84C] transition-colors hover:bg-[#C9A84C] hover:text-[#0A0A0A] lg:flex"
          >
            <FaWhatsapp className="h-3.5 w-3.5" />
            {WHATSAPP_DISPLAY}
          </WhatsAppLink>

          {/* Accès WhatsApp direct sur mobile, à côté du menu */}
          <WhatsAppLink
            message={tMsg("general")}
            service="general"
            placement="header_mobile"
            ariaLabel={tCro("header_whatsapp_aria")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A84C]/60 text-[#C9A84C] lg:hidden"
          >
            <FaWhatsapp className="h-5 w-5" />
          </WhatsAppLink>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={`block h-px w-6 bg-[#F5F5F0] transition-transform ${menuOpen ? "translate-y-2.5 rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-[#F5F5F0] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-[#F5F5F0] transition-transform ${menuOpen ? "-translate-y-2.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[#222222] bg-[#0A0A0A] lg:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-widest text-[#888888] hover:text-[#C9A84C]"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-[#222222] pt-4">
                <button
                  onClick={() => setDeviseOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-sm tracking-widest text-[#888888]"
                >
                  <span>{tRegion("devise")}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${deviseOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
                </button>
                <AnimatePresence>
                  {deviseOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex flex-col gap-3 pl-2">
                        {CURRENCIES.map((c) => (
                          <button
                            key={c.code}
                            onClick={() => { setCurrency(c.code); setDeviseOpen(false); }}
                            className={`text-left text-sm transition-colors ${
                              currency === c.code ? "text-[#C9A84C]" : "text-[#555555] hover:text-[#888888]"
                            }`}
                          >
                            {tRegion(c.code.toLowerCase() as "aed" | "eur" | "usd" | "rub")}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-[#222222] pt-4">
                <button
                  onClick={() => setLangueOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-sm tracking-widest text-[#888888]"
                >
                  <span>{tRegion("langue")}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${langueOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
                </button>
                <AnimatePresence>
                  {langueOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex flex-col gap-3 pl-2">
                        {LOCALES.map((loc) => (
                          <Link
                            key={loc.code}
                            href={getLocalizedPath(loc.code)}
                            onClick={() => { setMenuOpen(false); setLangueOpen(false); }}
                            className={`text-sm transition-colors ${
                              locale === loc.code ? "text-[#C9A84C]" : "text-[#555555] hover:text-[#888888]"
                            }`}
                          >
                            {loc.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
