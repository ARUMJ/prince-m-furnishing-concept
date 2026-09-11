import { business, verifiedBusinessDetails } from "@/data/business";
import { siteConfig, siteUrl } from "@/lib/seo/config";

/**
 * JSON-LD for the business, injected once by the root layout.
 *
 * `LocalBusiness` is used rather than a narrower subtype because the business
 * has not yet confirmed a physical address. Only supplied facts are emitted:
 * address, geo, openingHoursSpecification, priceRange, aggregateRating and
 * sameAs are left out until they are verified — Google treats fabricated
 * LocalBusiness details as spam.
 *
 * To add a verified detail, extend `verifiedBusinessDetails` in
 * `src/data/business.ts` and handle it in `verifiedDetailsSchema()`.
 */
export function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: business.legalName,
    alternateName: business.name,
    description: siteConfig.description,
    url: siteUrl,
    telephone: business.phone.international,
    // The official client-supplied seal, served from public/images/brand/.
    logo: `${siteUrl}/images/brand/logo-medallion.jpg`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: business.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.label,
        },
      })),
    },
    ...verifiedDetailsSchema(),
  };
}

/** Emits only the business details that have actually been confirmed. */
function verifiedDetailsSchema(): Record<string, unknown> {
  const schema: Record<string, unknown> = {};
  const {
    email,
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
    latitude,
    longitude,
    socialProfiles,
  } = verifiedBusinessDetails;

  if (email) schema.email = email;

  if (streetAddress) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry,
    };
  }

  if (typeof latitude === "number" && typeof longitude === "number") {
    schema.geo = { "@type": "GeoCoordinates", latitude, longitude };
  }

  if (socialProfiles && socialProfiles.length > 0) {
    schema.sameAs = [...socialProfiles];
  }

  return schema;
}
