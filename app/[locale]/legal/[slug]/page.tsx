import { client, LEGAL_PAGE_QUERY } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";

export const revalidate = 60;

const VALID_SLUGS = ["mentions-legales", "cgv", "confidentialite"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const page = await client.fetch(LEGAL_PAGE_QUERY, { pageId: slug });
  if (!page) return {};
  const title = page.title?.[locale] ?? page.title?.fr ?? "";
  return { title: `${title} | JustDubai`, robots: { index: false } };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  if (!VALID_SLUGS.includes(slug)) notFound();

  const page = await client.fetch(LEGAL_PAGE_QUERY, { pageId: slug });
  if (!page) notFound();

  const title = page.title?.[locale] ?? page.title?.fr ?? "";
  const content = page.content?.[locale] ?? page.content?.fr;

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-4xl font-light text-[#F5F5F0] md:text-5xl">{title}</h1>
        <div className="gold-separator my-8" />
        {content ? (
          <div className="prose prose-invert max-w-none text-[#888888] prose-headings:text-[#F5F5F0] prose-headings:font-light prose-a:text-[#C9A84C] prose-strong:text-[#F5F5F0]">
            <PortableText value={content} />
          </div>
        ) : (
          <p className="text-[#888888]">Contenu à venir.</p>
        )}
      </div>
    </div>
  );
}
