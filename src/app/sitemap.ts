import type { MetadataRoute } from "next";

import { absoluteUrl, siteRoutes } from "@/lib/seo/config";

/**
 * Generated from `siteRoutes` in `src/lib/seo/config.ts` — adding a route
 * there adds it here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
