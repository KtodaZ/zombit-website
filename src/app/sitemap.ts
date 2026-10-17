import type { MetadataRoute } from "next";
import { APPS, privacyPath } from "@/data/apps";
import { ASSISTANTS_LIVE, LASTMOD } from "@/data/flags";
import { SITE_ROOT, abs } from "@/lib/site";
import { indexedPosts, postPath } from "@/lib/blog";

export const dynamic = "force-static";

/**
 * Every indexable page. lastmod comes from LASTMOD in src/data/flags.ts, not the build clock:
 * search engines stop trusting a lastmod that changes on every deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const at = (d: string) => new Date(`${d}T00:00:00Z`);
  // Posts carry their own `updated` date; the index changes when the newest post does.
  const posts = indexedPosts();
  const blogLastmod = posts.reduce((d, p) => (p.updated > d ? p.updated : d), "");
  return [
    { url: `${SITE_ROOT}/`, lastModified: at(LASTMOD.home), changeFrequency: "monthly", priority: 1 },
    ...APPS.map((a) => ({
      url: `${SITE_ROOT}/${a.slug}/`,
      lastModified: at(LASTMOD.apps),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [abs(a.icon), ...a.shots.map((s) => abs(s))],
    })),
    ...(ASSISTANTS_LIVE
      ? [
          {
            url: `${SITE_ROOT}/always-on-time/assistants/`,
            lastModified: at(LASTMOD.assistants),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
        ]
      : []),
    ...(posts.length
      ? [
          { url: `${SITE_ROOT}/blog/`, lastModified: at(blogLastmod), changeFrequency: "weekly" as const, priority: 0.7 },
          ...posts.map((p) => ({
            url: `${SITE_ROOT}${postPath(p)}`,
            lastModified: at(p.updated),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          })),
        ]
      : []),
    { url: `${SITE_ROOT}/support/`, lastModified: at(LASTMOD.support), changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_ROOT}/terms/`, lastModified: at(LASTMOD.privacy), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_ROOT}/privacy/`, lastModified: at(LASTMOD.privacy), changeFrequency: "yearly", priority: 0.3 },
    ...APPS.map((a) => ({
      url: `${SITE_ROOT}${privacyPath(a)}`,
      lastModified: at(LASTMOD.privacy),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
