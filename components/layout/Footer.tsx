import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const locales = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="border-t border-[#222222] bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`}>
              <Image src="/logo.png" alt="JustDubai" width={120} height={48} className="h-10 w-auto object-contain" unoptimized />
            </Link>
            <p className="mt-4 text-sm text-[#888888]">{t("footer.tagline")}</p>
            <a
              href="https://wa.me/971581515981"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-sm text-[#C9A84C]"
            >
              +971 58 151 5981
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-xs tracking-widest text-[#C9A84C] uppercase">
              {t("footer.quick_links")}
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/voitures", label: t("nav.cars") },
                { href: "/yachts", label: t("nav.yachts") },
                { href: "/prestations", label: t("nav.services") },
                { href: "/fidelite", label: t("nav.loyalty") },
                { href: "/blog", label: t("nav.blog") },
                { href: "/qui-sommes-nous", label: t("nav.about") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-[#888888] transition-colors hover:text-[#C9A84C]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs tracking-widest text-[#C9A84C] uppercase">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3 text-sm text-[#888888]">
              <li>Dubai, UAE</li>
              <li>
                <a href="https://wa.me/971581515981" className="hover:text-[#C9A84C]">
                  WhatsApp: +971 58 151 5981
                </a>
              </li>
            </ul>
          </div>

          {/* Language + Social */}
          <div>
            <h4 className="mb-4 text-xs tracking-widest text-[#C9A84C] uppercase">
              {t("footer.follow")}
            </h4>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="text-[#888888] hover:text-[#C9A84C]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="TikTok" className="text-[#888888] hover:text-[#C9A84C]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/>
                </svg>
              </a>
            </div>
            <div className="mt-6 flex gap-3">
              {locales.map((loc) => (
                <Link
                  key={loc.code}
                  href={`/${loc.code}`}
                  className="text-xs tracking-widest text-[#888888] hover:text-[#C9A84C]"
                >
                  {loc.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="gold-separator mt-12" />
        <p className="mt-6 text-center text-xs text-[#888888]">{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
