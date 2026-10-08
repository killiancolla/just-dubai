"use client";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PriceDisplay from "@/components/ui/PriceDisplay";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";
import type { WhatsAppService } from "@/lib/whatsapp";

export type PriceLine = { aed: number; prefix?: string; suffix?: string };

interface Props {
  service: WhatsAppService;
  item: string;
  message: string;
  prices: PriceLine[];
  onRequestLabel: string;
  ctaLabel: string;
  shortCtaLabel: string;
  reassurance: string;
}

/**
 * Bloc de réservation mobile/tablette des fiches produit :
 * - un bloc prix + CTA juste sous le titre (au-dessus de la ligne de flottaison) ;
 * - une barre sticky en bas d'écran dès que ce bloc sort de l'écran.
 * Sur desktop (lg+), c'est la colonne latérale sticky qui joue ce rôle.
 */
export default function DetailBookingCTA({ service, item, message, prices, onRequestLabel, ctaLabel, shortCtaLabel, reassurance }: Props) {
  const inlineRef = useRef<HTMLDivElement>(null);
  const [pastInline, setPastInline] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const showBar = pastInline && !atBottom;

  useEffect(() => {
    const el = inlineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastInline(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(el);
    // Masquée en bas de page pour laisser le footer lisible.
    const onScroll = () =>
      setAtBottom(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const main = prices[0];

  return (
    <>
      <div ref={inlineRef} className="mt-5 lg:hidden">
        {prices.length ? (
          <div className="space-y-1">
            {prices.map((p, i) => (
              <p key={i} className={i === 0 ? "font-display text-2xl text-[#C9A84C]" : "text-sm text-[#9A9A9A]"}>
                {p.prefix ? <span className="text-sm text-[#888888]">{p.prefix} </span> : null}
                <PriceDisplay aed={p.aed} />
                {p.suffix ? <span className={i === 0 ? "text-sm text-[#888888]" : ""}> {p.suffix}</span> : null}
              </p>
            ))}
          </div>
        ) : (
          <p className="font-display text-2xl text-[#C9A84C]">{onRequestLabel}</p>
        )}
        <WhatsAppLink
          message={message}
          service={service}
          placement="detail_inline"
          item={item}
          className="mt-4 flex w-full items-center justify-center gap-3 bg-[#C9A84C] py-4 text-sm tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#E8D08A]"
        >
          <FaWhatsapp className="h-5 w-5 shrink-0" />
          {ctaLabel}
        </WhatsAppLink>
        <p className="mt-3 text-center text-xs text-[#888888]">{reassurance}</p>
      </div>

      {/* Barre sticky mobile */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-[#2A2A2A] bg-[#0A0A0A]/95 px-4 pt-3 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
          showBar ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        aria-hidden={!showBar}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-[#F5F5F0]">{item}</p>
            <p className="truncate text-sm text-[#C9A84C]">
              {main ? (
                <>
                  {main.prefix ? <span className="text-[11px] text-[#888888]">{main.prefix} </span> : null}
                  <PriceDisplay aed={main.aed} />
                  {main.suffix ? <span className="text-[11px] text-[#888888]"> {main.suffix}</span> : null}
                </>
              ) : (
                onRequestLabel
              )}
            </p>
          </div>
          <WhatsAppLink
            message={message}
            service={service}
            placement="detail_sticky"
            item={item}
            className="flex shrink-0 items-center gap-2 bg-[#25D366] px-4 py-3 text-xs font-medium tracking-wide text-white"
          >
            <FaWhatsapp className="h-4 w-4 shrink-0" />
            {shortCtaLabel}
          </WhatsAppLink>
        </div>
      </div>
    </>
  );
}
