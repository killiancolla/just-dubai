"use client";
import { useCurrency, type Currency } from "@/contexts/CurrencyContext";

const CURRENCIES: { code: Currency; label: string }[] = [
  { code: "AED", label: "AED" },
  { code: "EUR", label: "EUR" },
  { code: "USD", label: "USD" },
  { code: "RUB", label: "RUB" },
];

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-1">
      {CURRENCIES.map((c, i) => (
        <button
          key={c.code}
          onClick={() => setCurrency(c.code)}
          className={`text-xs tracking-widest transition-colors ${
            currency === c.code
              ? "text-[#C9A84C]"
              : "text-[#888888] hover:text-[#F5F5F0]"
          }`}
        >
          {c.label}{i < CURRENCIES.length - 1 && <span className="ml-1 text-[#333333]">·</span>}
        </button>
      ))}
    </div>
  );
}
