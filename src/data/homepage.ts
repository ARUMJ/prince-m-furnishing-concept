import { whatsappUrl } from "@/lib/utils/whatsapp";

/**
 * Homepage content for the Phase 1 concept.
 *
 * Copy is deliberately factual: no invented years of experience, project
 * counts, testimonials, awards, certifications or locations. Imagery in the
 * projects/ folder is illustrative AI-rendered art direction, not Prince M
 * photography — every gallery entry carries that disclosure in the UI and
 * must be replaced with client-approved photographs when available.
 */

export type NavItem = {
  readonly label: string;
  /** Internal route, or an in-page anchor for sections that have no dedicated page yet. */
  readonly href: string;
};

/**
 * About / Services / Projects / Contact are anchors into homepage sections
 * until their own pages ship in later phases. Home is the only route link.
 */
export const primaryNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  eyebrow: "Premium Plywood · Furniture · Interiors",
  heading: {
    first: "Crafting Spaces.",
    second: "Defining Comfort.",
  },
  subheading:
    "Premium plywood, furniture construction and interior design solutions crafted to transform your space.",
  whatsappMessage:
    "Hello Prince M Furnishing Concept, I would like to talk about my space — plywood, furniture or interior design.",
} as const;

export const heroImage = {
  src: "/images/general/hero-main.jpg",
  alt: "Illustrative render of a contemporary luxury living room with dark walnut joinery, an ivory sofa and warm brass lighting.",
  width: 1600,
  height: 900,
} as const;

export const brandIntro = {
  eyebrow: "The Company",
  heading: "Designed for Living. Built to Last.",
  paragraphs: [
    "Prince M Furnishing Concept Ltd works across the full journey of a fitted interior — from the raw boards your surfaces are made of to the finished room you live in.",
    "We supply quality plywood and matching accessories, construct made-to-measure furniture in our own trade, and shape residential and commercial spaces through considered interior design.",
    "One team follows a project from material selection to final placement, so boards, joinery and finishes are specified to work together rather than meet for the first time on site.",
  ],
} as const;

export const brandIntroImage = {
  src: "/images/general/brand-intro.jpg",
  alt: "Illustrative still-life of stacked plywood and veneer samples with brass handles and fittings on dark linen.",
  width: 1200,
  height: 800,
} as const;

export type ServiceEntry = {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly points: readonly string[];
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
  readonly whatsappMessage: string;
};

/** Exactly the three approved service lines — no invented extras. */
export const services: readonly ServiceEntry[] = [
  {
    id: "plywood-and-accessories",
    index: "01",
    title: "Plywood & Accessories",
    description:
      "A curated stock of plywood and the accessories that finish it — boards selected for grade and figure, matched with edges, hardware and fittings that do justice to them.",
    points: [
      "Marine, first-grade and decorative plywood stock",
      "Edges, laminates and surface finishing materials",
      "Hinges, handles, slides and mounting hardware",
    ],
    image: {
      src: "/images/services/plywood-accessories.jpg",
      alt: "Illustrative render of a stack of premium plywood sheets with clean veneer edges under warm showroom lighting.",
      width: 1000,
      height: 1250,
    },
    whatsappMessage:
      "Hello Prince M Furnishing Concept, I would like to ask about plywood and accessories.",
  },
  {
    id: "furniture-construction",
    index: "02",
    title: "Furniture Construction",
    description:
      "Made-to-measure furniture built around the room it belongs to — wardrobes, sideboards, TV consoles, beds and office furniture dimensioned, joined and finished to last.",
    points: [
      "Wardrobes, bed frames and sideboards",
      "TV consoles, shelving and storage walls",
      "Office and commercial furniture builds",
    ],
    image: {
      src: "/images/services/furniture-construction.jpg",
      alt: "Illustrative render of a nearly finished walnut sideboard with brass handles on a workshop bench under warm task light.",
      width: 1400,
      height: 933,
    },
    whatsappMessage:
      "Hello Prince M Furnishing Concept, I would like to discuss custom furniture construction.",
  },
  {
    id: "interior-design",
    index: "03",
    title: "Interior Design",
    description:
      "Spaces planned with intent — layout, material palette, lighting and detailing drawn together into one coherent design, then realised with the joinery we build ourselves.",
    points: [
      "Residential and commercial interiors",
      "Space planning and material palettes",
      "Custom joinery designed as part of the scheme",
    ],
    image: {
      src: "/images/services/interior-design.jpg",
      alt: "Illustrative render of a refined reading corner with black panelling, an ivory chair and a warm brass wall light.",
      width: 1000,
      height: 1250,
    },
    whatsappMessage:
      "Hello Prince M Furnishing Concept, I would like to discuss an interior design project.",
  },
];

