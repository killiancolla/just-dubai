"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { Users, Ruler } from "lucide-react";
import { urlFor } from "@/sanity/lib/client";
import sanityLoader from "@/lib/sanityLoader";
import PriceDisplay from "@/components/ui/PriceDisplay";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";
import { formatLength } from "@/lib/units";
import type { Yacht } from "@/types/sanity";

interface Props {
  yacht: Pick<Yacht, "_id" | "name" | "slug" | "lengthFeet" | "capacity" | "pricePerHour" | "pricePerDay" | "mainPhoto">;
  compact?: boolean;
  placement: string;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}

/** Prix de référence pour trier : tarif horaire, à défaut tarif journée ramené à l'heure. */
export function yachtSortPrice(y: Pick<Yacht, "pricePerHour" | "pricePerDay">): number {
  if (y.pricePerHour) return y.pricePerHour;
  if (y.pricePerDay) return y.pricePerDay / 24;
  return Number.POSITIVE_INFINITY; // « Sur devis » en fin de liste
}

export default function YachtCard({ yacht, compact = false, placement, priority = false, headingLevel = "h2" }: Props) {
  const t = useTranslations("yachts");
  const tCommon = useTranslations("common");
  const tCro = useTranslations("cro");
  const tMsg = useTranslations("wa_msg");
  const locale = useLocale();
  const Heading = headingLevel;
  const href = `/${locale}/yachts/${yacht.slug.current}`;
  const length = formatLength(yacht.lengthFeet, locale);

  return (
    <article className="luxury-card group flex h-full flex-col border border-[#1E1E1E] bg-[#111111]">
      <Link href={href} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
          {yacht.mainPhoto ? (
            <Image
              loader={sanityLoader}
              src={urlFor(yacht.mainPhoto).url()}
              alt={yacht.name}
              fill
              sizes={compact ? "(max-width: 1024px) 50vw, 25vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              quality={75}
              priority={priority}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#1a1a1a] text-sm text-[#888888]">{tCommon("photo_soon")}</div>
          )}
        </div>
        <div className={`flex flex-1 flex-col ${compact ? "p-3 sm:p-5" : "p-5"}`}>
          <Heading className={`font-display leading-snug text-[#F5F5F0] ${compact ? "text-base sm:text-xl" : "text-xl"}`}>{yacht.name}</Heading>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-wide text-[#888888] sm:text-xs">
            {length ? (
              <span className="inline-flex items-center gap-1">
                <Ruler className="h-3 w-3 text-[#C9A84C]" strokeWidth={1.5} />
                {length}
              </span>
            ) : null}
            {yacht.capacity ? (
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3 text-[#C9A84C]" strokeWidth={1.5} />
                {yacht.capacity} {t("capacity_persons")}
              </span>
            ) : null}
          </p>
          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
            {yacht.pricePerHour || yacht.pricePerDay ? (
              <div className="space-y-0.5">
                {yacht.pricePerHour ? (
                  <p className={`text-[#C9A84C] ${compact ? "text-xs sm:text-sm" : "text-sm"}`}>
                    <PriceDisplay aed={yacht.pricePerHour} className="font-medium" />{" "}
                    <span className="text-[11px] text-[#888888]">{t("per_hour")}</span>
                  </p>
                ) : null}
                {yacht.pricePerDay ? (
                  <p className="text-[11px] text-[#888888]">
                    <PriceDisplay aed={yacht.pricePerDay} /> {t("per_day")}
                  </p>
                ) : null}
              </div>
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
          message={tMsg("yacht", { name: yacht.name })}
          service="yacht"
          placement={placement}
          item={yacht.name}
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
