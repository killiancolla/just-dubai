"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-ferrari.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/50 to-[#0A0A0A]/80" />

      {/* Decorative gold lines */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/4 h-px w-1/3 bg-gradient-to-r from-transparent to-[#C9A84C]/30" />
        <div className="absolute right-0 bottom-1/3 h-px w-1/3 bg-gradient-to-l from-transparent to-[#C9A84C]/30" />
        <div className="absolute left-1/4 top-0 h-1/3 w-px bg-gradient-to-b from-transparent to-[#C9A84C]/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4 text-xs tracking-[0.4em] text-[#C9A84C] uppercase"
        >
          Dubai · UAE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-5xl font-light leading-tight text-[#F5F5F0] md:text-7xl lg:text-8xl"
        >
          {t("tagline")}
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mx-auto my-6 h-px bg-[#C9A84C]"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-10 text-lg font-light text-[#D0C8B8]"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href={`/${locale}/voitures`}
            className="inline-flex items-center gap-3 bg-[#C9A84C] px-8 py-4 text-sm tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#E8D08A]"
          >
            {t("cta_cars")}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href={`/${locale}/yachts`}
            className="inline-flex items-center gap-3 border border-[#C9A84C] px-8 py-4 text-sm tracking-widest text-[#C9A84C] transition-colors hover:bg-[#C9A84C] hover:text-[#0A0A0A]"
          >
            {t("cta_yachts")}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-[#888888]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-6 w-px bg-gradient-to-b from-[#C9A84C] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
