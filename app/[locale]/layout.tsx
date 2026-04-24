import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CustomCursor from "@/components/ui/CustomCursor";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

const titles: Record<string, string> = {
  fr: "JustDubai | Location de Voitures & Yachts de Luxe à Dubaï",
  en: "JustDubai | Luxury Car & Yacht Rental in Dubai",
  ru: "JustDubai | Аренда роскошных автомобилей и яхт в Дубае",
};

const descriptions: Record<string, string> = {
  fr: "Découvrez JustDubai, votre spécialiste de la location de voitures et yachts de luxe à Dubaï. Ferrari, Lamborghini, yachts privés — réservation rapide sans caution.",
  en: "Discover JustDubai, your luxury car and yacht rental specialist in Dubai. Ferrari, Lamborghini, private yachts — fast booking with no deposit required.",
  ru: "JustDubai — аренда роскошных автомобилей и яхт в Дубае. Ferrari, Lamborghini, яхты — быстрое бронирование без залога.",
};

const ogLocales: Record<string, string> = {
  fr: "fr_FR",
  en: "en_US",
  ru: "ru_RU",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = titles[locale] ?? titles.fr;
  const description = descriptions[locale] ?? descriptions.fr;

  return {
    title: {
      default: title,
      template: "%s | JustDubai",
    },
    description,
    metadataBase: new URL("https://www.justdubaiconciergerie.com"),
    openGraph: {
      type: "website",
      locale: ogLocales[locale] ?? "fr_FR",
      siteName: "JustDubai",
      title,
      description,
      images: [{ url: "/club/dubai-left.jpg", width: 1200, height: 630, alt: "JustDubai — Location de luxe à Dubaï" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/club/dubai-left.jpg"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <CurrencyProvider>
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </CurrencyProvider>
    </NextIntlClientProvider>
  );
}
