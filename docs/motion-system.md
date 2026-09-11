# Prince M — architectural motion system

## Ownership

`src/components/shared/scroll-reveal.tsx` is the single client-side motion director. It replaces the earlier uniform `data-reveal` system; the old attributes and reveal CSS are removed. Pages, content, metadata and section markup remain Server Components. The director's scene selectors intentionally follow the approved editorial markup; update the corresponding recipe if that markup ever changes.

- One shared IntersectionObserver per route, with an 8% bottom inset.
- Scene recipes register cue groups against stable existing elements. A tall Services column has separate image, body and capability triggers, so mobile content does not finish animating before it reaches the viewport.
- Browser Web Animations API runs finite transform/opacity/clip-path effects. Completed effects are cancelled to release their transforms, masks and containing blocks.
- Named native CSS view timelines drive only selected photographs. No scroll event handler, continuous JavaScript rAF loop, per-frame layout measurement or animation dependency.
- Cleanup on route changes, reduced-motion changes and bfcache restoration. Keyboard focus exposes pending content without waiting for a reveal.

## Timing and movement

All entrance effects use `cubic-bezier(0.22, 1, 0.36, 1)`.

| Role | Duration | Desktop movement |
| --- | --- | --- |
| Eyebrow | 650ms | 16px |
| Heading | 900ms | 76px with a text aperture |
| Visual Statement heading | 950ms | 88px with a text aperture |
| Supporting copy | 780ms | 38px |
| CTA | 700ms | 24px |
| Rail / capability label | 650ms | 12px |
| Image | 1150ms | up to 35px, scale 1.08 → 1 |
| Image aperture | 1100ms | vertical or alternating horizontal clip-path |

Image travel is capped at 3% of its height to retain edge coverage. The unwrapped Brand Intro photograph uses a 1.06 settle with a 2.5% travel cap; the gold offset frame and official logo are not animated.

The hero image starts first. The eyebrow, headline, supporting copy, CTA and service rail then start at 160 / 310 / 460 / 610 / 760ms. Other sequences use roughly 120–150ms beats. Services columns are offset by 150ms, with separate title, summary, capability and link beats; panel backgrounds and shared hairlines never fade or translate.

At widths below 768px, movement is 58% of desktop and delays are 60% of desktop. Masks and imagery remain animated.

## Scene compositions

- Hero: visual settle, five text beats, scroll-linked background.
- Brand Intro: vertical photo aperture, heading and individual paragraphs.
- Services: fixed triptych, sequential column images/content, delayed capability labels and links; independent conversion-band copy and buttons.
- Visual Statement: full-bleed image aperture, scroll-linked background, large masked typography, supporting copy.
- Featured Work: per-tile image settling and delayed captions; apertures and scroll-linked movement only on tiles 1 and 4. Original hover behavior remains available.
- Why Choose Prince M: separate numeral, heading and explanation in each ledger row; sticky heading container stays untransformed.
- Final CTA and footer: quiet supporting choreography, no full-section motion.
- Services page: sequenced page heading/index; alternating image apertures, headings, descriptions, capability details and CTAs in each chapter; separate closing enquiry beat.

## Scroll-linked imagery

Four homepage images (hero, statement, Featured Work tiles 1 and 4) and the second Services chapter image use named `--architecture` timelines. Each subject is the existing outer scene or photo frame, rather than an image inside an `overflow:hidden` scrollport.

The drift range is −20px to +20px on desktop/tablet and −8px to +8px on mobile, capped at 3% of image height. A persistent 1.12 desktop / 1.08 mobile overscan prevents edge exposure. The one-shot settle is independent of that overscan. Featured hover adds the original 5% enlargement on top of it.

Use `animation-range: normal`: the production CSS optimizer misserialized the earlier explicit `entry 0% exit 100%` shorthand and ended the animation too early. Chromium QA verified that the corrected timeline continues responding throughout the visible scene.

Browsers without native scroll timelines retain all entrance choreography, but omit parallax and its overscan.

## Accessibility and no-JS

No content is hidden in server markup. Motion attributes are added only after the observer is available and reduced motion has been checked. Reduced motion disables native scroll animation and all finite effects, including live preference changes. Print resets transforms, masks and opacity.

The former app-wide `loading.tsx` boundary left the actual static page in a hidden streamed React container without JavaScript. It was removed so both static routes render their complete content without JS. This removes only the transient loading skeleton, not page content, route metadata or the approved page layout.

## Production Chromium QA

Tested at 1440×1000 desktop, 768×1024 tablet and 390×844 mobile, plus a taller desktop viewport for triptych inspection.

- Native wheel traversal of every homepage section and every Services chapter, with arrival / middle / settled screenshots visually inspected.
- All six viewport/route combinations: zero browser exceptions, zero horizontal overflow, zero pending or dimmed motion targets after traversal.
- Hero sequencing, statement and chapter masks, per-tile reveals and Services column ordering inspected, including paused intermediate frames.
- Triptych backgrounds remained opaque and untransformed at every sampled animation time. All three images covered their frames at all sampled times on all three viewport sizes.
- Featured hover scales verified: 1.12 → 1.176 desktop/tablet, 1.08 → 1.134 mobile pointer emulation.
- Native timeline progress verified at different scroll positions; selected image coverage verified. Hero progress, for example, moved from about 48% to 79% while scrolling 600px in a 1000px-high viewport.
- Reduced motion, live reduced-motion changes, missing IntersectionObserver and JavaScript-disabled views tested. No-JS and reduced-motion main text lengths matched: 3960 characters on `/`, 2804 on `/services` at the same viewport.
- Client-side navigation from home to Services re-registers the correct scene recipes.
- `/`, `/services`, `/robots.txt`, `/sitemap.xml`: HTTP 200. Unknown route: HTTP 404.
- `npm run lint`, `npx tsc --noEmit`, `npm run build`: pass.

Screenshots, browser binaries and temporary QA scripts are kept outside the Git repository.
