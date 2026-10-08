"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { Clock, BadgeCheck, MessageCircle, ArrowRight, CalendarDays } from "lucide-react";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";

/**
 * Hero pensé comme le haut d'une landing page Ads : le titre, la promesse et
 * la CTA WhatsApp sont rendus immédiatement (pas d'apparition différée), seuls
 * les éléments décoratifs sont animés.
 */
export default function HeroSection() {
  const t = useTranslations("hero");
  const tCro = useTranslations("cro");
  const tMsg = useTranslations("wa_msg");
  const locale = useLocale();

  const badges = [
    { icon: Clock, label: t("badge_delivery") },
    { icon: BadgeCheck, label: t("badge_no_deposit") },
    { icon: MessageCircle, label: t("badge_whatsapp") },
    { icon: CalendarDays, label: t("badge_since") },
  ];

  return (
    <section className="relative flex min-h-[92svh] flex-col overflow-hidden sm:min-h-dvh">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] sm:blur-none"
        suppressHydrationWarning
      >
        <source src="/hero-ferrari-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/hero-ferrari-desktop.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/55 to-[#0A0A0A]/85" />

      {/* Decorative gold lines — desktop only */}
      <div className="absolute inset-0 hidden sm:block">
        <div className="absolute left-0 top-1/4 h-px w-1/3 bg-linear-to-r from-transparent to-[#C9A84C]/30" />
        <div className="absolute right-0 bottom-1/3 h-px w-1/3 bg-linear-to-l from-transparent to-[#C9A84C]/30" />
        <div className="absolute left-1/4 top-0 h-1/3 w-px bg-linear-to-b from-transparent to-[#C9A84C]/20" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-12 pt-24 text-center sm:px-6 sm:pb-16 sm:pt-28">
        <p className="mb-3 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Dubai · UAE</p>
        <h1 className="font-display max-w-5xl text-[2rem] font-light leading-tight text-[#F5F5F0] sm:text-4xl md:text-5xl lg:text-6xl">
          {t("tagline")}
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto my-4 h-px bg-[#C9A84C] sm:my-6 sm:w-[120px]"
        />
        <p className="mb-6 max-w-2xl text-[15px] font-light leading-relaxed text-[#D0C8B8] sm:mb-8 sm:text-base md:text-lg">
          {tCro("hero_subtitle")}
        </p>

        {/* CTA principale : WhatsApp */}
        <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:w-auto sm:items-center">
          <WhatsAppLink
            message={tMsg("general")}
            service="general"
            placement="hero"
            className="inline-flex w-full items-center justify-center gap-3 bg-[#C9A84C] px-5 py-4 text-sm tracking-wide text-[#0A0A0A] shadow-lg shadow-black/30 transition-colors hover:bg-[#E8D08A] sm:w-auto sm:px-10 sm:tracking-widest"
          >
            <FaWhatsapp className="h-5 w-5 shrink-0" />
            {tCro("hero_cta_whatsapp")}
          </WhatsAppLink>

          {/* CTA secondaires : découvrir l'offre */}
          <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-center sm:gap-4">
            <Link
              href={`/${locale}/voitures`}
              className="inline-flex items-center justify-center gap-2 border border-[#C9A84C]/70 bg-[#0A0A0A]/40 px-4 py-3.5 text-xs tracking-widest text-[#F5F5F0] backdrop-blur-sm transition-colors hover:border-[#C9A84C] hover:text-[#C9A84C] sm:px-8 sm:text-sm"
            >
              {tCro("hero_cta_cars")}
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            </Link>
            <Link
              href={`/${locale}/yachts`}
              className="inline-flex items-center justify-center gap-2 border border-[#C9A84C]/70 bg-[#0A0A0A]/40 px-4 py-3.5 text-xs tracking-widest text-[#F5F5F0] backdrop-blur-sm transition-colors hover:border-[#C9A84C] hover:text-[#C9A84C] sm:px-8 sm:text-sm"
            >
              {tCro("hero_cta_yachts")}
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Réassurance — compacte sur mobile, pastilles sur desktop */}
        <ul className="mt-6 grid w-full max-w-md grid-cols-2 gap-x-3 gap-y-2 text-left sm:mt-10 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-3">
          {badges.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 text-[11px] leading-tight tracking-wide text-[#E8E2D6] uppercase sm:rounded-full sm:border sm:border-[#C9A84C]/40 sm:bg-[#0A0A0A]/60 sm:px-4 sm:py-2 sm:text-xs sm:tracking-widest sm:text-[#F5F5F0] sm:backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-[#C9A84C] sm:h-4 sm:w-4" strokeWidth={1.5} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 hidden pb-10 sm:flex sm:justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-[#888888]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-6 w-px bg-linear-to-b from-[#C9A84C] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
