"use client";
import { Fragment, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import VehicleCard from "@/components/catalogue/VehicleCard";
import WhatsAppHelpBlock from "@/components/whatsapp/WhatsAppHelpBlock";
import type { Vehicle } from "@/types/sanity";

/** Position du bloc d'aide au choix dans la grille. */
const HELP_AFTER = 8;

export default function VehicleCatalogue({ vehicles }: { vehicles: Vehicle[] }) {
  const t = useTranslations("cars");
  const tCro = useTranslations("cro");
  const tMsg = useTranslations("wa_msg");

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [sort, setSort] = useState("newest");

  const brands = useMemo(() => [...new Set(vehicles.map((v) => v.brand))].sort(), [vehicles]);

  const filtered = useMemo(() => {
    const result = vehicles.filter((v) => {
      if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.model?.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedBrand && v.brand !== selectedBrand) return false;
      if (selectedFuel && v.fuel !== selectedFuel) return false;
      return true;
    });

    if (sort === "newest") result.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    else if (sort === "alpha") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "price-asc") result.sort((a, b) => (a.pricePerDay ?? Infinity) - (b.pricePerDay ?? Infinity));
    else if (sort === "price-desc") result.sort((a, b) => (b.pricePerDay ?? -1) - (a.pricePerDay ?? -1));

    return result;
  }, [vehicles, search, selectedBrand, selectedFuel, sort]);

  const helpBlock = (
    <div className="col-span-full">
      <WhatsAppHelpBlock
        title={tCro("cars_help_title")}
        desc={tCro("cars_help_desc")}
        cta={tCro("yachts_help_cta")}
        message={tMsg("cars_help")}
        service="car"
        placement="catalogue_help"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* Header */}
      <div className="border-b border-[#222222] bg-[#111111] px-5 py-6 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("label")}</p>
          <h1 className="font-display text-3xl font-light text-[#F5F5F0] sm:text-4xl md:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-sm text-[#888888] sm:text-base">{t("subtitle")}</p>
          <p className="mt-3 text-xs tracking-wide text-[#C9A84C]/90">{tCro("reassure_car")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-10">
        {/* Filters bar */}
        <div className="mb-4 grid grid-cols-3 gap-2 border-b border-[#222222] pb-4 sm:mb-8 sm:pb-8 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
          <input
            type="text"
            placeholder={t("filter_model")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={t("filter_model")}
            className="col-span-3 w-full bg-[#111111] border border-[#222222] px-4 py-2.5 text-sm text-[#F5F5F0] placeholder-[#444] outline-none focus:border-[#C9A84C] sm:flex-1 sm:min-w-[160px] sm:w-auto"
          />
          <div className="relative">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full appearance-none bg-[#111111] border border-[#222222] pl-3 pr-7 py-2.5 text-[13px] sm:pl-4 sm:pr-10 sm:py-2 sm:text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            >
              <option value="">{t("filter_brand")}</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#888888] sm:right-3" strokeWidth={1.5} />
          </div>
          <div className="relative">
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full appearance-none bg-[#111111] border border-[#222222] pl-3 pr-7 py-2.5 text-[13px] sm:pl-4 sm:pr-10 sm:py-2 sm:text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            >
              <option value="">{t("filter_fuel")}</option>
              <option value="essence">{t("fuel_essence")}</option>
              <option value="hybride">{t("fuel_hybrid")}</option>
              <option value="electrique">{t("fuel_electric")}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#888888] sm:right-3" strokeWidth={1.5} />
          </div>
          <div className="relative sm:flex sm:items-center sm:gap-2">
            <span className="sr-only sm:not-sr-only text-xs tracking-widest text-[#888888] uppercase sm:inline">{t("sort_by")}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none bg-[#111111] border border-[#222222] pl-3 pr-7 py-2.5 text-[13px] sm:pl-4 sm:pr-10 sm:py-2 sm:text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C]"
            >
              <option value="newest">{t("sort_newest")}</option>
              <option value="price-asc">{tCro("sort_price_asc")}</option>
              <option value="price-desc">{tCro("sort_price_desc")}</option>
              <option value="alpha">A → Z</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#888888] sm:right-3" strokeWidth={1.5} />
          </div>
        </div>

        {/* Results count */}
        <p className="mb-4 text-sm text-[#888888] sm:mb-5">{tCro("vehicles_count", { count: filtered.length })}</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="space-y-8 py-12 text-center text-[#888888]">
            <p>{t("no_results")}</p>
            {helpBlock}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((vehicle, i) => (
              <Fragment key={vehicle._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                  className="h-full"
                >
                  <VehicleCard vehicle={vehicle} compact placement="catalogue_card" priority={i < 4} />
                </motion.div>
                {i === HELP_AFTER - 1 && filtered.length > HELP_AFTER ? helpBlock : null}
              </Fragment>
            ))}
            {filtered.length <= HELP_AFTER ? helpBlock : null}
          </div>
        )}
      </div>
    </div>
  );
}
