import Image from "next/image";
import Link from "next/link";

import { ArrowDownIcon, WhatsAppIcon } from "@/components/ui/icons";
import { hero, heroImage, heroWhatsappHref } from "@/data/homepage";
import { services } from "@/data/services";

/**
 * Cinematic hero. The only preloaded (LCP) image on the page; its
 * one-shot settle respects reduced motion and leaves native scrolling intact.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-end overflow-hidden lg:items-center"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          fill
          sizes="100vw"
          preload
          data-reveal="image"
          className="object-cover"
        />
        {/* Legability layers: left-weighted scrim + bottom + top fades. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/72 to-ink-950/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60"
        />
      </div>

      <div className="container-site relative z-10 w-full pb-16 pt-24 sm:pb-24 sm:pt-28 lg:py-32">
        <div data-reveal="" className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-12 bg-accent" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-hero [text-wrap:balance]"
          >
            {hero.heading.first}
            <br />
            Defining <span className="text-accent-strong">Comfort.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lead text-bone-200">
            {hero.subheading}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={heroWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center gap-3 rounded-sm bg-accent px-8 text-sm font-semibold uppercase tracking-[0.16em] text-on-accent transition-colors duration-200 hover:bg-accent-strong"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
            <Link
              href="/services"
              className="inline-flex h-13 items-center gap-3 rounded-sm border border-bone-300/35 px-8 text-sm font-medium uppercase tracking-[0.16em] text-bone-100 transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Explore Our Services
              <ArrowDownIcon className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-14 hidden flex-wrap items-center gap-x-8 gap-y-3 text-[0.68rem] uppercase tracking-[0.3em] text-subtle md:flex">
            {services.map((service, index) => (
              <li key={service.id} className="flex items-center gap-8">
                {index > 0 ? (
                  <span aria-hidden="true" className="h-4 w-px bg-hairline" />
                ) : null}
                {service.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
