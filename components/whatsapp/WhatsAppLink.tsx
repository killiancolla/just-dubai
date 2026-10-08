"use client";
import type { ReactNode } from "react";
import { trackWhatsAppClick, whatsappUrl, type WhatsAppService } from "@/lib/whatsapp";

interface Props {
  /** Message prérempli dans WhatsApp (déjà traduit). */
  message?: string;
  service: WhatsAppService;
  placement: string;
  item?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

/**
 * Lien WhatsApp traçable. Toutes les CTA WhatsApp du site passent par ce
 * composant : même numéro, message prérempli, conversion Ads et événements
 * dataLayer identiques.
 *
 * Sélecteurs utilisables dans GTM : `.js-whatsapp-cta`, `[data-wa-service]`,
 * `[data-wa-placement]`, `[data-wa-item]`.
 */
export default function WhatsAppLink({ message, service, placement, item, className, ariaLabel, children }: Props) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`js-whatsapp-cta ${className ?? ""}`}
      data-wa-service={service}
      data-wa-placement={placement}
      data-wa-item={item || undefined}
      onClick={() => trackWhatsAppClick({ service, placement, item })}
    >
      {children}
    </a>
  );
}
