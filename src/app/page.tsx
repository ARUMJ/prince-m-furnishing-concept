import { BrandIntro } from "@/components/sections/brand-intro";
import { FeaturedWork } from "@/components/sections/featured-work";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { VisualStatement } from "@/components/sections/visual-statement";
import { WhyChoosePrinceM } from "@/components/sections/why-choose";

/**
 * Phase 1 homepage — a single premium landing narrative. Sections anchor to
 * the header navigation (#about, #services, #projects, #contact) until
 * their dedicated pages arrive in later phases.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <Services />
      <VisualStatement />
      <FeaturedWork />
      <WhyChoosePrinceM />
      <FinalCta />
    </>
  );
}
