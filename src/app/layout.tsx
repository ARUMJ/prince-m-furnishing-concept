import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/shared/json-ld";
import { siteConfig, siteUrl } from "@/lib/seo/config";
import { defaultMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema } from "@/lib/seo/schema";

import "./globals.css";

/**
 * Two families only. Playfair Display carries headings; Inter carries
 * everything else.
 *
 * Both are self-hosted variable WOFF2 files (SIL Open Font License — see
 * src/fonts/LICENSE-*.txt) loaded through next/font, so they are preloaded,
 * have an automatic metric-adjusted fallback and cost no third-party request.
 * `weight` declares the variable axis range so 500/600/700 use the real axis
 * instead of being synthesised.
 */
const inter = localFont({
  src: "../fonts/inter-latin-variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const playfairDisplay = localFont({
  src: "../fonts/playfair-display-latin-variable.woff2",
  variable: "--font-playfair",
  weight: "400 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...defaultMetadata,
  title: siteConfig.title,
  applicationName: siteConfig.name,
};

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.locale} className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="flex min-h-dvh flex-col bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
