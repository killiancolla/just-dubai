"use client";
import { Fragment, useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { displayLengthToFeet } from "@/lib/units";
import YachtCard, { yachtSortPrice } from "@/components/catalogue/YachtCard";
import WhatsAppHelpBlock from "@/components/whatsapp/WhatsAppHelpBlock";
import type { Yacht } from "@/types/sanity";

/** Position du bloc « Vous ne savez pas quel yacht choisir ? » dans la grille. */
const HELP_AFTER = 6;

export default function YachtCatalogue({ yachts }: { yachts: Yacht[] }) {
  const t = useTranslations("yachts");
  const tCro = useTranslations("cro");
  const tMsg = useTranslations("wa_msg");
  const locale = useLocale();

  // Par défaut : du moins cher au plus cher.
  const [sort, setSort] = useState("price-asc");
  const [minLength, setMinLength] = useState(0);
  const [minCapacity, setMinCapacity] = useState(0);

  const filtered = useMemo(() => {
    const minLengthFeet = minLength ? displayLengthToFeet(minLength, locale) : 0;
    const result = yachts.filter((y) => {
      if ((y.lengthFeet ?? 0) < minLengthFeet) return false;
      if ((y.capacity ?? 0) < minCapacity) return false;
      return true;
    });
    if (sort === "price-asc") result.sort((a, b) => yachtSortPrice(a) - yachtSortPrice(b) || a.name.localeCompare(b.name));
    else if (sort === "price-desc") result.sort((a, b) => {
      const pa = yachtSortPrice(a), pb = yachtSortPrice(b);
      // « Sur devis » reste en fin de liste dans les deux sens.
      if (!Number.isFinite(pa)) return 1;
      if (!Number.isFinite(pb)) return -1;
      return pb - pa;
    });
    else if (sort === "alpha") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "length-desc") result.sort((a, b) => (b.lengthFeet ?? 0) - (a.lengthFeet ?? 0));
    return result;
  }, [yachts, sort, minLength, minCapacity, locale]);

  const helpBlock = (
    <div className="col-span-full">
      <WhatsAppHelpBlock
        title={tCro("yachts_help_title")}
        desc={tCro("yachts_help_desc")}
        cta={tCro("yachts_help_cta")}
        message={tMsg("yachts_help")}
        service="yacht"
        placement="catalogue_help"
      />
    </div>
  );

  const inputClass =
    "w-full bg-[#111111] border border-[#222222] px-3 py-2.5 text-sm text-[#F5F5F0] placeholder-[#555] outline-none focus:border-[#C9A84C] sm:w-24";

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="border-b border-[#222222] bg-[#111111] px-5 py-6 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("label")}</p>
          <h1 className="font-display text-3xl font-light text-[#F5F5F0] sm:text-4xl md:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-sm text-[#888888] sm:text-base">{t("subtitle")}</p>
          <p className="mt-3 text-xs tracking-wide text-[#C9A84C]/90">{tCro("reassure_yacht")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-10">
        <div className="mb-4 grid grid-cols-[1.4fr_1fr_1fr] items-end gap-2 border-b border-[#222222] pb-4 sm:mb-8 sm:flex sm:flex-wrap sm:items-center sm:gap-6 sm:pb-8">
          <div className="relative sm:flex sm:items-center sm:gap-2">
            <label htmlFor="yacht-sort" className="sr-only text-xs tracking-widest text-[#888888] uppercase sm:not-sr-only">
              {t("sort_by")}
            </label>
            <select
              id="yacht-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none bg-[#111111] border border-[#222222] pl-3 pr-8 py-2.5 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A84C] sm:w-auto sm:pl-4 sm:pr-10"
            >
              <option value="price-asc">{tCro("sort_price_asc")}</option>
              <option value="price-desc">{tCro("sort_price_desc")}</option>
              <option value="length-desc">{t("sort_largest")}</option>
              <option value="alpha">A → Z</option>
            </select>
            <ChevronDown className="pointer-events-none absolute bottom-3.5 right-3 h-3 w-3 text-[#888888] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2" strokeWidth={1.5} />
          </div>
          <div className="sm:flex sm:items-center sm:gap-2">
            <label htmlFor="yacht-length" className="mb-1 block truncate text-[10px] text-[#888888] sm:mb-0 sm:text-xs">
              {t("filter_length")} min
            </label>
            <input
              id="yacht-length"
              type="number"
              inputMode="numeric"
              min={0}
              value={minLength || ""}
              onChange={(e) => setMinLength(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div className="sm:flex sm:items-center sm:gap-2">
            <label htmlFor="yacht-capacity" className="mb-1 block truncate text-[10px] text-[#888888] sm:mb-0 sm:text-xs">
              {t("filter_capacity")} min
            </label>
            <input
              id="yacht-capacity"
              type="number"
              inputMode="numeric"
              min={0}
              value={minCapacity || ""}
              onChange={(e) => setMinCapacity(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>

        <p className="mb-4 text-sm text-[#888888] sm:mb-5">{tCro("yachts_count", { count: filtered.length })}</p>

        {filtered.length === 0 ? (
          <div className="space-y-8 py-12 text-center text-[#888888]">
            <p>{t("no_results")}</p>
            {helpBlock}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((yacht, i) => (
              <Fragment key={yacht._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                  className="h-full"
                >
                  <YachtCard yacht={yacht} compact placement="catalogue_card" priority={i < 2} />
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
