import { business } from "@/data/business";

/**
 * Site-wide SEO configuration.
 *
 * `NEXT_PUBLIC_SITE_URL` is the only environment variable the SEO layer
 * needs. While it is unset the site is treated as a development preview:
 * crawlers are disallowed and every page is marked noindex, so a staging
 * deployment can never be indexed by mistake.
 */

const DEFAULT_URL = "http://localhost:3000";

/** Absolute origin, never with a trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_URL).replace(
  /\/$/,
  "",
);

/** True once the site is deployed to its real domain. */
export const isIndexable = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export const siteConfig = {
  /** Brand name used in titles and social metadata. */
  name: business.legalName,
  /** Default description; factual and specific to the three service lines. */
  description:
    "Prince M Furnishing Concept Ltd supplies plywood and accessories, constructs furniture and provides interior design services.",
  title: {
    default: `${business.legalName} | Plywood, Furniture & Interior Design`,
    template: `%s | ${business.legalName}`,
  },
  /**
   * Language tag for og:locale and hreflang. Kept neutral ("en") until the
   * business confirms a regional variant such as "en_NG".
   */
  locale: "en",
  /**
   * Default 1200×630 social share card, used by buildMetadata for every
   * page unless overridden. Concept art direction, not project photography
   * — replace alongside the temporary imagery.
   */
  shareImage: "/images/general/og-share.jpg",
} as const;

export type SiteRoute = {
  /** Absolute-from-origin path, e.g. "/services/interior-design". */
  readonly path: string;
  readonly changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  readonly priority: number;
};

/**
 * Every indexable route. Add new pages here as they ship and they appear in
 * sitemap.xml automatically.
 */
export const siteRoutes: readonly SiteRoute[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
];

/** Resolve an origin-relative path against the configured site URL. */
export function absoluteUrl(path: string = "/"): string {
  return new URL(path, siteUrl).toString();
}
