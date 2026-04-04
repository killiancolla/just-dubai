"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Truck, BadgeCheck, MessageCircle } from "lucide-react";

const items = [
  { key: "delivery", icon: <Truck className="h-8 w-8" strokeWidth={1} /> },
  { key: "no_deposit", icon: <BadgeCheck className="h-8 w-8" strokeWidth={1} /> },
  { key: "whatsapp", icon: <MessageCircle className="h-8 w-8" strokeWidth={1} /> },
];

export default function ReassuranceSection() {
  const t = useTranslations();

  return (
    <section className="bg-[#111111] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("reassurance.label")}</p>
          <h2 className="font-display text-4xl font-light text-[#F5F5F0]">{t("home.reassurance_title")}</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="border border-[#222222] p-8 text-center"
            >
              <div className="mb-4 flex justify-center text-[#C9A84C]">{item.icon}</div>
              <h3 className="font-display mb-2 text-xl text-[#F5F5F0]">{t(`reassurance.${item.key}`)}</h3>
              <p className="text-sm text-[#888888]">{t(`reassurance.${item.key}_desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
