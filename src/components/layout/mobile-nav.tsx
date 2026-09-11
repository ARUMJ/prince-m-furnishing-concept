"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/ui/icons";
import type { NavItem } from "@/data/homepage";
import { cn } from "@/lib/utils/cn";

/**
 * Accessible full-screen mobile menu.
 *
 * - Dialog semantics: role="dialog", aria-modal, labelled by the panel title
 * - Focus moves into the panel on open and returns to the trigger on close
 * - Tab cycling is trapped inside the panel while it is open
 * - Escape closes; clicking a link closes before the browser scrolls
 * - The panel is `inert` when closed, so hidden links are unreachable
 */
export function MobileNav({
  items,
  whatsappHref,
  children,
}: {
  items: readonly NavItem[];
  whatsappHref: string;
  /** Brand slot rendered at the top of the open panel. */
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;

    document.documentElement.classList.add("overflow-hidden");

    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    focusables()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const list = focusables();
      if (list.length === 0) return;
      const first = list[0] as HTMLElement;
      const last = list[list.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove("overflow-hidden");
      // Focus restoration is handled by the explicit close paths (Escape,
      // close button) — restoring it on link-click closes would fight the
      // browser's scroll to the clicked anchor.
    };
  }, [open]);

  function closeAndRefocus() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-accent/50 text-accent transition-colors duration-200 hover:bg-accent hover:text-on-accent"
      >
        <WhatsAppIcon className="h-5 w-5" />
      </a>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-hairline text-foreground transition-colors duration-200 hover:border-accent/60 hover:text-accent"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="h-6 w-6"
        >
          {/* Morphing hamburger → X */}
          <line
            x1="4"
            y1={open ? 12 : 7}
            x2="20"
            y2={open ? 12 : 7}
            className="origin-center transition-transform duration-300"
            transform={open ? "rotate(45)" : undefined}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            className={cn(
              "transition-opacity duration-200",
              open ? "opacity-0" : "opacity-100",
            )}
          />
          <line
            x1="4"
            y1={open ? 12 : 17}
            x2="20"
            y2={open ? 12 : 17}
            className="transition-transform duration-300"
            transform={open ? "rotate(-45)" : undefined}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </svg>
      </button>

      <div
        ref={panelRef}
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        inert={!open}
        data-state={open ? "open" : "closed"}
        className={cn(
          "mobile-menu fixed inset-0 z-50 flex flex-col bg-background",
        )}
      >
        <div className="container-site flex h-20 shrink-0 items-center justify-between border-b border-hairline">
          {children}
          <button
            type="button"
            onClick={closeAndRefocus}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-hairline text-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            <span className="sr-only">Close menu</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="h-5 w-5"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
          <ul className="container-site flex flex-col py-6">
            {items.map((item, index) => (
              <li key={item.href} className="menu-item" style={{ "--menu-index": index } as React.CSSProperties}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-hairline/60 py-5 font-display text-2xl text-foreground transition-colors duration-200 hover:text-accent"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-xs tracking-[0.3em] text-subtle">
                    0{index + 1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-site py-6">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 w-full items-center justify-center gap-3 rounded-sm bg-accent px-6 text-sm font-medium uppercase tracking-[0.16em] text-on-accent transition-colors duration-200 hover:bg-accent-strong"
            onClick={() => setOpen(false)}
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
