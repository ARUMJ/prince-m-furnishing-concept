import Image from "next/image";

import { visualStatement, visualStatementImage } from "@/data/homepage";

/**
 * The large immersive visual statement — a full-bleed editorial spread.
 * The heading is the page's third H2-level statement and intentionally
 * carries no lead copy beyond a single line.
 */
export function VisualStatement() {
  return (
    <section
      aria-labelledby="statement-title"
      className="relative isolate flex min-h-[70svh] items-center overflow-hidden border-y border-hairline lg:min-h-[85svh]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={visualStatementImage.src}
          alt={visualStatementImage.alt}
          width={visualStatementImage.width}
          height={visualStatementImage.height}
          fill
          sizes="100vw"
          className="kenburns object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink-950/68"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/45"
        />
      </div>

      <div className="container-site py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow flex items-center justify-center gap-3">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-accent/70" />
            {visualStatement.eyebrow}
            <span aria-hidden="true" className="inline-block h-px w-8 bg-accent/70" />
          </p>
          <h2
            id="statement-title"
            className="mt-6 font-display text-[clamp(2.25rem,1.4rem+4.2vw,4.75rem)] leading-[1.04] text-bone-50"
          >
            {visualStatement.heading}
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lead text-bone-200">
            {visualStatement.copy}
          </p>
        </div>
      </div>
    </section>
  );
}
