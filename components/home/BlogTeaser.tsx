"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { urlFor } from "@/sanity/lib/client";

interface Post {
  _id: string;
  title: { fr?: string; en?: string; ru?: string };
  slug: { current: string };
  publishedAt: string;
  coverImage: any;
  excerpt: { fr?: string; en?: string; ru?: string };
  categories: string[];
}

export default function BlogTeaser({ posts }: { posts: Post[] }) {
  const t = useTranslations();
  const locale = useLocale();

  if (!posts?.length) return null;

  return (
    <section className="bg-[#111111] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Blog</p>
            <h2 className="font-display text-3xl font-light text-[#F5F5F0] sm:text-4xl md:text-5xl">{t("home.blog_title")}</h2>
          </div>
          <Link href={`/${locale}/blog`} className="self-start text-sm tracking-widest text-[#888888] hover:text-[#C9A84C] sm:self-auto">
            {t("common.view_all")} →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
          {posts.map((post, i) => {
            const title = post.title?.[locale as keyof typeof post.title] ?? post.title?.fr ?? "";
            const excerpt = post.excerpt?.[locale as keyof typeof post.excerpt] ?? post.excerpt?.fr ?? "";
            return (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <Link href={`/${locale}/blog/${post.slug.current}`} className="luxury-card group flex h-full flex-col bg-[#0A0A0A]">
                  <div className="relative aspect-video overflow-hidden shrink-0">
                    {post.coverImage ? (
                      <Image
                        src={urlFor(post.coverImage).width(600).height(340).url()}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#1a1a1a] text-[#888888] text-sm">Image</div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-6">
                    {post.categories?.[0] && (
                      <p className="mb-1 text-xs tracking-widest text-[#C9A84C] uppercase sm:mb-2">{post.categories[0]}</p>
                    )}
                    <h3 className="font-display text-sm text-[#F5F5F0] sm:text-xl">{title}</h3>
                    {excerpt && <p className="mt-1 hidden text-sm leading-relaxed text-[#888888] line-clamp-2 sm:mt-2 sm:block">{excerpt}</p>}
                    <p className="mt-auto pt-2 text-xs tracking-widest text-[#C9A84C] sm:pt-4">{t("blog.read_more")} →</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
