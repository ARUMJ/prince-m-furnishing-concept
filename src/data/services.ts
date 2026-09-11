import { whatsappUrl } from "@/lib/utils/whatsapp";

/**
 * Canonical data for the three Prince M services — shared by the homepage
 * capability showcase and the /services page so the story never diverges
 * between the two.
 *
 * Factual policy: descriptions rely only on the established business scope
 * (plywood & accessories supply, custom furniture construction, interior
 * design). No grades, brands, certifications, guarantees, project counts or
 * workshop capabilities beyond what the business has confirmed. Imagery is
 * illustrative art direction, not client photography.
 */

export type ServiceCapability = {
  readonly label: string;
  readonly detail: string;
};

export type ServiceDetail = {
  /** Stable id — used for anchors between the homepage showcase and /services. */
  readonly id: string;
  readonly index: "01" | "02" | "03";
  readonly title: string;
  /** One-line positioning statement (services page). */
  readonly positioning: string;
  /** Concise description for the homepage gallery column. */
  readonly summary: string;
  /** 2–3 sentence core description (services page). */
  readonly description: string;
  readonly capabilities: readonly ServiceCapability[];
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
  readonly whatsappMessage: string;
};

export const services: readonly ServiceDetail[] = [
  {
    id: "plywood-and-accessories",
    index: "01",
    title: "Plywood & Accessories",
    positioning: "The material layer beneath every Prince M project.",
    summary:
      "Plywood and the accessories that complete it — boards chosen with the intended finish in mind, matched to the edges, laminates and hardware the build calls for.",
    description:
      "We supply plywood and related furniture accessories for construction and furnishing projects. Panels are selected for the surface and stability the job needs, and matched to the edge banding, laminates, hinges, handles and fittings that make joinery look finished rather than merely installed.",
    capabilities: [
      { label: "Plywood Panels", detail: "Boards for furniture, joinery and fit-out work" },
      { label: "Edges & Laminates", detail: "Surfacing materials that complete panel work" },
      { label: "Furniture Hardware", detail: "Hinges, handles, slides and mounting fittings" },
      { label: "Project Matching", detail: "Selection guided by the dimensions and finish required" },
    ],
    image: {
      src: "/images/services/plywood-accessories.jpg",
      alt: "Illustrative render of a neat stack of plywood and veneer boards with brass corner guards and a row of furniture hardware under warm light.",
      width: 1000,
      height: 1250,
    },
    whatsappMessage:
      "Hello Prince M Furnishing Concept, I am interested in your Plywood & Accessories service.",
  },
  {
    id: "furniture-construction",
    index: "02",
    title: "Furniture Construction",
    positioning: "Built for the room, not for a catalogue.",
    summary:
      "Custom furniture constructed to the dimensions, layout and storage needs of each project — wardrobes, beds, sideboards, consoles and office pieces.",
    description:
      "Furniture is built around each space: dimensions decided against the room, internal layouts planned for how they will be used, and surfaces and edge details chosen to sit inside the wider interior. Each piece is made for its project, so the build follows the space rather than the space following the build.",
    capabilities: [
      { label: "Made to Measure", detail: "Dimensioned to the exact space, down to clearances" },
      { label: "Freestanding & Fitted", detail: "Standalone pieces and built-in storage or media walls" },
      { label: "Storage Planning", detail: "Internal layouts arranged around daily use" },
      { label: "Finish Coordination", detail: "Surfaces and edges tied to the interior palette" },
    ],
    image: {
      src: "/images/services/furniture-construction.jpg",
      alt: "Illustrative render of an artisan fitting a brushed-brass handle to a half-built walnut sideboard in a dim workshop.",
      width: 1000,
      height: 1250,
    },
    whatsappMessage:
      "Hello Prince M Furnishing Concept, I am interested in your Furniture Construction service.",
  },
  {
    id: "interior-design",
    index: "03",
    title: "Interior Design",
    positioning: "One hand on the whole composition.",
    summary:
      "Interior planning, coordination and styling that bring materials, joinery and finishes into one coherent design for living and working rooms.",
    description:
      "Rooms are designed from the plan outward: layout and function first, then the material palette, the joinery that shapes the walls, and the styling that finishes the space. Because the boards, the build and the design sit with one team, the intent of the drawings carries through into the delivered room.",
    capabilities: [
      { label: "Space Planning", detail: "Layout, circulation and function set before finishes" },
      { label: "Material Direction", detail: "Palettes of boards, surfaces and metals" },
      { label: "Joinery Design", detail: "Custom pieces drawn into the scheme and built to match" },
      { label: "Styling & Finishing", detail: "Final touches and detail alignment as rooms are completed" },
    ],
    image: {
      src: "/images/services/interior-design.jpg",
      alt: "Illustrative render of a finished dark interior corner with fluted walnut panelling, an ivory chair and a slender brass floor lamp.",
      width: 1000,
      height: 1250,
    },
    whatsappMessage:
      "Hello Prince M Furnishing Concept, I am interested in your Interior Design service.",
  },
];

/** Homepage section copy for the capability showcase. */
export const servicesShowcase = {
  eyebrow: "02 / Our Capabilities",
  heading: "Architectural Materials. Custom Furniture. Curated Spaces.",
  lead: "Every Prince M project moves through the same three stages — the boards that begin it, the furniture that shapes it, the design that completes it. One capability, from material to space.",
  cta: {
    heading: "See each stage in full.",
    copy: "The Services page walks through materials, construction and design — one capability at a time.",
    primary: "Explore Our Services",
    secondary: "Chat on WhatsApp",
  },
} as const;

/** /services page hero + closing band copy. */
export const servicesPage = {
  eyebrow: "Our Capabilities",
  heading: "Craftsmanship & Spatial Execution.",
  intro:
    "Three connected services carry a project from raw board to finished room: quality plywood and accessories, custom furniture construction, and interior design that composes them into complete spaces.",
  progression: ["Materials", "Craftsmanship", "Spaces"] as const,
  closing: {
    heading: "Start with one board, or the whole room.",
    copy: "Whichever stage you are at, the conversation begins the same way.",
  },
  disclosure:
    "Imagery across this page is concept art direction for the brand, not photography of completed Prince M projects.",
} as const;

/** Deep links used by the /services page CTA row. */
export const servicesGeneralWhatsappHref = whatsappUrl(
  "Hello Prince M Furnishing Concept, I would like to discuss a project — materials, furniture or interiors.",
);
export const servicesClosingWhatsappHref = whatsappUrl(
  "Hello Prince M Furnishing Concept, I am ready to discuss my project.",
);
