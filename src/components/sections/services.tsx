import Image from "next/image";

import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { services } from "@/data/homepage";
import { whatsappUrl } from "@/lib/utils/whatsapp";

/**
 * Services as an editorial ledger — alternating full-width rows rather than
 * a card grid. Each row: oversized index numeral, display title, factual
 * description, capability points, and a WhatsApp enquiry link seeded with a
 * service-specific message.
 */
export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="section-block border-t border-hairline bg-surface/40"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="Services"
          title="Plywood, Furniture & Interiors."
          description="Three disciplines that share one workshop standard — the boards, the build and the design around them."
        />

        <ul className="mt-14 border-t border-hairline sm:mt-20">
          {services.map((service, index) => (
            <li key={service.id}>
              <div
                className={`service-row group grid items-center gap-8 border-b border-hairline py-12 transition-colors duration-500 hover:bg-surface-raised/25 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:py-16 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="overflow-hidden bg-surface-raised lg:col-span-7 lg:col-start-6 lg:h-[26rem]">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={service.image.width}
                    height={service.image.height}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:aspect-[16/10] lg:aspect-auto lg:h-full"
                  />
                </div>

                {/* Text */}
                <div className="lg:col-span-5 lg:col-start-1">
                  <p aria-hidden="true" className="numeral-outline text-6xl leading-none">
                    {service.index}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(1.75rem,1.3rem+1.8vw,2.6rem)] leading-[1.1]">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-md text-muted">{service.description}</p>

                  <ul className="mt-6 space-y-2.5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm text-bone-200"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-5 shrink-0 bg-accent/70 transition-all duration-300 group-hover:w-8"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappUrl(service.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent transition-colors duration-200 hover:text-accent-strong"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
