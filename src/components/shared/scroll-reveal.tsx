"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

type Role = "eyebrow" | "heading" | "statement" | "copy" | "cta" | "rail" | "image" | "mask";
type Cue = { element: HTMLElement; role: Role; delay: number; direction?: "left" | "right" };
const timing: Record<Role, number> = {
  eyebrow: 650, heading: 900, statement: 950, copy: 780,
  cta: 700, rail: 650, image: 1150, mask: 1100,
};
const rise: Record<Role, number> = {
  eyebrow: 16, heading: 76, statement: 88, copy: 38,
  cta: 24, rail: 12, image: 35, mask: 0,
};
const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

/** One motion director: scene recipes, a shared observer and browser-native
 * scroll timelines. No scroll listeners, geometry loop or animation library.
 * Server Components supply the entire approved, visible document unchanged.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) return;
    const mobile = matchMedia("(max-width: 767px)");
    const cues = new Map<HTMLElement, Cue[]>();
    const owned = new Set<HTMLElement>();
    const decorated = new Set<HTMLElement>();
    const animations = new Map<HTMLElement, Animation>();
    let stopped = false;
    const all = (root: ParentNode, selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
    const one = (root: ParentNode, selector: string) => root.querySelector<HTMLElement>(selector);
    const cue = (anchor: HTMLElement | null, element: HTMLElement | null, role: Role, delay = 0, direction?: "left" | "right") => {
      if (!anchor || !element || owned.has(element)) return;
      owned.add(element);
      const list = cues.get(anchor) ?? [];
      list.push({ element, role, delay, direction });
      cues.set(anchor, list);
    };
    const solo = (element: HTMLElement | null, role: Role, delay = 0) => cue(element, element, role, delay);
    const decorate = (element: HTMLElement | null, attribute: string) => {
      if (!element) return;
      element.setAttribute(attribute, "");
      decorated.add(element);
    };
    const text = (root: HTMLElement | null, base = 0) => {
      if (!root) return;
      const eyebrow = one(root, ".eyebrow");
      solo(eyebrow, "eyebrow", base);
      all(root, "h1, h2, h3").forEach(e => solo(e, "heading", base + 130));
      all(root, ":scope > p:not(.eyebrow)").forEach((e, i) => solo(e, "copy", base + 250 + i * 80));
    };
    const image = (frame: HTMLElement | null, delay = 0, mask = false, parallax = false, direction?: "left" | "right") => {
      if (!frame) return;
      const img = one(frame, "img");
      if (mask) cue(frame, frame, "mask", delay, direction);
      cue(frame, img, "image", delay);
      if (parallax) {
        decorate(img, "data-motion-parallax");
        // The timeline subject must sit outside its own clipping scrollport.
        // An anonymous view() on the image would track overflow:hidden rather
        // than document scrolling and appear permanently stuck at 50%.
        decorate(frame.matches("li, figure") ? frame : frame.closest("section"), "data-motion-timeline");
      }
    };

    // HERO: the visual establishes the space before the six text beats.
    const hero = one(document, "#top");
    if (hero) {
      image(one(hero, ":scope > div:first-child"), 0, false, true);
      const content = one(hero, ".max-w-3xl");
      if (content) Array.from(content.children).forEach((e, i) => {
        const roles: Role[] = ["eyebrow", "heading", "copy", "cta", "rail"];
        cue(hero, e as HTMLElement, roles[i] ?? "rail", 160 + i * 150);
      });
    }

    // BRAND: a vertical image aperture against a staggered editorial column.
    const about = one(document, "#about");
    if (about) {
      const column = one(about, ".order-2");
      text(column ? one(column, ":scope > div:first-child") : null);
      all(about, ".space-y-5 > p").forEach((e, i) => solo(e, "copy", 180 + i * 120));
      solo(column ? one(column, ":scope > p") : null, "rail", 250);
      // Mask the photo itself, not the gold offset frame or official logo.
      const photo = one(about, ".frame-offset > img");
      cue(photo, photo, "mask", 100);
    }

    // SERVICES: fixed backgrounds and hairlines; image, title, description,
    // capabilities and link are separate beats, introduced column by column.
    const services = one(document, "#services");
    if (services) {
      text(one(services, ".max-w-3xl"));
      all(services, ":scope > div > ol > li").forEach((panel, i) => {
        decorate(panel, "data-motion-clip");
        const base = i * 150;
        image(one(panel, ":scope > div:first-child"), base);
        const body = one(panel, ":scope > div:last-child");
        if (!body) return;
        cue(body, one(body, "h3"), "heading", base + 120);
        cue(body, one(body, ":scope > p"), "copy", base + 240);
        const capabilities = one(body, "ul");
        if (capabilities) all(capabilities, ":scope > li").forEach((e, n) => cue(capabilities, e, "rail", base + 340 + n * 60));
        solo(one(body, ":scope > p:last-child"), "cta", base + 440);
      });
      const band = one(services, ":scope > div > div:last-child");
      text(band ? one(band, ":scope > div:first-child") : null);
      solo(band ? one(band, ":scope > div:last-child") : null, "cta", 280);
    }

    // STATEMENT: a full-bleed chapter transition, independently moving image
    // and typography; never translate the section or its borders.
    const statement = one(document, 'section[aria-labelledby="statement-title"]');
    if (statement) {
      image(one(statement, ":scope > div:first-child"), 0, true, true);
      solo(one(statement, ".eyebrow"), "eyebrow", 100);
      solo(one(statement, "h2"), "statement", 220);
      solo(one(statement, ".text-lead"), "copy", 380);
    }

    // FEATURED: alternating masked/unmasked photographs, then captions.
    // Only the two major tiles have drift; existing hover transforms survive.
    const projects = one(document, "#projects");
    if (projects) {
      text(one(projects, ":scope > div > div:first-child > div"));
      all(projects, ":scope > div > ul > li").forEach((tile, i) => {
        image(tile, (i % 3) * 140, i === 0 || i === 3, i === 0 || i === 3);
        cue(tile, one(tile, "figure"), "copy", (i % 3) * 140 + 300);
      });
      solo(one(projects, ":scope > div > div:last-child"), "cta", 180);
    }

    const why = one(document, 'section[aria-labelledby="why-title"]');
    if (why) {
      text(one(why, ".lg\\:sticky > div"));
      all(why, "ol > li").forEach(row => {
        cue(row, one(row, ":scope > p"), "rail");
        cue(row, one(row, "h3"), "heading", 130);
        cue(row, one(row, "div > p"), "copy", 280);
      });
    }
    const contact = one(document, "#contact");
    if (contact) {
      image(one(contact, ":scope > div:first-child"));
      text(one(contact, ".container-site"));
      solo(one(contact, ".container-site > div"), "cta", 400);
    }

    // SERVICES PAGE: alternating apertures and text, individual capability
    // details, then a calm closing enquiry beat.
    const servicesHero = one(document, 'section[aria-labelledby="services-page-title"]');
    if (servicesHero) {
      text(one(servicesHero, ".lg\\:col-span-7"));
      all(servicesHero, "nav li").forEach((e, i) => solo(e, "copy", 320 + i * 120));
    }
    all(document, "main > div > section").forEach((chapter, i) => {
      text(one(chapter, "header"));
      image(one(chapter, ":scope > figure"), 160, true, i === 1, i % 2 ? "right" : "left");
      const body = one(chapter, ":scope > div");
      if (!body) return;
      solo(one(body, ":scope > p"), "copy", 240);
      all(body, ":scope > div:first-of-type > div").forEach((e, n) => {
        all(e, ":scope > p").forEach((p, j) => cue(e, p, j ? "copy" : "rail", 120 + (n % 2) * 120 + j * 100));
      });
      solo(one(body, ":scope > div:last-child"), "cta", 300);
    });
    const closing = one(document, 'section[aria-labelledby="services-closing-title"]');
    if (closing) {
      text(one(closing, ".container-site > div"));
      solo(one(closing, ".container-site > a"), "cta", 320);
    }
    all(document, "footer > .container-site > div").forEach((column, i) => {
      all(column, ":scope > p, :scope > ul, :scope > a").forEach((e, j) => solo(e, "rail", i * 70 + j * 90));
    });

    const play = (list: Cue[], immediate = false) => {
      for (const { element, role, delay, direction } of list) {
        if (element.dataset.motionState === "done") continue;
        element.dataset.motionState = "done";
        if (immediate || stopped) continue;
        const distance = rise[role] * (mobile.matches ? 0.58 : 1);
        let frames: [Keyframe, Keyframe];
        if (role === "mask") {
          const inset = direction === "left" ? "inset(0 100% 0 0)" : direction === "right" ? "inset(0 0 0 100%)" : "inset(0 0 92% 0)";
          frames = [{ clipPath: inset }, { clipPath: "inset(0 0 0 0)" }];
          // An unwrapped brand photograph gets both aperture and settling.
          if (element.tagName === "IMG") {
            frames[0].transform = "translateY(min(25px, 2.5%)) scale(1.06)";
            frames[1].transform = "none";
          }
        } else if (role === "image") {
          frames = [{ transform: `translateY(min(${distance}px, 3%)) scale(1.08)` }, { transform: "none" }];
        } else {
          frames = [
            { opacity: role === "eyebrow" ? 0 : 0.25, transform: `translateY(${distance}px)` },
            { opacity: 1, transform: "none" },
          ];
          if (role === "heading" || role === "statement") {
            frames[0].clipPath = "inset(0 0 80% 0)";
            frames[1].clipPath = "inset(0 0 0 0)";
          }
        }
        const animation = element.animate(frames, {
          duration: timing[role], delay: delay * (mobile.matches ? 0.6 : 1), easing, fill: "both",
        });
        animations.set(element, animation);
        animation.onfinish = () => {
          // Release all transforms/masks, so sticky positioning, stretched
          // links, focus rings and the approved hover states work normally.
          animation.cancel();
          animations.delete(element);
        };
      }
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        play(cues.get(entry.target as HTMLElement) ?? []);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

    for (const [anchor, list] of cues) {
      list.forEach(({ element, role }) => {
        element.dataset.motionRole = role;
        element.dataset.motionState = "pending";
      });
      if (anchor.getBoundingClientRect().bottom <= 0 || anchor.contains(document.activeElement)) play(list, true);
      else observer.observe(anchor);
    }
    const showAll = () => {
      stopped = true;
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      owned.forEach(element => {
        element.removeAttribute("data-motion-state");
        element.removeAttribute("data-motion-role");
      });
      decorated.forEach(element => {
        element.removeAttribute("data-motion-parallax");
        element.removeAttribute("data-motion-timeline");
        element.removeAttribute("data-motion-clip");
      });
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      for (const [anchor, list] of cues) {
        if (!anchor.contains(event.target)) continue;
        list.forEach(({ element }) => {
          if (element.dataset.motionState === "pending") element.dataset.motionState = "done";
        });
        observer.unobserve(anchor);
      }
    };
    const onReduced = () => { if (reduced.matches) showAll(); };
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) showAll(); };
    reduced.addEventListener("change", onReduced);
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("focusin", onFocus);
    return () => {
      showAll();
      reduced.removeEventListener("change", onReduced);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);

  return null;
}
