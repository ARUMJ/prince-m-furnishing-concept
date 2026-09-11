import type { Metadata } from "next";

import { ServiceChapter } from "@/components/services/service-chapter";
import { ServicesHero } from "@/components/services/services-hero";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { services, servicesClosingWhatsappHref, servicesPage } from "@/data/services";
import { buildMetadata } from "@/lib/seo/metadata";

/**
 * /services — the full editorial experience for the three capabilities.
 * Alternating text/image chapters on a shared 12-column grid (T|I, I|T,
 * T|I), each with a positioning statement, core description, a 2×2
 * capability grid and a service-specific WhatsApp enquiry link.
 */

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Plywood and accessories supply, custom furniture construction and interior design — explore how Prince M Furnishing Concept Ltd carries a project from materials to complete spaces.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />

      <div className="container-site border-t border-hairline">
        {services.map((service, index) => (
          <ServiceChapter
            key={service.id}
            service={service}
            flip={index % 2 === 1}
            last={index === services.length - 1}
          />
        ))}
      </div>

      <section
        aria-labelledby="services-closing-title"
        className="border-t border-hairline bg-surface/40"
      >
        <div className="container-site flex flex-col items-start gap-8 py-16 sm:py-20 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="services-closing-title" className="font-display text-[clamp(1.7rem,1.3rem+1.8vw,2.6rem)] leading-tight text-bone-50">
              {servicesPage.closing.heading}
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted">{servicesPage.closing.copy}</p>
          </div>
          <ButtonLink href={servicesClosingWhatsappHref} variant="primary" size="lg">
            <WhatsAppIcon className="h-5 w-5" />
            Enquire on WhatsApp
          </ButtonLink>
        </div>
        <div className="container-site pb-10">
          <p className="text-[0.68rem] leading-relaxed tracking-wide text-subtle">
            {servicesPage.disclosure}
          </p>
        </div>
      </section>
    </>
  );
}
