import { business } from "@/data/business";

/**
 * Phase 0 placeholder. The production homepage — hero, services, projects,
 * contact — is delivered in Phase 1.
 */
export default function HomePage() {
  return (
    <section className="container-site flex flex-col items-center gap-6 py-24 text-center sm:py-32">
      <p className="eyebrow">Phase 0 — technical foundation</p>
      <h1>{business.legalName}</h1>
      <p className="max-w-xl text-lead text-muted">
        The production homepage arrives in Phase 1. This placeholder confirms
        that the design tokens, typography, SEO and accessibility foundations
        are in place and building cleanly.
      </p>
    </section>
  );
}
