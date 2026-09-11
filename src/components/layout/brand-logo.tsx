import Link from "next/link";

import { business } from "@/data/business";

/**
 * The site's brand lockup.
 *
 * PHASE 1 STATUS: the official logo files are supplied by the client and
 * live in `public/images/brand/`. Until the approved primary logo is placed
 * there, this renders the interim text wordmark carried over from Phase 0 —
 * deliberately NOT a redesigned or typographic substitute for the official
 * artwork. When the logo is integrated, this single component becomes the
 * only place that needs to change (header, footer and any brand area all
 * consume it).
 */
export function BrandLogo({
  size = "sm",
  withTagline = false,
}: {
  size?: "sm" | "lg";
  withTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${business.legalName} — home`}
      className={cnLogo(size)}
    >
      <span
        className={
          size === "lg"
            ? "font-display text-2xl tracking-[0.14em] text-foreground transition-colors duration-300 group-hover:text-accent"
            : "font-display text-lg tracking-[0.12em] text-foreground transition-colors duration-300 group-hover:text-accent"
        }
      >
        {business.name}
      </span>
      {withTagline ? (
        <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.42em] text-subtle">
          Furnishing Concept Ltd
        </span>
      ) : null}
    </Link>
  );
}

function cnLogo(size: "sm" | "lg") {
  return [
    "group inline-flex flex-col leading-none",
    size === "lg" ? "py-1" : "",
  ].join(" ");
}
