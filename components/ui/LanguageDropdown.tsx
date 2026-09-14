"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { LOCALES, getLocalizedPath as buildLocalizedPath } from "@/lib/constants";

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const pathname = usePathname();

  function getLocalizedPath(newLocale: string) {
    return buildLocalizedPath(pathname, newLocale);
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
        className={`flex items-center gap-1.5 transition-colors ${
          open ? "text-[#C9A84C]" : "text-[#888888] hover:text-[#F5F5F0]"
        }`}
        aria-label="Sélectionner la langue"
      >
        <Globe className="h-4 w-4" strokeWidth={1.5} />
        <span className="text-xs tracking-widest uppercase">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-44 border border-[#222222] bg-[#111111] shadow-xl">
          <div className="py-2">
            {LOCALES.map((loc) => (
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
