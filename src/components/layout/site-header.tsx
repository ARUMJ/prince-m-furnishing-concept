import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { WhatsAppIcon } from "@/components/ui/icons";
import { heroWhatsappHref, primaryNav } from "@/data/homepage";

/**
 * Premium sticky header.
 *
 * Desktop: brand left, anchor navigation centre-right with an animated gold
 * underline on hover, gold WhatsApp CTA. Mobile: compact bar with an
 * icon-only WhatsApp target and an accessible full-screen menu (see
 * MobileNav). Server component; the only client island is the menu.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/92 backdrop-blur-md">
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <BrandLogo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={heroWhatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center gap-2.5 rounded-sm bg-accent px-5 text-xs font-semibold uppercase tracking-[0.18em] text-on-accent transition-colors duration-200 hover:bg-accent-strong lg:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
          <MobileNav items={primaryNav} whatsappHref={heroWhatsappHref}>
            <BrandLogo />
          </MobileNav>
        </div>
      </div>
    </header>
  );
}

/**
 * All nav entries route through next/link — App Router treats same-page
 * "/#section" links as hash navigation (no re-render) and relies on CSS
 * smooth-scroll with the scroll-margin offsets set in globals.css.
 */
function NavLink({ item }: { item: { label: string; href: string } }) {
  return (
    <Link
      href={item.href}
      className="link-underline text-sm tracking-[0.08em] text-muted transition-colors duration-200 hover:text-foreground"
    >
      {item.label}
    </Link>
  );
}
