import Image from "next/image";

import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { featuredWhatsappHref, featuredWork } from "@/data/homepage";

/**
 * Featured work preview — an asymmetric mosaic of room categories.
 *
 * Integrity requirement from the brief: none of these visuals may be
 * presented as completed Prince M projects. The section is titled
 * "Spaces & Possibilities", the tiles show categories rather than project
 * names, and a visible disclosure states the imagery is illustrative.
 */
export function FeaturedWork() {
  return (
    <section
      id="projects"
      aria-labelledby="work-title"
      className="section-block"
    >
      <div className="container-site">
        <div data-reveal="" className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured Work"
            title="Spaces & Possibilities."
            description="A view of the rooms we bring to life — living spaces, bedrooms, kitchens, offices and the custom furniture that ties them together."
          />
          <p className="shrink-0 border border-hairline px-3.5 py-2 text-[0.65rem] uppercase tracking-[0.22em] text-subtle">
            Illustrative imagery only
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:auto-rows-[15.5rem] lg:gap-6">
          {featuredWork.map((tile, index) => (
            <li
              key={tile.id}
              data-reveal=""
              data-reveal-delay={index % 3}
              className={`group relative h-72 overflow-hidden bg-surface-raised sm:h-64 lg:h-full ${tile.placement}`}
            >
              <Image
                data-reveal-image=""
                src={tile.image.src}
                alt={tile.image.alt}
                width={tile.image.width}
                height={tile.image.height}
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.05]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/12 to-transparent transition-opacity duration-500 group-hover:from-ink-950/92"
              />
              <figure className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                <figcaption>
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl text-bone-50 sm:text-2xl">
                    {tile.label}
                  </h3>
                </figcaption>
                <span
                  aria-hidden="true"
                  className="mb-1 block h-px w-6 origin-right scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                />
              </figure>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs leading-relaxed text-subtle">
          Renders shown here are concept art direction for this prototype, not
          photographs of Prince M Furnishing Concept projects. Client
          photography will replace them before launch.
        </p>

        <div data-reveal="" className="mt-10 flex justify-center lg:mt-12">
          <a
            href={featuredWhatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-3 rounded-sm border border-accent/60 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-accent transition-colors duration-200 hover:bg-accent hover:text-on-accent"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Discuss a space like this
          </a>
        </div>
      </div>
    </section>
  );
}
