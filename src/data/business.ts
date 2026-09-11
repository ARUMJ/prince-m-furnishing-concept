import { WHATSAPP_NUMBER } from "@/lib/utils/whatsapp";

/**
 * Single source of truth for verified business facts.
 *
 * Nothing in this file may be invented. If a detail has not been supplied by
 * the business, leave it out of `business` and out of the structured data
 * until it is confirmed.
 */

export type BusinessService = {
  /** Used as the URL slug for future individual service pages. */
  readonly id: string;
  readonly label: string;
};

export const business = {
  /** Trading name used in headings and body copy. */
  name: "Prince M Furnishing Concept",
  /** Registered name, used in metadata and structured data. */
  legalName: "Prince M Furnishing Concept Ltd",
  phone: {
    /** As customers dial it locally. */
    display: "08073161010",
    /** E.164-style international form, used for tel: links and schema.org. */
    international: `+${WHATSAPP_NUMBER}`,
    /** Ready-made href for telephone links. */
    tel: `tel:+${WHATSAPP_NUMBER}`,
  },
  services: [
    { id: "plywood-and-accessories", label: "Plywood and accessories" },
    { id: "furniture-construction", label: "Furniture construction" },
    { id: "interior-design", label: "Interior design" },
  ] satisfies readonly BusinessService[],
} as const;

/**
 * Business details that are still unverified and therefore deliberately
 * absent from the site and from the JSON-LD: physical address, email,
 * opening hours, geo coordinates, price range, ratings and social profiles.
 *
 * Once the client confirms a value, add it here and extend
 * `localBusinessSchema()` — no other file needs to change.
 */
export type VerifiedBusinessDetails = {
  readonly email?: string;
  readonly streetAddress?: string;
  readonly addressLocality?: string;
  readonly addressRegion?: string;
  readonly postalCode?: string;
  readonly addressCountry?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly socialProfiles?: readonly string[];
};

export const verifiedBusinessDetails: VerifiedBusinessDetails = {};
