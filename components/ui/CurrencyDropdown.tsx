"use client";
import { useState, useRef, useEffect } from "react";
import { Banknote } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrency, type Currency } from "@/contexts/CurrencyContext";

const CURRENCY_CODES: Currency[] = ["AED", "EUR", "USD", "RUB"];

export default function CurrencyDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const t = useTranslations("region");
  const { currency, setCurrency } = useCurrency();

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
        aria-label="Sélectionner la devise"
      >
        <Banknote className="h-4 w-4" strokeWidth={1.5} />
        <span className="text-xs tracking-widest">{currency}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-44 border border-[#222222] bg-[#111111] shadow-xl">
          <div className="py-2">
            {CURRENCY_CODES.map((code) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
