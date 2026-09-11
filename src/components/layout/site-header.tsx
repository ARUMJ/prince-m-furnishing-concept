import Link from "next/link";

import { business } from "@/data/business";

/**
 * Phase 0 shell. The official logo (three variations are being supplied by
 * the client) will replace the text wordmark in Phase 1 — see
 * `public/images/README.md`. No navigation is rendered yet because no other
 * routes exist; links to unbuilt pages would be broken routes.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/90 backdrop-blur-sm">
      <div className="container-site flex h-16 items-center">
        <Link
          href="/"
          aria-label={`${business.legalName} — home`}
          className="font-display text-lg tracking-wide text-foreground transition-colors hover:text-accent"
        >
          {business.name}
        </Link>
      </div>
    </header>
  );
}
