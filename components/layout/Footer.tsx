import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

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
              <Image src="/logo.png" alt="JustDubai" width={120} height={48} className="h-10 w-auto object-contain" sizes="120px" />
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
            <address className="not-italic space-y-3 text-sm text-[#888888]">
              <p>Dubai, United Arab Emirates</p>
              <p>
                <a href="https://wa.me/971581515981" className="hover:text-[#C9A84C]">
                  WhatsApp: +971 58 151 5981
                </a>
              </p>
            </address>
          </div>

          {/* Language + Social */}
          <div>
            <h4 className="mb-4 text-xs tracking-widest text-[#C9A84C] uppercase">
              {t("footer.follow")}
            </h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/just_dubaii" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#888888] hover:text-[#C9A84C]">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@just.dubaii" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-[#888888] hover:text-[#C9A84C]">
                <FaTiktok className="h-5 w-5" />
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
        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#888888]">{t("footer.copyright")}</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {[
              { href: "/legal/mentions-legales", label: t("footer.legal_mentions") },
              { href: "/legal/cgv", label: t("footer.cgv") },
              { href: "/legal/confidentialite", label: t("footer.privacy") },
            ].map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="text-xs text-[#888888] transition-colors hover:text-[#C9A84C]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
