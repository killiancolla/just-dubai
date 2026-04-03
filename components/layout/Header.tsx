"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const locales = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Strip locale prefix to get the path segment
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
          <Image src="/logo.png" alt="JustDubai" width={200} height={68} className="h-14 w-auto object-contain" unoptimized priority loading="eager" />
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
          {/* Language switcher */}
          <div className="hidden items-center gap-2 lg:flex">
            {locales.map((loc) => (
              <Link
                key={loc.code}
                href={getLocalizedPath(loc.code)}
                className={`text-xs tracking-widest transition-colors ${
                  locale === loc.code
                    ? "text-[#C9A84C]"
                    : "text-[#888888] hover:text-[#F5F5F0]"
                }`}
              >
                {loc.label}
              </Link>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/971581515981"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded border border-[#C9A84C] px-4 py-2 text-xs tracking-widest text-[#C9A84C] transition-colors hover:bg-[#C9A84C] hover:text-[#0A0A0A] lg:flex"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.524 5.851L.057 23.7a.5.5 0 0 0 .623.622l5.947-1.462A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.897 0-3.67-.515-5.192-1.414l-.372-.22-3.53.868.893-3.43-.243-.384A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
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
              <div className="mt-2 flex gap-4 border-t border-[#222222] pt-4">
                {locales.map((loc) => (
                  <Link
                    key={loc.code}
                    href={getLocalizedPath(loc.code)}
                    onClick={() => setMenuOpen(false)}
                    className={`text-xs tracking-widest ${locale === loc.code ? "text-[#C9A84C]" : "text-[#888888]"}`}
                  >
                    {loc.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
