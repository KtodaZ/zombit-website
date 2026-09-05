import type { MetadataRoute } from "next";
import { BASE_URL, IS_PREVIEW, SITE_ROOT } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // The Pages project preview carries the same copy as the real site. Letting it
  // be indexed would put zombit.io in a duplicate-content fight with itself.
  if (IS_PREVIEW) return { rules: [{ userAgent: "*", disallow: "/" }] };

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_ROOT}/sitemap.xml`,
    host: BASE_URL,
  };
}
