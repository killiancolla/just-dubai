# JustDubai — Cahier des charges technique

> Site de location de yachts et véhicules de luxe basé à Dubaï.
> Document destiné à un agent de développement.

---

## 1. Vue d'ensemble du projet

| Propriété | Valeur |
|---|---|
| Nom du site | **JustDubai** |
| Marché | Location de voitures et yachts de luxe — Dubaï |
| Langues | Français 🇫🇷, Anglais 🇬🇧, Russe 🇷🇺 |
| Contact réservation | WhatsApp `+971 58 151 5981` |
| Inspirations design | [Ferrari](https://www.ferrari.com/fr-FR/auto/gamme-de-voiture), [Realcar NYC](https://realcar.nyc/), [Pictonauto](https://www.pictonautogroup.com/) |
| Inspiration catalogue yacht | [Revolux Rentals](https://revoluxrentals.com/rent-a-yacht/) |

---

## 2. Stack technique

### Frontend
- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript (strict mode)
- **Styling** : Tailwind CSS v3 + CSS custom properties pour la charte graphique
- **Animations** : Framer Motion (transitions de pages, apparitions au scroll, micro-interactions)
- **i18n** : `next-intl` — routes localisées (`/fr/`, `/en/`, `/ru/`)

### CMS — Back office
- **Sanity** (v3, headless CMS)
  - Hébergé par Sanity (Sanity Studio déployé sur `/studio`)
  - Interface non-technique accessible via navigateur
  - Utilisé pour gérer : véhicules, yachts, articles de blog, traductions de contenus éditoriaux
  - Types de documents à créer dans Sanity : `vehicle`, `yacht`, `blogPost`, `siteSettings`

### SEO & Performance
- Metadata dynamique via `generateMetadata()` Next.js (titres, descriptions, OG images par page et par véhicule/yacht)
- Sitemap automatique (`next-sitemap`)
- Structured data JSON-LD (schema `Product`, `LocalBusiness`, `BlogPosting`)
- Images : `next/image` avec lazy loading, formats WebP/AVIF
- Core Web Vitals : cibler LCP < 2.5s, CLS < 0.1

### Déploiement
- **Vercel** (production + previews PR automatiques)
- Variables d'environnement : `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN`, `NEXT_PUBLIC_WHATSAPP_NUMBER`

---

## 3. Charte graphique

### Direction artistique
Style **luxe sobre** — dark luxury, inspiré de Ferrari.fr : grandes images plein-écran, typographie élégante, animations maîtrisées, beaucoup d'espace négatif.

### Palette de couleurs
```css
:root {
  --color-bg:        #0A0A0A;   /* Noir profond — fond principal */
  --color-surface:   #111111;   /* Cartes, sections alternées */
  --color-gold:      #C9A84C;   /* Accent or — CTAs, highlights */
  --color-gold-light:#E8D08A;   /* Hover states */
  --color-white:     #F5F5F0;   /* Texte principal */
  --color-muted:     #888888;   /* Texte secondaire, labels */
  --color-border:    #222222;   /* Séparateurs, bordures */
}
```

### Typographie
- **Display / Titres** : `Cormorant Garamond` (serif élégant, Google Fonts) — H1, H2, grandes accroCHes
- **Body / UI** : `DM Sans` (propre, lisible, moderne) — paragraphes, labels, navigation
- Combinaison typique luxury : serif dramatique + sans-serif neutre

### Logo
- Logo fourni par le client — intégrer en SVG si possible pour la scalabilité
- Animation d'intro inspirée de Ferrari : logo apparaît au centre de l'écran au premier chargement (fade + légère montée), puis transition vers le header — utiliser `sessionStorage` pour ne la jouer qu'une fois par session

### Style général
- Fond sombre partout (dark-first)
- Pas de couleurs vives hors de l'or
- Séparateurs fins en `--color-gold` pour les sections importantes
- Hover sur les cartes : légère montée + lueur dorée subtile (`box-shadow`)
- Curseur custom optionnel : petit cercle doré

---

## 4. Structure des pages

### 4.1 Layout global
- **Header** : logo centré (ou gauche), navigation horizontale, sélecteur de langue (FR / EN / RU), bouton WhatsApp CTA permanent (icône + numéro)
- **Footer** : liens rapides, réseaux sociaux, numéro WhatsApp, copyright JustDubai, sélecteur de langue
- **WhatsApp Floating Button** : bouton flottant fixe en bas à droite sur toutes les pages (icône WhatsApp verte sur fond sombre, lien `wa.me/971581515981`)

---

### 4.2 Page d'accueil `/`

**Hero Section**
- Vidéo ou grande image plein-écran (voiture ou yacht de luxe à Dubaï)
- Animation d'intro logo (une fois par session via `sessionStorage`)
- Accroche : `"L'exclusivité, à votre rythme"` (ou équivalent traduit)
- Deux CTAs : `[Louer un véhicule]` → `/voitures` et `[Louer un yacht]` → `/yachts`

**Sections suivantes (scroll)**
1. Mise en avant des véhicules vedettes (3–4 cartes issues de Sanity, tag `featured: true`)
2. Mise en avant des yachts vedettes (même logique)
3. Bloc "Nos prestations" (icônes + texte court, lien vers `/prestations`)
4. Bloc programme de fidélité (résumé visuel, lien vers `/fidelite`)
5. Bloc réassurance : "Livraison 24h/7j", "Sans caution disponible", "Réservation en 2 minutes sur WhatsApp"
6. Section blog (3 derniers articles)

---

### 4.3 Catalogue voitures `/voitures`

**Filtres (sidebar ou barre horizontale)**
- Marque (multi-select)
- Prix (range slider : min/max par jour)
- Modèle (text search ou select)
- Année (range ou multi-select)
- Carburant : Essence / Hybride / Électrique
- Caution : Avec caution / Sans caution

**Tri**
- Prix croissant / décroissant
- Nouveautés
- Popularité

**Grille de véhicules**
- Cards avec : photo principale, nom, marque, année, prix/jour, badge "Sans caution" si applicable
- Au clic : page détail `/voitures/[slug]`

**Page détail véhicule `/voitures/[slug]`**
- Galerie photos (carousel)
- Caractéristiques : marque, modèle, année, carburant, transmission, nb places, caution requise
- Prix affiché par jour
- Bouton CTA WhatsApp : message pré-rempli `"Bonjour, je souhaite réserver le [Nom du véhicule]"`
- Bloc SEO : `generateMetadata` dynamique avec nom + modèle + "Dubai"
- JSON-LD schema `Product`

**Schéma Sanity `vehicle`**
```ts
{
  name: string
  slug: slug
  brand: string
  model: string
  year: number
  fuel: 'essence' | 'hybride' | 'electrique'
  transmission: 'automatique' | 'manuelle'
  seats: number
  pricePerDay: number
  depositRequired: boolean
  featured: boolean
  photos: image[]
  description: text (localized: fr / en / ru)
}
```

---

### 4.4 Catalogue yachts `/yachts`

**Filtres**
- Longueur (range en mètres)
- Capacité (nb personnes)
- Prix (range)
- Caution : Avec / Sans

**Grille de yachts**
- Cards avec : photo, nom, longueur, capacité, prix/demi-journée ou jour

**Page détail yacht `/yachts/[slug]`**
- Galerie photos
- Caractéristiques : longueur, capacité, équipements (jacuzzi, bar, jet ski, etc.)
- Prix (demi-journée / journée)
- Bouton CTA WhatsApp : message pré-rempli `"Bonjour, je souhaite réserver le yacht [Nom]"`
- JSON-LD schema `Product`

**Schéma Sanity `yacht`**
```ts
{
  name: string
  slug: slug
  lengthMeters: number
  capacity: number
  priceHalfDay: number
  priceFullDay: number
  depositRequired: boolean
  featured: boolean
  amenities: string[] // ex: "Jacuzzi", "Bar", "Jet Ski"
  photos: image[]
  description: text (localized: fr / en / ru)
}
```

---

### 4.5 Qui sommes-nous `/qui-sommes-nous`

- Texte éditorial sur JustDubai (géré dans Sanity → `siteSettings.aboutContent`)
- Photo d'équipe ou visuel Dubaï
- Valeurs / engagements (3–4 blocs icônes)
- CTA bas de page → WhatsApp

---

### 4.6 Prestations incluses `/prestations`

Contenu statique (ou géré Sanity) :

| Prestation | Détail |
|---|---|
| Livraison | 24h/24 — 7j/7 — partout à Dubaï — sans frais additionnels |
| Sans caution | Option disponible sans retenir le passeport |
| WhatsApp | Réservation en 2 minutes |
| Véhicules entretenus | Flotte régulièrement contrôlée |

- Mise en page visuellement riche (icons, illustrations, alternance texte/image)

---

### 4.7 Programme de fidélité `/fidelite`

**Tableau des paliers**

| Points | Récompense |
|---|---|
| 700 pts | 100 km supplémentaires offerts |
| 1 500 pts | 300 km offerts |
| 3 000 pts | Forfait 24h — 40% de réduction |
| 4 500 pts | Forfait 48h — 40% de réduction |

- Règle d'accumulation : **1€ = 1 point**
- Design : timeline ou stepper visuel horizontal/vertical avec les paliers
- Explication du fonctionnement (comment les points sont crédités → via WhatsApp/admin)
- CTA : `[Commencer à cumuler — Réserver sur WhatsApp]`

---

### 4.8 Blog `/blog`

- Liste des articles avec : image de couverture, titre, date, extrait, catégorie
- Pagination (ou infinite scroll)
- Page article `/blog/[slug]` : contenu riche (Portable Text Sanity), partage social, articles similaires
- SEO : `generateMetadata` dynamique, JSON-LD `BlogPosting`

**Schéma Sanity `blogPost`**
```ts
{
  title: string (localized)
  slug: slug
  publishedAt: datetime
  coverImage: image
  excerpt: text (localized)
  body: portableText (localized)
  categories: string[]
  seo: { metaTitle, metaDescription }
}
```

---

## 5. Internationalisation (i18n)

- Outil : `next-intl`
- Routes : `/fr/...`, `/en/...`, `/ru/...`
- Langue par défaut : français (`/fr/` ou `/`)
- Détection automatique via `Accept-Language` header → redirect vers la langue du navigateur
- Sélecteur de langue dans le header et le footer
- Fichiers de traduction pour les contenus UI statiques : `messages/fr.json`, `messages/en.json`, `messages/ru.json`
- Contenus éditoriaux (descriptions véhicules, blog) : champs localisés directement dans Sanity

---

## 6. SEO

- `next-sitemap` configuré pour générer automatiquement `sitemap.xml` + `robots.txt`
- Chaque page et fiche produit a ses propres `title`, `description`, `og:image` dynamiques via `generateMetadata`
- `og:image` : utiliser les photos de chaque véhicule/yacht pour les fiches, image de marque pour les pages statiques
- Balises `hreflang` pour chaque langue sur chaque URL
- JSON-LD sur :
  - Pages véhicules/yachts → `schema.org/Product`
  - Blog → `schema.org/BlogPosting`
  - Homepage → `schema.org/LocalBusiness`
- Analytics : intégrer Google Analytics 4 via `@next/third-parties/google`

---

## 7. Bouton WhatsApp

**Implémentation**
- Floating button fixe `position: fixed; bottom: 24px; right: 24px; z-index: 50`
- Icône WhatsApp SVG officielle (verte)
- Lien : `https://wa.me/971581515981`
- Tooltip au hover : `"Réserver sur WhatsApp"`
- Sur les fiches véhicules/yachts : CTA bouton pleine largeur avec message pré-rempli :
  ```
  https://wa.me/971581515981?text=Bonjour%2C%20je%20souhaite%20réserver%20le%20[NOM_DU_VÉHICULE]
  ```
- Le message pré-rempli est encodé dynamiquement à partir du nom du véhicule

---

## 8. Back office Sanity — guide de configuration

1. Créer un projet sur [sanity.io](https://sanity.io) → récupérer `projectId` et `dataset`
2. Initialiser Sanity Studio dans `/sanity/` avec les schémas décrits ci-dessus (`vehicle`, `yacht`, `blogPost`, `siteSettings`)
3. Déployer le Studio sur Sanity Cloud (`sanity deploy`) → accessible via `https://justdubai.sanity.studio`
4. Installer `@sanity/client` et `next-sanity` dans l'app Next.js
5. Utiliser `generateStaticParams` + ISR (`revalidate: 60`) pour les pages catalogue et fiches produits

---

## 9. Structure des dossiers (recommandée)

```
justdubai/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx                  # Homepage
│   │   ├── voitures/
│   │   │   ├── page.tsx              # Catalogue voitures
│   │   │   └── [slug]/page.tsx       # Fiche véhicule
│   │   ├── yachts/
│   │   │   ├── page.tsx              # Catalogue yachts
│   │   │   └── [slug]/page.tsx       # Fiche yacht
│   │   ├── qui-sommes-nous/page.tsx
│   │   ├── prestations/page.tsx
│   │   ├── fidelite/page.tsx
│   │   └── blog/
│   │       ├── page.tsx              # Liste articles
│   │       └── [slug]/page.tsx       # Article
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx        # Floating button
│   ├── catalogue/
│   │   ├── VehicleCard.tsx
│   │   ├── YachtCard.tsx
│   │   ├── FilterSidebar.tsx
│   │   └── SortBar.tsx
│   ├── ui/                           # Composants design system (Button, Badge, etc.)
│   └── home/
│       ├── HeroSection.tsx
│       ├── LogoIntro.tsx             # Animation intro logo
│       └── FeaturedVehicles.tsx
├── sanity/
│   ├── schemas/
│   │   ├── vehicle.ts
│   │   ├── yacht.ts
│   │   ├── blogPost.ts
│   │   └── siteSettings.ts
│   └── lib/
│       └── client.ts                 # Sanity client + queries GROQ
├── messages/
│   ├── fr.json
│   ├── en.json
│   └── ru.json
├── public/
│   └── logo.svg
└── next.config.ts
```

---

## 10. Points d'attention pour l'agent

- [ ] L'animation d'intro logo doit utiliser `sessionStorage` pour ne se jouer **qu'une seule fois** par session (pas à chaque navigation)
- [ ] Les filtres du catalogue voitures doivent fonctionner **côté client** (React state) sur les données pré-fetched — pas de rechargement de page
- [ ] Les slugs doivent être **localisés** si besoin (`/fr/voitures/...`, `/en/cars/...`, `/ru/avtomobili/...`) ou rester neutres — à décider
- [ ] Toutes les images Sanity doivent passer par `@sanity/image-url` + `next/image` pour l'optimisation automatique
- [ ] Le sélecteur de langue doit conserver l'URL courante en changeant uniquement le préfixe de locale
- [ ] Les messages WhatsApp pré-remplis doivent être encodés avec `encodeURIComponent`
- [ ] Prévoir un composant `<JsonLd />` réutilisable pour les structured data
- [ ] Dark mode uniquement — ne pas implémenter de toggle light/dark