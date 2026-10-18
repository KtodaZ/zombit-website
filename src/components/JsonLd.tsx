/**
 * JSON-LD inside a <script> tag. `<` is written as its JSON escape so no string in the data
 * (a title, an FAQ answer) can close the tag early; JSON-LD parsers read it back unchanged.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
