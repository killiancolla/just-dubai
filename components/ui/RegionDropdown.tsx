"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Banknote } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCurrency, type Currency } from "@/contexts/CurrencyContext";

const CURRENCY_CODES: Currency[] = ["AED", "EUR", "USD", "RUB"];

const LOCALES = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

export default function RegionDropdown() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"devise" | "langue">("devise");
  const ref = useRef<HTMLDivElement>(null);

  const t = useTranslations("region");
  const { currency, setCurrency } = useCurrency();
  const locale = useLocale();
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(fr|en|ru)/, "") || "/";

  function getLocalizedPath(newLocale: string) {
    return `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 transition-colors ${open ? "text-[#C9A84C]" : "text-[#888888] hover:text-[#F5F5F0]"
          }`}
        aria-label="Région et devise"
      >
        <Banknote className="h-4 w-4" strokeWidth={1.5} />
        <span className="text-xs tracking-widest">{currency}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-56 border border-[#222222] bg-[#111111] shadow-xl">
          <div className="flex border-b border-[#222222]">
            {(["devise", "langue"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 py-3 text-xs tracking-widest uppercase transition-colors ${
                  tab === key
                    ? "border-b-2 border-[#C9A84C] text-[#C9A84C]"
                    : "text-[#555555] hover:text-[#888888]"
                }`}
              >
                {t(key)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="py-2">
            {tab === "devise"
              ? CURRENCY_CODES.map((code) => (
                  <button
                    key={code}
                    onClick={() => { setCurrency(code); setOpen(false); }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-[#1a1a1a] ${
                      currency === code ? "text-[#C9A84C]" : "text-[#888888]"
                    }`}
                  >
                    {t(code.toLowerCase() as "aed" | "eur" | "usd" | "rub")}
                    {currency === code && <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />}
                  </button>
                ))
              : LOCALES.map((loc) => (
                  <Link
                    key={loc.code}
                    href={getLocalizedPath(loc.code)}
                    onClick={() => setOpen(false)}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-[#1a1a1a] ${
                      locale === loc.code ? "text-[#C9A84C]" : "text-[#888888]"
                    }`}
                  >
                    {loc.label}
                    {locale === loc.code && <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />}
                  </Link>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