export const visualStatement = {
  eyebrow: "The Studio View",
  heading: "From Materials to Masterpieces.",
  copy: "Every great interior begins as a board, a fitting, a measurement. Our work is to make them worthy of the space.",
} as const;

export const visualStatementImage = {
  src: "/images/general/visual-statement.jpg",
  alt: "Illustrative render of a dark double-height hall with a curved walnut staircase and a glowing brass handrail.",
  width: 1600,
  height: 800,
} as const;

export type ProjectTile = {
  readonly id: string;
  readonly label: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
  /** Tailwind grid-area classes for the large-screen mosaic (see featured-work.tsx). */
  readonly placement: string;
};

/**
 * Category tiles only — these must not be presented as completed Prince M
 * projects. The section carries an "Illustrative imagery only" disclosure.
 */
export const featuredWork: readonly ProjectTile[] = [
  {
    id: "living-spaces",
    label: "Living Spaces",
    image: {
      src: "/images/projects/living-spaces.jpg",
      alt: "Illustrative render of a moody charcoal living room with brass-legged tables and a glowing pendant light.",
      width: 900,
      height: 1350,
    },
    placement: "lg:col-start-1 lg:col-end-6 lg:row-start-1 lg:row-end-3",
  },
  {
    id: "bedrooms",
    label: "Bedrooms",
    image: {
      src: "/images/projects/bedrooms.jpg",
      alt: "Illustrative render of a dark master bedroom with a padded headboard wall, ivory linen and warm bedside light.",
      width: 1400,
      height: 875,
    },
    placement: "lg:col-start-6 lg:col-end-13 lg:row-start-1 lg:row-end-2",
  },
  {
    id: "kitchens",
    label: "Kitchens",
    image: {
      src: "/images/projects/kitchens.jpg",
      alt: "Illustrative render of a matte black kitchen with a marble waterfall island under warm pendant lights.",
      width: 1120,
      height: 840,
    },
    placement: "lg:col-start-6 lg:col-end-9 lg:row-start-2 lg:row-end-3",
  },
  {
    id: "offices",
    label: "Offices",
    image: {
      src: "/images/projects/offices.jpg",
      alt: "Illustrative render of an executive office with smoked-oak panelling, a black desk and a brass lamp.",
      width: 1000,
      height: 1250,
    },
    placement: "lg:col-start-9 lg:col-end-13 lg:row-start-2 lg:row-end-4",
  },
  {
    id: "custom-furniture",
    label: "Custom Furniture",
    image: {
      src: "/images/projects/custom-furniture.jpg",
      alt: "Illustrative render of a fluted walnut cabinet with brass inlay, lit against a black backdrop.",
      width: 1600,
      height: 800,
    },
    placement: "lg:col-start-1 lg:col-end-9 lg:row-start-3 lg:row-end-4",
  },
];

export const featuredWorkWhatsappMessage =
  "Hello Prince M Furnishing Concept, I have a space in mind and would like to discuss what is possible.";

export type ValueEntry = {
  readonly index: string;
  readonly title: string;
  readonly text: string;
};

/** Capability statements only — no statistics, awards or guarantees. */
export const whyChooseUs: readonly ValueEntry[] = [
  {
    index: "01",
    title: "Quality Materials",
    text: "We work with selected plywood grades and reputable accessories, chosen so surfaces stay handsome and hardware keeps working years after installation.",
  },
  {
    index: "02",
    title: "Custom Craftsmanship",
    text: "Every piece is made for its space — dimensions, layout and detailing are decided with you and built to fit, rather than fitted around what happens to be in stock.",
  },
  {
    index: "03",
    title: "Professional Finishing",
    text: "Edges banded, joints closed, surfaces laid level and hardware aligned — the difference between built and finished lives in these steps, and we obsess over them.",
  },
  {
    index: "04",
    title: "Attention to Detail",
    text: "From the first measurement to the final placement, each stage is checked against the drawings, so materials, joinery and design arrive as one coherent result.",
  },
];

export const finalCta = {
  eyebrow: "Start the Conversation",
  heading: "Ready to Transform Your Space?",
  copy:
    "Tell us what you have in mind — plywood for a build, furniture made to measure, or a room worth redesigning. We will talk through materials, possibilities and next steps on WhatsApp.",
  whatsappMessage:
    "Hello Prince M Furnishing Concept, I am ready to transform my space. Here is what I have in mind: ",
} as const;

/** Pre-built deep link reused by header, hero, services, gallery and CTA. */
export const heroWhatsappHref = whatsappUrl(hero.whatsappMessage);
export const featuredWhatsappHref = whatsappUrl(featuredWorkWhatsappMessage);
export const finalWhatsappHref = whatsappUrl(finalCta.whatsappMessage);
