/**
 * Renders a JSON-LD object as an inline script tag.
 * Server component — adds no client JavaScript.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is data, not markup, so React must not escape it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
