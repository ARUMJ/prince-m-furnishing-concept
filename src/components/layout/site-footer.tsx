import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { WhatsAppIcon } from "@/components/ui/icons";
import { business } from "@/data/business";
import { primaryNav } from "@/data/homepage";
import { whatsappUrl, WHATSAPP_DISPLAY_NUMBER } from "@/lib/utils/whatsapp";

/**
 * Premium footer: brand block, concise description, service lines, site
 * navigation and the WhatsApp CTA. No social links — none have been
 * confirmed by the business, and inventing them is out of the question.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        {/* Brand */}
        <div className="lg:col-span-5">
          <BrandLogo size="md" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            {business.legalName} supplies plywood and accessories, constructs
            made-to-measure furniture and delivers interior design for
            residential and commercial spaces.
          </p>
          <p className="mt-5 text-sm text-muted">
            <span className="eyebrow mr-2 !tracking-[0.18em]">Call / WhatsApp</span>
            <a
              href={business.phone.tel}
              className="link-underline text-foreground transition-colors hover:text-accent"
            >
              {WHATSAPP_DISPLAY_NUMBER}
            </a>
          </p>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <p className="eyebrow">Services</p>
          <ul className="mt-5 space-y-3">
            {business.services.map((service) => (
              <li key={service.id}>
                <Link
                  href="/#services"
                  className="text-sm text-muted transition-colors duration-200 hover:text-accent"
                >
                  {service.label.replace(/^\w/, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="lg:col-span-2">
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors duration-200 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="lg:col-span-2">
          <p className="eyebrow">Enquiries</p>
          <a
            href={whatsappUrl(
              "Hello Prince M Furnishing Concept, I found your website and would like to make an enquiry.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-11 w-full max-w-[220px] items-center justify-center gap-2.5 rounded-sm border border-accent/60 text-xs font-semibold uppercase tracking-[0.18em] text-accent transition-colors duration-200 hover:bg-accent hover:text-on-accent"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat with us
          </a>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {business.legalName}. All rights reserved.
          </p>
          <p className="tracking-[0.22em] uppercase">
            Plywood · Furniture · Interiors
          </p>
        </div>
      </div>
    </footer>
  );
}
