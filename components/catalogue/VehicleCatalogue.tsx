"use client";
import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/client";
import sanityLoader from "@/lib/sanityLoader";
import { ChevronDown } from "lucide-react";
import PriceDisplay from "@/components/ui/PriceDisplay";
import type { Vehicle } from "@/types/sanity";

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
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("label")}</p>
          <h1 className="font-display text-4xl font-light text-[#F5F5F0] md:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-[#888888]">{t("subtitle")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Filters bar */}
        <div className="mb-8 grid grid-cols-2 gap-3 border-b border-[#222222] pb-8 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
          <input
            type="text"
            placeholder={t("filter_model")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="col-span-2 w-full bg-[#111111] border border-[#222222] px-4 py-2 text-sm text-[#F5F5F0] placeholder-[#444] outline-none focus:border-[#C9A84C] sm:flex-1 sm:min-w-[160px] sm:w-auto"
          />
          <div className="relative">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full appearance-none bg-[#111111] border border-[#222222] pl-4 pr-10 py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            >
              <option value="">{t("filter_brand")}</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[#888888]" strokeWidth={1.5} />
          </div>
          <div className="relative">
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full appearance-none bg-[#111111] border border-[#222222] pl-4 pr-10 py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            >
              <option value="">{t("filter_fuel")}</option>
              <option value="essence">{t("fuel_essence")}</option>
              <option value="hybride">{t("fuel_hybrid")}</option>
              <option value="electrique">{t("fuel_electric")}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[#888888]" strokeWidth={1.5} />
          </div>
          <div className="relative col-span-2 sm:col-span-1 sm:flex sm:items-center sm:gap-2">
            <span className="sr-only sm:not-sr-only text-xs tracking-widest text-[#888888] uppercase sm:inline">{t("sort_by")}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none bg-[#111111] border border-[#222222] pl-4 pr-10 py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            >
              <option value="newest">{t("sort_newest")}</option>
              <option value="alpha">A → Z</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[#888888]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-[#888888]">{filtered.length} véhicule{filtered.length !== 1 ? "s" : ""}</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-[#888888]">{t("no_results")}</div>
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
                        loader={sanityLoader}
                        src={urlFor(vehicle.mainPhoto).url()}
                        alt={vehicle.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        quality={75}
                        priority={i < 4}
                        loading={i < 4 ? "eager" : "lazy"}
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
                      {vehicle.pricePerDay ? (
                        <span className="text-xs text-[#C9A84C]">{tCommon("starting_from")} <PriceDisplay aed={vehicle.pricePerDay} /> {t("per_day")}</span>
                      ) : (
                        <span className="text-xs text-[#C9A84C] tracking-widest uppercase">{t("on_request")}</span>
                      )}
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
