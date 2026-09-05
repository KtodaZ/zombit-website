import type { MetadataRoute } from "next";
import { APPS } from "@/data/apps";
import { SITE_ROOT } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_ROOT}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...APPS.map((a) => ({
      url: `${SITE_ROOT}/${a.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
