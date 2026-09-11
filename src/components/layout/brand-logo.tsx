import Image from "next/image";
import Link from "next/link";

import { business } from "@/data/business";
import { brandLogo, brandWordmark } from "@/data/brand";

/**
 * The site's brand lockup: the official medallion seal (client artwork from
 * `public/images/brand/`, served unaltered) set alongside the company name
 * typeset as UI text.
 *
 * The seal canvas is square with a near-black vignette; it renders as a
 * circular badge via border-radius so only the dark photo-corner is masked
 * and the artwork itself stays intact at its natural proportions.
 *
 * Header, footer and the mobile menu all consume this single component.
 */
export function BrandLogo({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const variant =
    size === "lg"
      ? { seal: "h-14 w-14", px: "56px", name: "font-display text-xl tracking-[0.1em]" }
      : size === "md"
        ? { seal: "h-12 w-12", px: "48px", name: "font-display text-lg tracking-[0.1em]" }
        : { seal: "h-10 w-10", px: "40px", name: "font-display text-base tracking-[0.12em]" };

  return (
    <Link
      href="/"
      aria-label={`${business.legalName} — home`}
      className="group inline-flex items-center gap-3"
    >
      <span
        className={`${variant.seal} shrink-0 overflow-hidden rounded-full ring-1 ring-accent/30 transition duration-300 group-hover:ring-accent/70`}
      >
        <Image
          src={brandLogo.src}
          alt=""
          width={brandLogo.width}
          height={brandLogo.height}
          sizes={variant.px}
          className="h-full w-full object-cover"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`${variant.name} text-foreground transition-colors duration-300 group-hover:text-accent`}
        >
          {brandWordmark.primary}
        </span>
        <span className="mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-subtle">
          {brandWordmark.secondary}
        </span>
      </span>
    </Link>
  );
}
