/**
 * Point d'entrée unique pour tous les liens WhatsApp du site.
 *
 * - `whatsappUrl()` construit le lien wa.me avec un message prérempli.
 * - `trackWhatsAppClick()` envoie la conversion Google Ads existante et pousse
 *   des événements dans le dataLayer pour Google Tag Manager / GA4.
 *
 * Événements dataLayer poussés à chaque clic :
 *   1. `whatsapp_click` (générique, tous les boutons)
 *   2. `<service>_whatsapp_click` (ex. `car_whatsapp_click`, `yacht_whatsapp_click`)
 * avec les paramètres `whatsapp_service`, `whatsapp_placement`, `whatsapp_item`,
 * `page_path`.
 */

export const WHATSAPP_NUMBER = "971581515981";
export const WHATSAPP_DISPLAY = "+971 58 151 5981";

/** Conversion Google Ads déjà en place avant la refonte CRO — inchangée. */
export const ADS_WHATSAPP_CONVERSION = "AW-18438884789/QSeNCI3evvgcELWbrNhE";

export type WhatsAppService = "car" | "yacht" | "concierge" | "general" | "loyalty";

export const WHATSAPP_SERVICE_EVENTS: Record<WhatsAppService, string> = {
  car: "car_whatsapp_click",
  yacht: "yacht_whatsapp_click",
  concierge: "concierge_whatsapp_click",
  general: "general_whatsapp_click",
  loyalty: "loyalty_whatsapp_click",
};

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export interface WhatsAppTrackingData {
  service: WhatsAppService;
  /** Emplacement du bouton : hero, card, sticky, header, footer, etc. */
  placement: string;
  /** Produit concerné (nom du véhicule ou du yacht) quand il y en a un. */
  item?: string;
}

type TrackingWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Record<string, unknown>[];
};

export function trackWhatsAppClick({ service, placement, item }: WhatsAppTrackingData) {
  if (typeof window === "undefined") return;
  const w = window as TrackingWindow;

  const params = {
    whatsapp_service: service,
    whatsapp_placement: placement,
    whatsapp_item: item ?? "",
    page_path: window.location.pathname,
  };

  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "whatsapp_click", ...params });
    w.dataLayer.push({ event: WHATSAPP_SERVICE_EVENTS[service], ...params });
  } catch {}

  try {
    if (w.gtag) {
      w.gtag("event", "conversion", { send_to: ADS_WHATSAPP_CONVERSION });
    }
  } catch {}
}
