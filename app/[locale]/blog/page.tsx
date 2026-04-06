import { client, BLOG_POSTS_QUERY, urlFor } from "@/sanity/lib/client";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { fr: "Blog | JustDubai", en: "Blog | JustDubai", ru: "Блог | JustDubai" };
  return { title: titles[locale] ?? titles.fr };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("blog");
  const posts = await client.fetch(BLOG_POSTS_QUERY);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="border-b border-[#222222] bg-[#111111] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Blog</p>
          <h1 className="font-display text-4xl font-light text-[#F5F5F0] md:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-[#888888]">{t("subtitle")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-[#888888]">{t("no_results")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => {
              const title = post.title?.[locale] ?? post.title?.fr ?? "";
              const excerpt = post.excerpt?.[locale] ?? post.excerpt?.fr ?? "";
              return (
                <Link key={post._id} href={`/${locale}/blog/${post.slug.current}`} className="luxury-card group block bg-[#111111]">
                  <div className="relative aspect-video overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={urlFor(post.coverImage).width(600).height(340).url()}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#1a1a1a] text-[#888888]">Image</div>
                    )}
                  </div>
                  <div className="p-6">
                    {post.categories?.[0] && (
                      <p className="mb-2 text-xs tracking-widest text-[#C9A84C] uppercase">{post.categories[0]}</p>
                    )}
                    <h2 className="font-display text-xl text-[#F5F5F0]">{title}</h2>
                    {excerpt && <p className="mt-2 text-sm text-[#888888] line-clamp-3">{excerpt}</p>}
                    <p className="mt-4 text-xs tracking-widest text-[#C9A84C]">{t("read_more")} →</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
