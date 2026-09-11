import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import type { ServiceDetail } from "@/data/services";
import { whatsappUrl } from "@/lib/utils/whatsapp";

/**
 * One service chapter on /services.
 *
 * Shared structural system: on desktop the text column occupies six grid
 * columns and the image the remaining five, spanning both header and body
 * rows so the image is anchored to the grid rather than floating beside it.
 * `flip` mirrors the side for the alternating rhythm (T|I, I|T, T|I). On
 * mobile and tablet the flow is number → title → image → description →
 * capabilities → CTA, which is the same DOM order — no reordering tricks.
 */
export function ServiceChapter({
  service,
  flip,
  last,
}: {
  service: ServiceDetail;
  flip: boolean;
  last: boolean;
}) {
  const textStart = flip ? "lg:col-start-7" : "lg:col-start-1";
  const imageStart = flip ? "lg:col-start-1" : "lg:col-start-8";

  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className={`grid gap-8 py-14 sm:py-16 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:py-20 ${
        last ? "" : "border-b"
      } border-hairline`}
    >
      <header className={`lg:col-span-6 lg:row-start-1 ${textStart}`}>
        <p
          className={`flex items-center gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-subtle ${
            flip ? "lg:flex-row-reverse" : ""
          }`}
        >
          <span>
            <span className="text-accent">{service.index}</span>
            <span aria-hidden="true" className="mx-2 text-subtle/70">/</span>
            {service.title}
          </span>
          <span
            aria-hidden="true"
            className={`h-px flex-1 bg-gradient-to-r from-accent/45 to-hairline ${
              flip ? "lg:bg-gradient-to-l" : ""
            }`}
          />
        </p>
        <h2
          id={`${service.id}-title`}
          className="mt-5 font-display text-[clamp(1.9rem,1.45rem+2vw,2.9rem)] leading-[1.08] text-bone-50"
        >
          {service.title}
        </h2>
        <p className="mt-4 max-w-lg text-lead text-accent-strong/90">{service.positioning}</p>
      </header>

      <figure
        className={`relative h-80 overflow-hidden bg-surface-raised sm:h-96 lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:h-auto lg:min-h-[26rem] ${imageStart}`}
      >
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent px-4 pb-2.5 pt-8 text-[0.6rem] uppercase tracking-[0.22em] text-subtle">
          Illustrative imagery
        </figcaption>
      </figure>

      <div className={`lg:col-span-6 lg:row-start-2 lg:mt-6 ${textStart}`}>
        <p className="max-w-xl leading-relaxed text-muted">{service.description}</p>

        <div className="mt-9 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {service.capabilities.map((capability, index) => (
            <div
              key={capability.label}
              className={`border-t border-hairline/60 pt-4 ${
                index % 2 === 1 ? "sm:border-l sm:border-hairline/60 sm:pl-10" : ""
              }`}
            >
              <p className="flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-bone-100">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent/80" />
                {capability.label}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{capability.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-4">
          <ButtonLink href={whatsappUrl(service.whatsappMessage)} variant="primary" size="md">
            <WhatsAppIcon className="h-4 w-4" />
            Enquire via WhatsApp
          </ButtonLink>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent transition-colors duration-200 hover:text-accent-strong"
          >
            View Our Projects
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
