import Image from "next/image";

import { SectionHeading } from "@/components/shared/section-heading";
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
        <div className="reveal order-2 lg:order-1">
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
        </div>

        <div className="frame-offset reveal order-1 lg:order-2">
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
