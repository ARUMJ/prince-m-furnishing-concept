import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { services, servicesShowcase } from "@/data/services";
import { servicesGeneralWhatsappHref } from "@/data/services";

/**
 * Homepage capability showcase — a three-column editorial triptych.
 *
 * The columns share hairlines (a 1px grid gap painted in the hairline tone)
 * so the three services read as one connected system rather than isolated
 * cards: Materials → Craftsmanship → Spaces. Each column deep-links to its
 * chapter on the /services page; a stretched link keeps the whole panel
 * clickable with a single tab stop.
 */
export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="section-block border-t border-hairline bg-surface/40"
    >
      <div className="container-site">
        <div data-reveal="" className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-12 bg-accent" />
            {servicesShowcase.eyebrow}
          </p>
          <h2 id="services-title" className="mt-5 text-title [text-wrap:balance]">
            {servicesShowcase.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-lead text-muted">{servicesShowcase.lead}</p>
        </div>

        <ol className="mt-12 grid gap-px border border-hairline/70 bg-hairline/70 sm:mt-14 md:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.id} className="group relative flex flex-col bg-surface">
              <div data-reveal="" data-reveal-delay={index} className="relative overflow-hidden">
                <Image
                  data-reveal-image=""
                  src={service.image.src}
                  alt={service.image.alt}
                  width={service.image.width}
                  height={service.image.height}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface via-surface/55 to-transparent"
                />
                <p className="absolute bottom-3.5 left-5 flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-subtle">
                  <span className="text-accent">{service.index}</span>
                  <span
                    aria-hidden="true"
                    className="h-px w-7 bg-accent/60 transition-all duration-500 group-hover:w-12 group-focus-within:w-12"
                  />
                </p>
              </div>

              <div data-reveal="" data-reveal-delay={index} className="flex flex-1 flex-col p-6 pt-4 sm:p-7 sm:pt-5">
                <h3 className="font-display text-[1.6rem] leading-[1.15] text-bone-50 transition-colors duration-300 group-hover:text-accent-strong">
                  <Link
                    href={`/services#${service.id}`}
                    aria-label={`Explore our ${service.title} service`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.summary}</p>

                <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-2.5 border-t border-hairline/60 pt-5">
                  {service.capabilities.map((capability) => (
                    <li
                      key={capability.label}
                      className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.14em] text-subtle"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 shrink-0 rotate-45 bg-accent/80"
                      />
                      {capability.label}
                    </li>
                  ))}
                </ul>

                <p
                  aria-hidden="true"
                  className="mt-auto inline-flex items-center gap-2 pt-7 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1"
                >
                  View Service
                  <span aria-hidden="true">→</span>
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Conversion band — sized to matter, bordered to belong. */}
        <div data-reveal="" className="mt-10 flex flex-col gap-7 border border-hairline/70 bg-surface-raised/25 px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-2xl text-bone-50">{servicesShowcase.cta.heading}</h3>
            <p className="mt-2 max-w-md text-sm text-muted">{servicesShowcase.cta.copy}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/services" variant="primary" size="lg">
              {servicesShowcase.cta.primary}
            </ButtonLink>
            <ButtonLink
              href={servicesGeneralWhatsappHref}
              variant="outline"
              size="lg"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {servicesShowcase.cta.secondary}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
