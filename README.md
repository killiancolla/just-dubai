# JustDubai

Luxury car and yacht rental website in Dubai. Available in French, English, and Russian.

## Stack

* **Next.js 16** — App Router, SSR/ISR, Turbopack
* **Sanity v5** — Headless CMS (vehicles, yachts, blog, legal pages)
* **next-intl** — Internationalization (fr / en / ru)
* **Tailwind CSS v4** — Styling
* **Framer Motion** — Animations
* **Vercel Analytics** — Performance tracking

## Structure

```text
app/
  [locale]/
    voitures/         # Vehicle catalog + details
    yachts/           # Yacht catalog + details
    blog/             # Blog list + articles
    prestations/      # Services
    fidelite/         # Loyalty program
    qui-sommes-nous/  # About page
    legal/[slug]/     # Legal pages
  studio/             # Embedded Sanity Studio

components/
  layout/             # Header, Footer, WhatsAppButton
  home/               # Homepage sections
  catalogue/          # PhotoGallery, VehicleCatalogue, YachtCatalogue
  ui/                 # Reusable components

contexts/             # CurrencyContext (real-time exchange rates)

lib/
  constants.ts        # CURRENCIES, LOCALES, getLocalizedPath()
  seo.ts              # generateAlternates()

types/
  sanity.ts           # SanityImage, Vehicle, Yacht, BlogPost, Locale
```

## Getting Started

```bash
npm install
npm run dev
```

Required environment variables in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
```

## Project Guidelines

* Keep secrets server-side. Never expose `SANITY_API_TOKEN` to the client.
* Never commit `.env.local` or real credentials.
* Keep `.env.example` updated without sensitive values.
* Use Server Components by default. Only use `"use client"` when required.
* Avoid unnecessary `force-dynamic` or Edge Runtime usage.
* Use `next/image` for images whenever possible.
* Keep all locales working: `/fr`, `/en`, `/ru`.
* Do not hardcode production URLs; use environment variables when needed.
* Avoid hydration mismatches caused by browser-only APIs, `Date.now()`, `Math.random()`, etc.
* Do not introduce complex configuration unless it is necessary.
* Always verify the production build before deploying.

```bash
npm run lint
npm run build
npm run start
```

## Scripts

```bash
npm run dev      # Development server (Turbopack)
npm run build    # Production build
npm run start    # Start production build
npm run lint     # ESLint
```