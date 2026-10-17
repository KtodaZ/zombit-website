import type { Metadata } from "next";
import { SITE } from "@/data/apps";
import { IS_PREVIEW, abs } from "./site";

/**
 * Per-page metadata: canonical, Open Graph, and Twitter in one place, so no page ships a
 * canonical without matching social tags. `og` is a root-relative path under public/.
 */
export function pageMeta({
  title,
  description,
  path,
  og = "/og/home.png",
  ogAlt,
  noindex = false,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  og?: string;
  ogAlt?: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const image = { url: abs(og), width: 1200, height: 630, alt: ogAlt ?? title };
  const fullTitle = absoluteTitle ? title : `${title} — ${SITE.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_US",
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
    ...(noindex || IS_PREVIEW ? { robots: { index: false, follow: !IS_PREVIEW } } : {}),
  };
}
