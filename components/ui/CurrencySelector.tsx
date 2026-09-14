"use client";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CURRENCIES } from "@/lib/constants";

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
          {c.code}{i < CURRENCIES.length - 1 && <span className="ml-1 text-[#333333]">·</span>}
        </button>
      ))}
    </div>
  );
}
