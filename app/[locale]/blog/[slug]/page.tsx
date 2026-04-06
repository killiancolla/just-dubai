import { client, BLOG_POST_BY_SLUG_QUERY, urlFor } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import JsonLd from "@/components/ui/JsonLd";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import { generateAlternates } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });
  if (!post) return {};
  const title = post.seo?.metaTitle ?? post.title?.[locale] ?? post.title?.fr;
  const description = post.seo?.metaDescription ?? post.excerpt?.[locale] ?? post.excerpt?.fr;
  return {
    title,
    description,
    alternates: generateAlternates(locale, `/blog/${slug}`),
    openGraph: post.coverImage
      ? {
          images: [urlFor(post.coverImage).width(1200).height(630).url()],
          title,
          description,
        }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });
  if (!post) notFound();

  const title = post.title?.[locale] ?? post.title?.fr ?? "";
  const excerpt = post.excerpt?.[locale] ?? post.excerpt?.fr ?? "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: post.publishedAt,
    publisher: { "@type": "Organization", name: "JustDubai" },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <div className="min-h-screen bg-[#0A0A0A] pt-20">
        {post.coverImage && (
          <div className="relative h-[50vh] w-full overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(1600).height(900).url()}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-6 py-16">
          {post.categories?.[0] && (
            <p className="mb-4 text-xs tracking-widest text-[#C9A84C] uppercase">{post.categories[0]}</p>
          )}
          <h1 className="font-display text-4xl font-light text-[#F5F5F0] md:text-5xl">{title}</h1>
          {post.publishedAt && (
            <p className="mt-4 text-sm text-[#888888]">
              {new Date(post.publishedAt).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
          <div className="gold-separator my-8" />
          {excerpt && <p className="mb-8 text-lg text-[#888888] italic">{excerpt}</p>}
          {post.body?.[locale] || post.body?.fr ? (
            <div className="prose prose-invert prose-gold max-w-none text-[#888888]">
              <PortableText value={post.body?.[locale] ?? post.body?.fr} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
