import Image from "next/image";

import { SectionHeading } from "@/components/shared/section-heading";
import { brandLockup } from "@/data/brand";
import { brandIntro, brandIntroImage } from "@/data/homepage";

/**
 * Brand introduction — the "About" anchor. One image, offset by a hairline
 * gold frame for editorial depth.
 */
export function BrandIntro() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-block overflow-hidden"
    >
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div data-reveal="" className="order-2 lg:order-1">
          <SectionHeading
            eyebrow={brandIntro.eyebrow}
            title={brandIntro.heading}
          />
          <div className="mt-7 space-y-5 text-lead text-muted">
            {brandIntro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-subtle">
            <span aria-hidden="true" className="h-px w-10 bg-accent/70" />
            Plywood · Furniture · Interior Design
          </p>

          {/* The official name lockup (prince2) at its native export size —
              never upscaled — presented as the brand itself. */}
          <figure className="mt-10 inline-block border border-hairline bg-ink-1000 px-8 pt-8 pb-2">
            <Image
              src={brandLockup.src}
              alt={brandLockup.alt}
              width={brandLockup.width}
              height={brandLockup.height}
              sizes="280px"
              className="h-auto w-[240px] sm:w-[280px]"
            />
            <figcaption className="pt-3 text-[0.65rem] uppercase tracking-[0.24em] text-subtle">
              Official company mark
            </figcaption>
          </figure>
        </div>

        <div data-reveal="" className="frame-offset order-1 lg:order-2">
          <Image
            src={brandIntroImage.src}
            alt={brandIntroImage.alt}
            width={brandIntroImage.width}
            height={brandIntroImage.height}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
