# JustDubai

Site de location de voitures et yachts de luxe à Dubaï. Disponible en français, anglais et russe.

## Stack

- **Next.js 16** — App Router, SSR/ISR, Turbopack
- **Sanity v5** — CMS headless (véhicules, yachts, blog, pages légales)
- **next-intl** — Internationalisation (fr / en / ru)
- **Tailwind CSS v4** — Styles
- **Framer Motion** — Animations
- **Vercel Analytics** — Suivi des performances

## Structure

```
app/
  [locale]/
    voitures/         # Catalogue + fiches véhicules
    yachts/           # Catalogue + fiches yachts
    blog/             # Liste + articles
    prestations/      # Services proposés
    fidelite/         # Programme de fidélité
    qui-sommes-nous/  # Page about
    legal/[slug]/     # Mentions légales, CGV, confidentialité
  studio/             # Sanity Studio embarqué
components/
  layout/             # Header, Footer, WhatsAppButton
  home/               # Sections homepage
  catalogue/          # PhotoGallery, VehicleCatalogue, YachtCatalogue
  ui/                 # Composants réutilisables
contexts/             # CurrencyContext (taux de change en temps réel)
lib/
  constants.ts        # CURRENCIES, LOCALES, getLocalizedPath()
  seo.ts              # generateAlternates()
types/
  sanity.ts           # SanityImage, Vehicle, Yacht, BlogPost, Locale
```

## Démarrage

```bash
npm install
npm run dev
```

Variables d'environnement requises dans `.env.local` :

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
```

## Scripts

```bash
npm run dev      # Serveur de développement (Turbopack)
npm run build    # Build de production
npm run start    # Démarrer le build de production
npm run lint     # ESLint
```