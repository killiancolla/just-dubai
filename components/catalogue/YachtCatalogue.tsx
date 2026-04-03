"use client";
import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/client";
import Badge from "@/components/ui/Badge";

interface Yacht {
  _id: string;
  name: string;
  slug: { current: string };
  lengthMeters: number;
  capacity: number;
  mainPhoto: any;
}

export default function YachtCatalogue({ yachts }: { yachts: Yacht[] }) {
  const t = useTranslations("yachts");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const [sort, setSort] = useState("alpha");
  const [minLength, setMinLength] = useState(0);
  const [minCapacity, setMinCapacity] = useState(0);

  const filtered = useMemo(() => {
    let result = yachts.filter((y) => {
      if (y.lengthMeters < minLength) return false;
      if (y.capacity < minCapacity) return false;
      return true;
    });
    if (sort === "alpha") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "length-desc") result.sort((a, b) => (b.lengthMeters ?? 0) - (a.lengthMeters ?? 0));
    return result;
  }, [yachts, sort, minLength, minCapacity]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="border-b border-[#222222] bg-[#111111] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Mer</p>
          <h1 className="font-display text-4xl font-light text-[#F5F5F0] md:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-[#888888]">{t("subtitle")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-[#222222] pb-8">
          <div className="flex items-center gap-2">
            <label className="text-xs text-[#888888]">{t("filter_length")} min :</label>
            <input
              type="number"
              min={0}
              value={minLength || ""}
              onChange={(e) => setMinLength(Number(e.target.value))}
              className="w-20 bg-[#111111] border border-[#222222] px-3 py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-[#888888]">{t("filter_capacity")} min :</label>
            <input
              type="number"
              min={0}
              value={minCapacity || ""}
              onChange={(e) => setMinCapacity(Number(e.target.value))}
              className="w-20 bg-[#111111] border border-[#222222] px-3 py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            />
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-[#111111] border border-[#222222] pl-4 pr-10 py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            >
              <option value="alpha">A → Z</option>
              <option value="length-desc">Plus grand en premier</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[#888888]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l4 4 4-4"/></svg>
          </div>
        </div>

        <p className="mb-6 text-sm text-[#888888]">{filtered.length} yacht{filtered.length !== 1 ? "s" : ""}</p>

        {filtered.length === 0 ? (
          <div className="py-24 text-center text-[#888888]">Aucun yacht trouvé</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((yacht, i) => (
              <motion.div
                key={yacht._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              >
                <Link href={`/${locale}/yachts/${yacht.slug.current}`} className="luxury-card group block bg-[#111111]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {yacht.mainPhoto ? (
                      <Image
                        src={urlFor(yacht.mainPhoto).width(600).height(450).url()}
                        alt={yacht.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#1a1a1a] text-[#888888] text-sm">
                        {tCommon("photo_soon")}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs tracking-widest text-[#888888] uppercase">
                      {yacht.lengthMeters}{t("length_m")} · {yacht.capacity} {t("capacity_persons")}
                    </p>
                    <h2 className="font-display mt-1 text-xl text-[#F5F5F0]">{yacht.name}</h2>
                    <div className="mt-4">
                      <span className="text-xs text-[#C9A84C] tracking-widest uppercase">Sur devis</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
