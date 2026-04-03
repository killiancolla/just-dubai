"use client";
import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/client";
import Badge from "@/components/ui/Badge";

interface Vehicle {
  _id: string;
  name: string;
  slug: { current: string };
  brand: string;
  model: string;
  year: number;
  fuel: string;
  mainPhoto: any;
}

export default function VehicleCatalogue({ vehicles }: { vehicles: Vehicle[] }) {
  const t = useTranslations("cars");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [sort, setSort] = useState("newest");

  const brands = useMemo(() => [...new Set(vehicles.map((v) => v.brand))].sort(), [vehicles]);

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => {
      if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.model?.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedBrand && v.brand !== selectedBrand) return false;
      if (selectedFuel && v.fuel !== selectedFuel) return false;
      return true;
    });

    if (sort === "newest") result.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    else if (sort === "alpha") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [vehicles, search, selectedBrand, selectedFuel, sort]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* Header */}
      <div className="border-b border-[#222222] bg-[#111111] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Flotte</p>
          <h1 className="font-display text-4xl font-light text-[#F5F5F0] md:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-[#888888]">{t("subtitle")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Filters bar */}
        <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-[#222222] pb-8">
          <input
            type="text"
            placeholder={t("filter_model")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[160px] bg-[#111111] border border-[#222222] px-4 py-2 text-sm text-[#F5F5F0] placeholder-[#444] outline-none focus:border-[#C9A84C]"
          />
          <div className="relative">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="appearance-none bg-[#111111] border border-[#222222] pl-4 pr-10 py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            >
              <option value="">{t("filter_brand")}</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[#888888]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l4 4 4-4"/></svg>
          </div>
          <div className="relative">
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="appearance-none bg-[#111111] border border-[#222222] pl-4 pr-10 py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            >
              <option value="">{t("filter_fuel")}</option>
              <option value="essence">Essence</option>
              <option value="hybride">Hybride</option>
              <option value="electrique">Électrique</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[#888888]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l4 4 4-4"/></svg>
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-[#111111] border border-[#222222] pl-4 pr-10 py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            >
              <option value="newest">{t("sort_newest")}</option>
              <option value="alpha">A → Z</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[#888888]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l4 4 4-4"/></svg>
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-[#888888]">{filtered.length} véhicule{filtered.length !== 1 ? "s" : ""}</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-[#888888]">Aucun véhicule trouvé</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((vehicle, i) => (
              <motion.div
                key={vehicle._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              >
                <Link href={`/${locale}/voitures/${vehicle.slug.current}`} className="luxury-card group block bg-[#111111]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {vehicle.mainPhoto ? (
                      <Image
                        src={urlFor(vehicle.mainPhoto).width(600).height(450).url()}
                        alt={vehicle.name}
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
                    <p className="text-xs tracking-widest text-[#888888] uppercase">{vehicle.brand} · {vehicle.year}</p>
                    <h2 className="font-display mt-1 text-xl text-[#F5F5F0]">{vehicle.name}</h2>
                    <div className="mt-4 flex items-center justify-between">
                      {vehicle.fuel && (
                        <span className="text-xs text-[#888888] capitalize">{vehicle.fuel}</span>
                      )}
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
