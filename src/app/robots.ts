import type { MetadataRoute } from "next";

import { absoluteUrl, isIndexable, siteUrl } from "@/lib/seo/config";

/**
 * Crawlers are blocked until the site is deployed to its real domain
 * (`NEXT_PUBLIC_SITE_URL`), so previews and staging builds are never indexed.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
