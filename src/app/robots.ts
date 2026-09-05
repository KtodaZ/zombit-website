import type { MetadataRoute } from "next";
import { BASE_URL, SITE_ROOT } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_ROOT}/sitemap.xml`,
    host: BASE_URL,
  };
}
