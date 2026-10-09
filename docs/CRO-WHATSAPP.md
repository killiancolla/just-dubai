# Optimisation conversion (Ads → WhatsApp)

## Ce qui change

- **Home en landing page** : Hero avec CTA WhatsApp, cartes « Voitures / Yachts / Demande sur mesure », produits vedettes avec CTA par carte, chiffres, garanties, 3 étapes, Club, FAQ, blog, bandeau WhatsApp final.
- **Intro logo plein écran retirée de la Home** (elle masquait la page 2,6 s). Le composant `components/home/LogoIntro.tsx` est conservé.
- **Catalogue yachts** : tri par prix croissant par défaut, 2 colonnes sur mobile, CTA par carte, bloc « Vous ne savez pas quel yacht choisir ? ».
- **Catalogue voitures** : tri prix ajouté, 2 colonnes sur mobile, CTA par carte, bloc d'aide au choix.
- **Fiches voiture / yacht** : prix + CTA juste sous le titre sur mobile, barre sticky en bas d'écran ensuite ; colonne latérale inchangée sur desktop.
- **Header mobile** : bouton WhatsApp à côté du menu.
- Fiches voitures : title / description traduits en EN et RU (FR inchangé), prix ajouté au JSON-LD.

SEO conservé : mêmes URLs, mêmes H1, mêmes titles et meta descriptions (FR).

## WhatsApp

Tous les liens passent par `components/whatsapp/WhatsAppLink.tsx` et `lib/whatsapp.ts`
(numéro, message prérempli traduit, tracking). Les messages sont dans `messages/*.json` → `wa_msg`.

## Tracking

À chaque clic WhatsApp :

1. Conversion Google Ads existante, inchangée : `AW-18438884789/QSeNCI3evvgcELWbrNhE`
   (elle est désormais envoyée par **tous** les boutons WhatsApp, fiches produit comprises).
2. Deux événements poussés dans `dataLayer` (pour GTM / GA4) :
   - `whatsapp_click`
   - `car_whatsapp_click`, `yacht_whatsapp_click`, `concierge_whatsapp_click`, `general_whatsapp_click` ou `loyalty_whatsapp_click`

   Paramètres : `whatsapp_service`, `whatsapp_placement` (hero, catalogue_card, detail_inline, detail_sticky, detail_sidebar, floating, header…), `whatsapp_item` (nom du véhicule / yacht), `page_path`.

Attributs HTML pour des déclencheurs GTM « Clic sur lien » : classe `.js-whatsapp-cta`, `data-wa-service`, `data-wa-placement`, `data-wa-item`.

Exemple GTM : déclencheur « Événement personnalisé » = `whatsapp_click`, variables de couche de données `whatsapp_service` / `whatsapp_item`, balise GA4 Event.
