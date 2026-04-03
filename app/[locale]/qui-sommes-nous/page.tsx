import { client, SITE_SETTINGS_QUERY } from "@/sanity/lib/client";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { fr: "Qui sommes-nous — JustDubai", en: "About us — JustDubai", ru: "О нас — JustDubai" };
  return { title: titles[locale] ?? titles.fr };
}

const values = [
  {
    title: "Excellence",
    desc: "Une flotte premium sélectionnée pour son prestige et sa fiabilité.",
    icon: "★",
  },
  {
    title: "Disponibilité",
    desc: "Un service 24h/24, 7j/7, à votre écoute pour chaque demande.",
    icon: "◎",
  },
  {
    title: "Discrétion",
    desc: "Confidentialité totale sur vos réservations et vos données personnelles.",
    icon: "◈",
  },
  {
    title: "Flexibilité",
    desc: "Options sans caution, livraison immédiate, réservation en quelques minutes.",
    icon: "◇",
  },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-[#222222] bg-[#111111] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">À propos</p>
          <h1 className="font-display text-4xl font-light text-[#F5F5F0] md:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-[#888888]">{t("subtitle")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-[#888888]">
            JustDubai est né d&apos;une passion pour l&apos;excellence automobile et maritime à Dubaï.
            Nous mettons à votre disposition une flotte de véhicules et de yachts d&apos;exception,
            pour que chaque déplacement ou sortie en mer soit une expérience inoubliable.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[#888888]">
            Notre équipe, disponible 24h/24, veille à ce que chaque détail soit parfait,
            de la réservation via WhatsApp à la remise des clés à votre porte.
          </p>
          <a
            href="https://wa.me/971581515981"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 bg-[#C9A84C] px-8 py-4 text-sm tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#E8D08A]"
          >
            Nous contacter sur WhatsApp
          </a>
        </div>

        <div className="gold-separator my-20" />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="border border-[#222222] p-8">
              <div className="mb-4 text-2xl text-[#C9A84C]">{v.icon}</div>
              <h3 className="font-display mb-2 text-xl text-[#F5F5F0]">{v.title}</h3>
              <p className="text-sm leading-relaxed text-[#888888]">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
