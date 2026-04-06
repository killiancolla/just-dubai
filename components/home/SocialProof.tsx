"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Users, Heart, Car, Anchor } from "lucide-react";

type SocialProofData = {
  clientsCount?: number;
  followersCount?: number;
  weeklyVehicleBookings?: number;
  weeklyYachtBookings?: number;
};

function AnimatedCounter({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView.current) {
          inView.current = true;
          const start = 0;
          const duration = 1800;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayed(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {displayed.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function SocialProof({ data }: { data: SocialProofData | null }) {
  const t = useTranslations("social_proof");

  if (!data || (!data.clientsCount && !data.followersCount && !data.weeklyVehicleBookings && !data.weeklyYachtBookings)) {
    return null;
  }

  const stats = [
    data.clientsCount
      ? { icon: <Users className="h-7 w-7" strokeWidth={1} />, value: data.clientsCount, label: t("clients") }
      : null,
    data.followersCount
      ? { icon: <Heart className="h-7 w-7" strokeWidth={1} />, value: data.followersCount, label: t("followers") }
      : null,
    data.weeklyVehicleBookings
      ? { icon: <Car className="h-7 w-7" strokeWidth={1} />, value: data.weeklyVehicleBookings, label: t("vehicle_bookings") }
      : null,
    data.weeklyYachtBookings
      ? { icon: <Anchor className="h-7 w-7" strokeWidth={1} />, value: data.weeklyYachtBookings, label: t("yacht_bookings") }
      : null,
  ].filter(Boolean) as { icon: React.ReactNode; value: number; label: string }[];

  return (
    <section className="bg-[#0A0A0A] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("label")}</p>
          <h2 className="font-display text-4xl font-light text-[#F5F5F0]">{t("title")}</h2>
        </div>
        <div className={`grid grid-cols-2 gap-3 sm:gap-8 md:grid-cols-${stats.length}`}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="border border-[#222222] p-4 text-center sm:p-8"
            >
              <div className="mb-3 flex justify-center text-[#C9A84C]">{stat.icon}</div>
              <p className="font-display text-2xl font-light text-[#F5F5F0] mb-1 sm:text-4xl sm:mb-2">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="text-xs tracking-widest text-[#888888] uppercase leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
