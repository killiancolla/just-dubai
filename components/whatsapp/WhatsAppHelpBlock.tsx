"use client";
import { FaWhatsapp } from "react-icons/fa";
import WhatsAppLink from "@/components/whatsapp/WhatsAppLink";
import type { WhatsAppService } from "@/lib/whatsapp";

interface Props {
  title: string;
  desc?: string;
  cta: string;
  message: string;
  service: WhatsAppService;
  placement: string;
  /** dark : fonds noirs du site ; light : fonds crème. */
  variant?: "dark" | "light";
  className?: string;
}

/**
 * Bloc d'aide à la décision : récupère les prospects qui n'ont pas encore
 * choisi un produit précis et les envoie sur WhatsApp avec un message guidé.
 */
export default function WhatsAppHelpBlock({ title, desc, cta, message, service, placement, variant = "dark", className }: Props) {
  const dark = variant === "dark";
  return (
    <div
      className={`flex flex-col items-start gap-5 border p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10 ${
        dark ? "border-[#C9A84C]/40 bg-[#111111]" : "border-[#C9A84C]/50 bg-white"
      } ${className ?? ""}`}
    >
      <div className="max-w-2xl">
        <p className={`font-display text-2xl font-light sm:text-3xl ${dark ? "text-[#F5F5F0]" : "text-[#1A1A1A]"}`}>{title}</p>
        {desc ? <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-[#9A9A9A]" : "text-[#666666]"}`}>{desc}</p> : null}
      </div>
      <WhatsAppLink
        message={message}
        service={service}
        placement={placement}
        className="inline-flex w-full shrink-0 items-center justify-center gap-3 bg-[#C9A84C] px-6 py-4 text-sm tracking-wider text-[#0A0A0A] transition-colors hover:bg-[#E8D08A] md:w-auto"
      >
        <FaWhatsapp className="h-5 w-5 shrink-0" />
        {cta}
      </WhatsAppLink>
    </div>
  );
}
