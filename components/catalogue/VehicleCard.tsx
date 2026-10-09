"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/client";
import sanityLoader from "@/lib/sanityLoader";
import PriceDisplay from "@/components/ui/PriceDisplay";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";
import type { Vehicle } from "@/types/sanity";

interface Props {
  vehicle: Pick<Vehicle, "_id" | "name" | "slug" | "brand" | "year" | "pricePerDay" | "mainPhoto"> & { fuel?: string };
  /** light : fond crème de la Home ; dark : catalogue. */
  tone?: "light" | "dark";
  /** compact : grille 2 colonnes sur mobile (Home) — une seule CTA. */
  compact?: boolean;
  placement: string;
  priority?: boolean;
  /** Niveau de titre : h2 dans le catalogue (comme avant), h3 sur la Home. */
  headingLevel?: "h2" | "h3";
}

export default function VehicleCard({ vehicle, tone = "dark", compact = false, placement, priority = false, headingLevel = "h2" }: Props) {
  const t = useTranslations("cars");
  const tCommon = useTranslations("common");
  const tCro = useTranslations("cro");
  const tMsg = useTranslations("wa_msg");
  const locale = useLocale();
  const light = tone === "light";
  const Heading = headingLevel;
  const href = `/${locale}/voitures/${vehicle.slug.current}`;

  return (
    <article className={`luxury-card group flex h-full flex-col ${light ? "bg-white" : "border border-[#1E1E1E] bg-[#111111]"}`}>
      <Link href={href} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
          {vehicle.mainPhoto ? (
            <Image
              loader={sanityLoader}
              src={urlFor(vehicle.mainPhoto).url()}
              alt={vehicle.name}
              fill
              sizes={compact ? "(max-width: 1024px) 50vw, 25vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              quality={75}
              priority={priority}
            />
          ) : (
            <div className={`flex h-full items-center justify-center text-sm ${light ? "bg-[#EDE8DF] text-[#999]" : "bg-[#1a1a1a] text-[#888888]"}`}>
              {tCommon("photo_soon")}
            </div>
          )}
        </div>
        <div className={`flex flex-1 flex-col ${compact ? "p-3 sm:p-5" : "p-5"}`}>
          <p className="text-[11px] tracking-widest text-[#888888] uppercase sm:text-xs">
            {vehicle.brand}
            {vehicle.year ? ` · ${vehicle.year}` : ""}
          </p>
          <Heading className={`font-display mt-0.5 leading-snug ${compact ? "text-base sm:text-xl" : "text-xl"} ${light ? "text-[#1A1A1A]" : "text-[#F5F5F0]"}`}>
            {vehicle.name}
          </Heading>
          <div className="mt-auto flex items-end justify-between gap-2 pt-2 sm:pt-3">
            {vehicle.pricePerDay ? (
              <p className={`${compact ? "text-xs sm:text-sm" : "text-sm"} ${light ? "text-[#9A7B2C]" : "text-[#C9A84C]"}`}>
                <span className="text-[11px] text-[#888888]">{tCommon("starting_from")} </span>
                <PriceDisplay aed={vehicle.pricePerDay} className="font-medium" />{" "}
                <span className="text-[11px] text-[#888888]">{t("per_day")}</span>
              </p>
            ) : (
              <p className="text-xs tracking-widest text-[#C9A84C] uppercase">{t("on_request")}</p>
            )}
            {!compact && (
              <span className="shrink-0 text-[11px] tracking-widest text-[#888888] uppercase transition-colors group-hover:text-[#C9A84C]">
                {tCro("view_details")} →
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className={compact ? "px-3 pb-3 sm:px-5 sm:pb-5" : "px-5 pb-5"}>
        <WhatsAppLink
          message={tMsg("car", { name: vehicle.name })}
          service="car"
          placement={placement}
          item={vehicle.name}
          className="flex w-full items-center justify-center gap-2 bg-[#C9A84C] px-2 py-3 text-xs tracking-wide text-[#0A0A0A] transition-colors hover:bg-[#E8D08A]"
        >
          <FaWhatsapp className="h-4 w-4 shrink-0" />
          {compact ? (
            <>
              <span className="sm:hidden">{tCro("availability_short")}</span>
              <span className="hidden sm:inline">{tCro("check_availability")}</span>
            </>
          ) : (
            tCro("check_availability")
          )}
        </WhatsAppLink>
      </div>
    </article>
  );
}
