import { SectionHeading } from "@/components/shared/section-heading";
import { whyChooseUs } from "@/data/homepage";

/**
 * "Why Choose Prince M" — a numbered editorial ledger. Deliberately not a
 * card grid: hairline-separated rows with outline numerals and a gold
 * leading rule that draws in on hover.
 */
export function WhyChoosePrinceM() {
  return (
    <section
      aria-labelledby="why-title"
      className="section-block border-t border-hairline bg-surface/40"
    >
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="The Difference"
              title="Why Choose Prince M."
              description="Four commitments that shape how every board is chosen, every joint is made and every room is finished."
            />
          </div>
        </div>

        <ol className="lg:col-span-7 lg:col-start-6">
          {whyChooseUs.map((value) => (
            <li
              key={value.index}
              className="value-row grid grid-cols-[auto,1fr] gap-6 border-b border-hairline py-9 transition-colors duration-500 hover:bg-surface-raised/25 first:border-t sm:gap-10 sm:py-10"
            >
              <p aria-hidden="true" className="numeral-outline text-5xl leading-none sm:text-6xl">
                {value.index}
              </p>
              <div>
                <h3 className="font-display text-2xl text-bone-50 sm:text-[1.65rem]">
                  {value.title}
                </h3>
                <p className="mt-3 max-w-xl text-muted">{value.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
