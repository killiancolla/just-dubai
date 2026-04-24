const BASE_URL = "https://www.justdubaiconciergerie.com";
const LOCALES = ["fr", "en", "ru"] as const;

export function generateAlternates(locale: string, path: string = "") {
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${BASE_URL}/${loc}${path}`;
  }
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: {
      ...languages,
      "x-default": `${BASE_URL}/fr${path}`,
    },
  };
}
