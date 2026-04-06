import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { FEATURED_VEHICLES_QUERY, FEATURED_YACHTS_QUERY, LATEST_BLOG_POSTS_QUERY, SOCIAL_PROOF_QUERY, FAQ_QUERY } from "@/sanity/lib/client";
import HeroSection from "@/components/home/HeroSection";
import LogoIntro from "@/components/home/LogoIntro";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import FeaturedYachts from "@/components/home/FeaturedYachts";
import ReassuranceSection from "@/components/home/ReassuranceSection";
import LoyaltyTeaser from "@/components/home/LoyaltyTeaser";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import BlogTeaser from "@/components/home/BlogTeaser";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import FaqSection from "@/components/home/FaqSection";
import SocialProof from "@/components/home/SocialProof";
import JsonLd from "@/components/ui/JsonLd";

export const revalidate = 60;

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
    url: "https://justdubai.com",
    telephone: "+971581515981",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <LogoIntro />
      <HeroSection />
      <div className="gold-separator" />
      <SocialProof data={socialProofData?.socialProof ?? null} />
      <div className="gold-separator" />
      <FeaturedVehicles vehicles={vehicles} />
      <WhatsAppCTA />
      <FeaturedYachts yachts={yachts} />
      <div className="gold-separator" />
      <ServicesTeaser />
      <div className="gold-separator" />
      <LoyaltyTeaser />
      <div className="gold-separator" />
      <ReassuranceSection />
      <div className="gold-separator" />
      <BlogTeaser posts={posts} />
      <div className="gold-separator" />
      <FaqSection items={faqItems} />
    </>
  );
}
