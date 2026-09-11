# Prince M Furnishing Concept Ltd — Website

Production website for **Prince M Furnishing Concept Ltd**, covering plywood and
accessories sales, furniture construction and interior design.

**Status: Phase 0 — technical and design foundation.** The homepage, services,
projects and contact pages are delivered in later phases. Nothing on the site is
placeholder marketing copy, and no business detail has been invented.

---

## Technology stack

| Concern        | Choice                                        |
| -------------- | --------------------------------------------- |
| Framework      | Next.js **16.3.4** (App Router, Turbopack)     |
| Language       | TypeScript **5.9.3** (`strict` + extras)       |
| Styling        | Tailwind CSS **4.3.3** (CSS-first `@theme`)    |
| UI             | React **19.2.8**                               |
| Lint           | ESLint **9.39.5** + `eslint-config-next`       |
| Fonts          | Self-hosted variable WOFF2 via `next/font`     |
| Dependencies   | Runtime deps are `next`, `react`, `react-dom` only |

## Commands

```bash
npm install       # install dependencies
npm run dev       # development server on http://localhost:3000
npm run build     # production build
npm run start     # serve the production build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

## Architecture

```
src/
  app/
    layout.tsx        Root layout: fonts, metadata, landmarks, JSON-LD
    page.tsx          Phase 0 homepage placeholder
    globals.css       Design tokens + base styles + primitives
    not-found.tsx     404 page
    error.tsx         Error boundary (client component)
    loading.tsx       Instant loading state
    robots.ts         Generated robots.txt
    sitemap.ts        Generated sitemap.xml
    favicon.ico       Temporary favicon — replaced with the official logo in Phase 1
  components/
    layout/           SiteHeader, SiteFooter shells
    shared/           JsonLd renderer
    ui/               Button, ButtonLink primitives
  data/
    business.ts       Verified business facts + services (single source of truth)
  fonts/              Self-hosted Inter and Playfair Display + OFL licences
  lib/
    seo/              config.ts, metadata.ts, schema.ts
    utils/            cn.ts, whatsapp.ts
public/
  images/
    brand/ projects/ services/ general/
```

### Conventions

- **Server components by default.** `error.tsx` is the only client component and
  it exists because error boundaries require it.
- **`@/` alias** maps to `src/`.
- **No colour is hard-coded in components.** Everything consumes the semantic
  tokens in `globals.css` (`bg-background`, `text-muted`, `border-hairline`,
  `bg-accent`, `text-on-accent`). Retune the palette in one place.
- **Black is the foundation; gold is an accent.** Gold is reserved for primary
  actions, hairlines, small highlights and interactive states.
- **Typography:** Playfair Display for headings (`--font-display`), Inter for
  body and UI (`--font-sans`). Fluid scale via `--text-display`, `--text-title`
  and `--text-lead`.
- **Spacing** follows Tailwind's 0.25rem scale; page-level rhythm comes from
  `.container-site`.

## SEO foundation

Implemented in `src/lib/seo/`:

- `config.ts` — site URL, indexability, default title/description, route table.
- `metadata.ts` — `buildMetadata()` produces title, description, canonical,
  Open Graph, Twitter and robots metadata for any page.
- `schema.ts` — `LocalBusiness` JSON-LD injected once by the root layout.

Also in place: `sitemap.ts`, `robots.ts`, semantic landmarks (`header`, `main`,
`footer`), a single `h1` per page, `viewport` and `theme-color`, and
`images.formats` set to AVIF/WebP for future photography.

Page usage:

```ts
export const metadata = buildMetadata({
  title: "Interior Design",
  description: "…",
  path: "/services/interior-design",
});
```

The root layout supplies `metadataBase`, so canonical and image paths are
origin-relative.

### Structured data

`LocalBusiness` emits only verified facts: name, alternate name, description,
URL, telephone and an `OfferCatalog` of the three services. Address, geo,
opening hours, price range, ratings and social profiles are **deliberately
omitted**. To add one, extend `verifiedBusinessDetails` in
`src/data/business.ts` and handle it in `verifiedDetailsSchema()` — fabricated
LocalBusiness details are treated as spam by search engines.

## Environment

```bash
cp .env.example .env.local
```

| Variable               | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin, no trailing slash. Drives `metadataBase`, canonical URLs, robots.txt and sitemap.xml. |

While it is **unset** the site is treated as a development preview: robots are
disallowed and every page is `noindex, nofollow`, so a staging deployment can
never be indexed by accident. Set it in the Vercel project settings for
production.

## Assets

Photography lives in `public/images/`, organised by purpose:

- `brand/` — the three official logo variations and derived favicons
- `services/` — imagery for each service line
- `projects/` — completed project photography
- `general/` — textures, backgrounds, social share cards

**The logo is never redesigned, regenerated or re-proportioned.** The client
supplies three official variations; Phase 1 selects the one that works best
against the black/gold system and drops it into `brand/`. The current
`src/app/favicon.ico` is the framework default and must be replaced with an
export of the official mark.

All imagery is served through `next/image` with explicit dimensions, and every
image gets meaningful `alt` text (`alt=""` only when purely decorative).

## WhatsApp

Centralised in `src/lib/utils/whatsapp.ts`:

```ts
import { whatsappUrl, WHATSAPP_DISPLAY_NUMBER } from "@/lib/utils/whatsapp";

whatsappUrl("Hello, I would like a quote."); // https://wa.me/2348073161010?text=…
WHATSAPP_DISPLAY_NUMBER;                      // 08073161010
```

The number is declared once and nowhere else. Header, hero, contact, floating
button and quote CTAs must all build their links through `whatsappUrl()`; those
UI elements are Phase 1 work.

## Accessibility foundation

- Semantic landmarks and a logical heading hierarchy
- Skip-to-content link, visible on keyboard focus
- `:focus-visible` outline in brand gold on every interactive element
- Every foreground/background token pair passes WCAG AA; gold `#c9a44c` on black
  `#050506` measures 8.63:1 (AAA), body text 17.75:1, muted text 10.92:1
- `prefers-reduced-motion` disables smooth scrolling, transitions and animation
- `role="status"` loading state and `role="alert"` error state
- Mobile-first, responsive by default

## Performance foundation

- Static prerendering for every current route
- Two self-hosted variable font files, preloaded, with metric-adjusted fallbacks
  (no third-party request, no layout shift)
- Server components by default; no animation or UI libraries
- AVIF/WebP image optimisation configured for future photography

## Planned phases

| Phase | Scope                                                                  |
| ----- | ---------------------------------------------------------------------- |
| 0     | Technical + design foundation (this commit)                             |
| 1     | Logo selection, premium visual design, homepage                         |
| 2     | About, Services and individual service pages, Contact                   |
| 3     | Projects, gallery, product catalogue                                    |
| 4     | Quote/request system, blog and SEO content                              |
| 5     | CMS/admin functionality                                                 |

## Content policy

Never invent business information. If a detail has not been supplied —
address, email, opening hours, years of experience, project counts,
testimonials, ratings, awards, certifications, branches or service-area claims —
it stays out of the site and out of the structured data until the business
confirms it.
