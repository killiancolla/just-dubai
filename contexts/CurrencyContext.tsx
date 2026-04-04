"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Currency = "AED" | "EUR" | "USD" | "RUB";

const FALLBACK_RATES: Record<Currency, number> = {
  AED: 1,
  EUR: 0.25,
  USD: 0.27,
  RUB: 24.8,
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (aed: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("AED");
  const [rates, setRates] = useState(FALLBACK_RATES);

  useEffect(() => {
    const saved = localStorage.getItem("jd_currency") as Currency | null;
    if (saved && ["AED", "EUR", "USD", "RUB"].includes(saved)) {
      setCurrencyState(saved);
    }

    const CACHE_KEY = "jd_rates";
    const CACHE_TTL = 24 * 60 * 60 * 1000;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { ts, data } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) {
          setRates(data);
          return;
        }
      }
    } catch {}

    fetch("https://open.er-api.com/v6/latest/AED")
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) {
          const r: Record<Currency, number> = {
            AED: 1,
            EUR: data.rates.EUR ?? FALLBACK_RATES.EUR,
            USD: data.rates.USD ?? FALLBACK_RATES.USD,
            RUB: data.rates.RUB ?? FALLBACK_RATES.RUB,
          };
          setRates(r);
          localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: r }));
        }
      })
      .catch(() => {});
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("jd_currency", c);
  }, []);

  const format = useCallback(
    (aed: number) => {
      const amount = Math.round(aed * rates[currency]);
      const formatted = amount.toLocaleString("fr-FR");
      switch (currency) {
        case "EUR": return `${formatted} €`;
        case "USD": return `$${formatted}`;
        case "RUB": return `${formatted} ₽`;
        default: return `${formatted} AED`;
      }
    },
    [rates, currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
