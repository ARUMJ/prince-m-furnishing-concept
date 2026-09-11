import Image from "next/image";

import { WhatsAppIcon } from "@/components/ui/icons";
import { business } from "@/data/business";
import { finalCta, finalWhatsappHref } from "@/data/homepage";
import { WHATSAPP_DISPLAY_NUMBER } from "@/lib/utils/whatsapp";

/**
 * Final conversion section — the "Contact" anchor. WhatsApp is the primary
 * channel; the phone number doubles as a tel: link. Copy invites a
 * conversation without promising anything unverified.
 */
export function FinalCta() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden border-t border-hairline"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/general/cta-bg.jpg"
          alt=""
          width={1600}
          height={900}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink-950/82"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/60 to-ink-950"
        />
      </div>

      <div className="container-site py-24 text-center sm:py-32 lg:py-40">
        <p className="eyebrow flex items-center justify-center gap-3">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-accent/70" />
          {finalCta.eyebrow}
          <span aria-hidden="true" className="inline-block h-px w-8 bg-accent/70" />
        </p>
        <h2
          id="cta-title"
          className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.1rem,1.4rem+3.2vw,4.25rem)] leading-[1.06] text-bone-50"
        >
          {finalCta.heading}
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-lead text-bone-200">
          {finalCta.copy}
        </p>

        <div className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <a
            href={finalWhatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 w-full items-center justify-center gap-3 rounded-sm bg-accent px-9 text-sm font-semibold uppercase tracking-[0.16em] text-on-accent transition-colors duration-200 hover:bg-accent-strong sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat on WhatsApp
          </a>
          <a
            href={business.phone.tel}
            className="link-underline text-sm tracking-[0.12em] text-bone-200 transition-colors hover:text-accent"
          >
            or call {WHATSAPP_DISPLAY_NUMBER}
          </a>
        </div>
      </div>
    </section>
  );
}
