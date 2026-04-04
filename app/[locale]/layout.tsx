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

export const metadata: Metadata = {
  title: {
    default: "JustDubai — Location de luxe à Dubaï",
    template: "%s | JustDubai",
  },
  description: "Location de voitures et yachts de luxe à Dubaï",
  metadataBase: new URL("https://justdubai.com"),
};

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
