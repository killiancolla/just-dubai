const FEET_TO_METERS = 0.3048;

/**
 * Les longueurs de yachts sont stockées en pieds : c'est l'unité employée par
 * les chantiers et les brokers du Golfe, et c'est le nombre qui figure dans le
 * nom du bateau (un « Ambrosia 80 » mesure 80 pieds). Les marchés francophone
 * et russophone attendent en revanche des mètres.
 */
const IMPERIAL_LOCALES = new Set(["en"]);

export function usesFeet(locale: string): boolean {
  return IMPERIAL_LOCALES.has(locale);
}

export function lengthUnit(locale: string): string {
  if (usesFeet(locale)) return "ft";
  return locale === "ru" ? "м" : "m";
}

export function feetToMeters(feet: number): number {
  return Math.round(feet * FEET_TO_METERS);
}

/** Longueur dans l'unité de la locale, sans unité accolée. */
export function lengthValue(lengthFeet: number, locale: string): number {
  return usesFeet(locale) ? Math.round(lengthFeet) : feetToMeters(lengthFeet);
}

/** Longueur prête à afficher, ex. « 80 ft » en anglais, « 24 m » en français. */
export function formatLength(lengthFeet: number | null | undefined, locale: string): string | null {
  if (!lengthFeet) return null;
  return `${lengthValue(lengthFeet, locale)} ${lengthUnit(locale)}`;
}

/** Convertit une saisie exprimée dans l'unité d'affichage vers des pieds (filtres). */
export function displayLengthToFeet(value: number, locale: string): number {
  return usesFeet(locale) ? value : value / FEET_TO_METERS;
}
