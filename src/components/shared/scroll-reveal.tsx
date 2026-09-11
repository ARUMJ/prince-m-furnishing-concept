"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/** No wrappers or server-side hiding: the approved layout remains the fallback.
 * One observer per route, one reveal per element, no scroll handlers or rAF.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.dataset.revealState = "visible";
        observer.unobserve(element);
      }
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    const showAll = () => {
      observer.disconnect();
      elements.forEach((element) => element.removeAttribute("data-reveal-state"));
    };
    // Keyboard navigation must never land on a transparent control.
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-reveal]");
      if (element?.dataset.revealState === "pending") {
        element.removeAttribute("data-reveal-state");
        observer.unobserve(element);
      }
    };
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) showAll(); };
    const onMotionChange = () => { if (motion.matches) showAll(); };

    for (const element of elements) {
      // Do not hide content above a restored scroll position / incoming anchor.
      if (element.dataset.revealState === "visible") continue;
      if (element.getBoundingClientRect().bottom <= 0 || element.contains(document.activeElement)) continue;
      element.dataset.revealState = "pending";
      observer.observe(element);
    }
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("focusin", onFocus);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      showAll();
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  return null;
}
