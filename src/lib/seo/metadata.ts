import type { Metadata } from "next";

import { isIndexable, siteConfig } from "@/lib/seo/config";

type PageMetadataOptions = {
  /**
   * Page title without the brand suffix — the root layout's template turns
   * "Interior Design" into "Interior Design | Prince M Furnishing Concept Ltd".
   * Omit it on the homepage so the default title is used.
   */
  title?: string;
  description?: string;
  /** Origin-relative path, used for the canonical URL. Defaults to "/". */
  path?: string;
  type?: "website" | "article";
  /** Overrides the environment-derived indexing decision for a single page. */
  indexable?: boolean;
  /** Origin-relative path to a real 1200×630 image. Defaults to the site share card. */
  image?: string;
};

/**
 * Build a complete `Metadata` object for a page or route segment.
 *
 * Relative URLs (canonical, Open Graph image) are resolved against the
 * `metadataBase` declared in the root layout.
 *
 * @example export const metadata = buildMetadata({ title: "Interior Design", path: "/services/interior-design" })
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  type = "website",
  indexable = isIndexable,
  image = siteConfig.shareImage,
}: PageMetadataOptions = {}): Metadata {
  const socialTitle = title ? `${title} | ${siteConfig.name}` : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      locale: siteConfig.locale,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: socialTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: false },
  };
}

/** Metadata inherited by every route unless a segment overrides it. */
export const defaultMetadata: Metadata = buildMetadata();
