import { business } from "@/data/business";

/**
 * Site-wide SEO configuration.
 *
 * `NEXT_PUBLIC_SITE_URL` is the only environment variable the SEO layer
 * needs. While it is unset (or set to a blank/invalid value) the site is
 * treated as a development preview: crawlers are disallowed and every page
 * is marked noindex, so a staging deployment can never be indexed by
 * mistake. Vercel preview builds without the variable configured fall back
 * to the auto-injected deployment URL for canonical/OG purposes while
 * remaining noindex — `siteUrl` is always a valid absolute origin, so
 * `new URL(...)` can never receive an empty string.
 */

const DEFAULT_URL = "http://localhost:3000";

/** Parse a candidate origin; returns undefined for blank or non-http(s) values. */
function validOrigin(value: string | undefined): URL | undefined {
  const raw = value?.trim();
  if (!raw) return undefined;

  try {
    const url = new URL(raw);
    if (url.protocol === "http:" || url.protocol === "https:") return url;
  } catch {
    return undefined;
  }
}

/** The origin explicitly configured for this deployment (drives indexability). */
const configuredOrigin = validOrigin(process.env.NEXT_PUBLIC_SITE_URL);

/**
 * Vercel injects `VERCEL_PROJECT_PRODUCTION_URL`/`VERCEL_URL` as bare
 * hostnames at build time. Used only as a display-origin fallback so
 * canonical and Open Graph URLs still point at the real deployment when
 * `NEXT_PUBLIC_SITE_URL` is missing or blank — it never enables indexing.
 */
function vercelOrigin(): URL | undefined {
  if (!process.env.VERCEL) return undefined;
  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (!host) return undefined;
  return validOrigin(`https://${host}`);
}

/**
 * The validated deployment origin object.
 *
 * Constructed exclusively from values that `validOrigin` has ALREADY parsed
 * (or from `DEFAULT_URL`), so no code path can ever hand an empty or invalid
 * string to `new URL()`. Use this directly for `metadataBase` — it can never
 * throw, and the stringified form below is what every other consumer reads.
 */
export const siteOrigin = configuredOrigin ?? vercelOrigin() ?? new URL(DEFAULT_URL);

/** Absolute origin string — always valid, never empty, no trailing slash. */
export const siteUrl = siteOrigin.toString().replace(/\/$/, "");

/** True only when a valid origin has been explicitly configured. */
export const isIndexable = configuredOrigin !== undefined;

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
