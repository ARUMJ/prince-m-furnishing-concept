import { services, servicesPage } from "@/data/services";

/**
 * /services page hero — compact editorial band with a working index of the
 * three chapters. Text + index fill the width so the hero never reads as a
 * headline floating in an empty black void.
 */
export function ServicesHero() {
  return (
    <section
      aria-labelledby="services-page-title"
      className="border-b border-hairline bg-surface/30"
    >
      <div className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div data-reveal="" className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-12 bg-accent" />
            {servicesPage.eyebrow}
          </p>
          <h1 id="services-page-title" className="mt-5 text-display [text-wrap:balance]">
            {servicesPage.heading}
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">{servicesPage.intro}</p>
          <p className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] uppercase tracking-[0.3em] text-subtle">
            {servicesPage.progression.map((stage, index) => (
              <span key={stage} className="flex items-center gap-5">
                {index > 0 ? (
                  <span aria-hidden="true" className="h-px w-6 bg-accent/50" />
                ) : null}
                <span className={index === 2 ? "text-accent" : undefined}>{stage}</span>
              </span>
            ))}
          </p>
        </div>

        <nav aria-label="Services index" data-reveal="1" className="lg:col-span-5 lg:self-end">
          <ol className="border-t border-hairline">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href={`#${service.id}`}
                  className="group flex items-center justify-between gap-4 border-b border-hairline/70 py-4 transition-colors duration-300 hover:border-accent/40"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-[0.68rem] font-semibold tracking-[0.3em] text-accent">
                      {service.index}
                    </span>
                    <span className="font-display text-xl text-foreground transition-colors duration-300 group-hover:text-accent-strong">
                      {service.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-subtle transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-accent"
                  >
                    ↓
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
