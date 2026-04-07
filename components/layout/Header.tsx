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
import { useCurrency, type Currency } from "@/contexts/CurrencyContext";

const CURRENCIES: { code: Currency; label: string }[] = [
  { code: "AED", label: "Dirham (AED)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "USD", label: "Dollar ($)" },
  { code: "RUB", label: "Rouble (₽)" },
];

const locales = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

export default function Header() {
  const t = useTranslations("nav");
  const tRegion = useTranslations("region");
  const locale = useLocale();
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();

  const [menuOpen, setMenuOpen] = useState(false);
  const [deviseOpen, setDeviseOpen] = useState(false);
  const [langueOpen, setLangueOpen] = useState(false);

  const pathWithoutLocale = pathname.replace(/^\/(fr|en|ru)/, "") || "/";

  function getLocalizedPath(newLocale: string) {
    return `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
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
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center">
          <Image src="/logo.png" alt="JustDubai" width={200} height={68} className="h-14 w-auto object-contain" priority sizes="165px" />
        </Link>

        {/* Desktop nav */}
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

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 lg:flex">
            <CurrencyDropdown />
            <LanguageDropdown />
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/971581515981"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded border border-[#C9A84C] px-4 py-2 text-xs tracking-widest text-[#C9A84C] transition-colors hover:bg-[#C9A84C] hover:text-[#0A0A0A] lg:flex"
          >
            <FaWhatsapp className="h-3.5 w-3.5" />
            +971 58 151 5981
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 lg:hidden"
            aria-label="Menu"
          >
            <span className={`block h-px w-6 bg-[#F5F5F0] transition-transform ${menuOpen ? "translate-y-2.5 rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-[#F5F5F0] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-[#F5F5F0] transition-transform ${menuOpen ? "-translate-y-2.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
                        {locales.map((loc) => (
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
