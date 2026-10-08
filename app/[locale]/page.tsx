import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generateAlternates } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { FEATURED_VEHICLES_QUERY, FEATURED_YACHTS_QUERY, LATEST_BLOG_POSTS_QUERY, SOCIAL_PROOF_QUERY, FAQ_QUERY } from "@/sanity/lib/client";
import HeroSection from "@/components/home/HeroSection";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import FeaturedYachts from "@/components/home/FeaturedYachts";
import ServicesGrid from "@/components/home/ServicesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import LoyaltyTeaser from "@/components/home/LoyaltyTeaser";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import BlogTeaser from "@/components/home/BlogTeaser";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import FaqSection from "@/components/home/FaqSection";
import SocialProof from "@/components/home/SocialProof";
import JsonLd from "@/components/ui/JsonLd";
import type { Vehicle, Yacht } from "@/types/sanity";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: generateAlternates(locale) };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [vehicles, yachts, posts, socialProofData, faqItems] = await Promise.all([
    client.fetch(FEATURED_VEHICLES_QUERY),
    client.fetch(FEATURED_YACHTS_QUERY),
    client.fetch(LATEST_BLOG_POSTS_QUERY),
    client.fetch(SOCIAL_PROOF_QUERY),
    client.fetch(FAQ_QUERY),
  ]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JustDubai",
    description: "Location de voitures et yachts de luxe à Dubaï",
    url: "https://www.justdubaiconciergerie.com",
    telephone: "+971581515981",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };

  // Photo d'illustration de chaque univers : le modèle vedette le plus haut de gamme.
  const carPhoto = [...(vehicles as Vehicle[])]
    .filter((v) => v.mainPhoto)
    .sort((a, b) => (b.pricePerDay ?? 0) - (a.pricePerDay ?? 0))[0]?.mainPhoto;
  const yachtPhoto = [...(yachts as Yacht[])]
    .filter((y) => y.mainPhoto)
    .sort((a, b) => (b.pricePerHour ?? 0) - (a.pricePerHour ?? 0))[0]?.mainPhoto;

  /*
   * Home pensée comme une landing page Ads (AIDA) :
   *   Attention : Hero (promesse + CTA WhatsApp)
   *   Interest  : univers proposés, voitures et yachts vedettes
   *   Desire    : chiffres, garanties, étapes, Club
   *   Action    : CTA WhatsApp à chaque section + bandeau final avant le footer
   * L'intro animée du logo (LogoIntro) n'est plus affichée : elle masquait la
   * page 2,6 s à chaque arrivée. Le composant est conservé si besoin.
   */
  return (
    <>
      <link rel="preload" as="image" href="/hero-poster.jpg" fetchPriority="high" />
      <JsonLd data={localBusinessSchema} />
      <HeroSection />
      <ServicesGrid carPhoto={carPhoto} yachtPhoto={yachtPhoto} />
      <FeaturedVehicles vehicles={vehicles} />
      <FeaturedYachts yachts={yachts} />
      <SocialProof data={socialProofData?.socialProof ?? null} />
      <div className="gold-separator" />
      <ServicesTeaser />
      <HowItWorks />
      <div className="gold-separator" />
      <LoyaltyTeaser />
      <div className="gold-separator" />
      <FaqSection items={faqItems} />
      <div className="gold-separator" />
      <BlogTeaser posts={posts} />
      <WhatsAppCTA />
    </>
  );
}
