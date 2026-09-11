/**
 * Official brand assets — Prince M Furnishing Concept Ltd.
 *
 * Source of truth: the three logo variations supplied by the client, stored
 * untouched in `public/images/brand/prince1..3.jpeg`. The web-optimised
 * copies below are format-converted/resized ONLY — never redesigned,
 * recoloured, cropped or re-proportioned.
 *
 * Usage map (per CEO Phase 1 brief):
 *  - `brandLogo` (medallion seal)   → header, footer, mobile menu, favicon,
 *                                     app icons (see src/app/*.ico|png)
 *  - `brandLockup` (name lockup)    → the About-section brand card and other
 *                                     full-brand moments; native 326px
 *                                     export for small surfaces only, never
 *                                     upscaled. Also kept for social avatars.
 *  - prince3 banner (navy)          → archived for external/print/social
 *                                     cover use; not placed on the black/gold
 *                                     site chrome (background conflict).
 */

export const brandLogo = {
  src: "/images/brand/logo-medallion.jpg",
  width: 512,
  height: 512,
  /** Descriptive alt for standalone placements; brand links use alt="" with an aria-labelled link instead. */
  alt: "Official seal of Prince M Furnishing Concept Ltd: a royal crown above the letters PMFC and the word LTD inside a beaded gold medallion.",
} as const;

export const brandLockup = {
  src: "/images/brand/logo-lockup.jpg",
  /** Native export size — displayed at or below this width, never above. */
  width: 326,
  height: 326,
  alt: "Official Prince M Furnishing Concept Ltd logo: gold crown above an armchair outline holding a PMFC plaque, with the company name written beneath.",
} as const;

/** Wordmark lines set alongside the official seal. */
export const brandWordmark = {
  /** Short brand line. */
  primary: "Prince M",
  /** Legal suffix line. */
  secondary: "Furnishing Concept Ltd",
} as const;
