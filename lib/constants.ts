import type { Currency } from "@/contexts/CurrencyContext";

export type { Currency };

export const CURRENCIES: { code: Currency; label: string }[] = [
  { code: "AED", label: "Dirham (AED)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "USD", label: "Dollar ($)" },
  { code: "RUB", label: "Rouble (₽)" },
];

export const LOCALES = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

export function getLocalizedPath(pathname: string, newLocale: string): string {
  const pathWithoutLocale = pathname.replace(/^\/(fr|en|ru)/, "") || "/";
  return `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
}
