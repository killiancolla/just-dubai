"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

interface FaqItem {
  _id: string;
  question: { fr?: string; en?: string; ru?: string };
  answer: { fr?: string; en?: string; ru?: string };
}

export default function FaqSection({ items }: { items: FaqItem[] }) {
  const t = useTranslations("faq");
  const locale = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);

  if (!items?.length) return null;

  return (
    <section className="bg-[#0A0A0A] py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-xs tracking-[0.4em] text-[#C9A84C] uppercase">{t("label")}</p>
          <h2 className="font-display text-4xl font-light text-[#F5F5F0] md:text-5xl">{t("title")}</h2>
        </div>

        <div className="divide-y divide-[#1E1E1E]">
          {items.map((item, i) => {
            const question = item.question?.[locale as keyof typeof item.question] ?? item.question?.fr ?? "";
            const answer = item.answer?.[locale as keyof typeof item.answer] ?? item.answer?.fr ?? "";
            const isOpen = openId === item._id;

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item._id)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-[#F5F5F0] leading-snug">{question}</span>
                  <span
                    className="shrink-0 text-[#C9A84C] text-xl transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm leading-relaxed text-[#888888]">{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
