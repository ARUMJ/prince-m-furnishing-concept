/**
 * WhatsApp is the primary contact channel for Prince M Furnishing Concept.
 *
 * The number lives here and nowhere else — every CTA (header, hero, contact,
 * floating button, quote actions) must build its link through `whatsappUrl`
 * so the number is never duplicated across the codebase.
 */

/** International format, without "+" or separators, as required by wa.me. */
export const WHATSAPP_NUMBER = "2348073161010";

/** Local format, for on-screen display to Nigerian customers. */
export const WHATSAPP_DISPLAY_NUMBER = "08073161010";

/** Base deep link. Opens a chat with the business on web or mobile. */
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Build a WhatsApp deep link, optionally pre-filling the message.
 *
 * @example whatsappUrl("Hello, I would like a quote for a wardrobe.")
 * // => "https://wa.me/2348073161010?text=Hello%2C%20I%20would%20like..."
 */
export function whatsappUrl(message?: string): string {
  if (!message) return WHATSAPP_BASE_URL;

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}
