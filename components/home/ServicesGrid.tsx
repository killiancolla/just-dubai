"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/client";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";
import type { SanityImage } from "@/types/sanity";
import type { WhatsAppService } from "@/lib/whatsapp";

interface Props {
  carPhoto?: SanityImage | null;
  yachtPhoto?: SanityImage | null;
}

type Card = {
  key: string;
  title: string;
  desc: string;
  image: string | null;
  href?: string;
  linkLabel?: string;
  service: WhatsAppService;
  message: string;
  waLabel: string;
};

/** Section « Interest » : les univers proposés, chacun avec sa CTA. */
export default function ServicesGrid({ carPhoto, yachtPhoto }: Props) {
  const t = useTranslations("cro");
  const tMsg = useTranslations("wa_msg");
  const locale = useLocale();

  const cards: Card[] = [
    {
      key: "cars",
      title: t("service_cars_title"),
      desc: t("service_cars_desc"),
      image: carPhoto ? urlFor(carPhoto).width(900).height(640).url() : null,
      href: `/${locale}/voitures`,
      linkLabel: t("hero_cta_cars"),
      service: "car",
      message: tMsg("cars"),
      waLabel: t("availability_short"),
    },
    {
      key: "yachts",
      title: t("service_yachts_title"),
      desc: t("service_yachts_desc"),
      image: yachtPhoto ? urlFor(yachtPhoto).width(900).height(640).url() : null,
      href: `/${locale}/yachts`,
      linkLabel: t("hero_cta_yachts"),
      service: "yacht",
      message: tMsg("yachts"),
      waLabel: t("availability_short"),
    },
    {
      key: "custom",
      title: t("service_custom_title"),
      desc: t("service_custom_desc"),
      image: "/club/dubai-left.jpg",
      service: "concierge",
      message: tMsg("custom"),
      waLabel: t("service_custom_cta"),
    },
  ];

  return (
    <section id="services" className="scroll-mt-20 bg-[#0A0A0A] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-14">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("services_label")}</p>
          <h2 className="font-display text-3xl font-light text-[#F5F5F0] sm:text-4xl md:text-5xl">{t("services_title")}</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((card) => (
            <article key={card.key} className="luxury-card group flex flex-col border border-[#222222] bg-[#111111]">
              <div className="relative aspect-[16/10] overflow-hidden">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[#1a1a1a]" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#111111]/80 via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-2xl text-[#F5F5F0]">
                  {card.href ? (
                    <Link href={card.href} className="hover:text-[#C9A84C]">
                      {card.title}
                    </Link>
                  ) : (
                    card.title
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9A9A9A]">{card.desc}</p>
                <div className={`mt-auto grid gap-2 pt-5 ${card.href ? "grid-cols-2" : "grid-cols-1"}`}>
                  {card.href && card.linkLabel ? (
                    <Link
                      href={card.href}
                      className="inline-flex items-center justify-center gap-2 border border-[#C9A84C] px-3 py-3 text-[11px] tracking-wider sm:text-xs sm:tracking-widest text-[#C9A84C] transition-colors hover:bg-[#C9A84C] hover:text-[#0A0A0A]"
                    >
                      {card.linkLabel}
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                    </Link>
                  ) : null}
                  <WhatsAppLink
                    message={card.message}
                    service={card.service}
                    placement="home_services"
                    className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] px-3 py-3 text-[11px] tracking-wider sm:text-xs sm:tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#E8D08A]"
                  >
                    <FaWhatsapp className="h-4 w-4 shrink-0" />
                    {card.waLabel}
                  </WhatsAppLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
