import type { MetadataRoute } from "next";
import { BASE_URL, IS_PREVIEW, SITE_ROOT } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Search and answer-engine crawlers, named so the intent is explicit rather than implied by the
 * wildcard. Training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended) are allowed
 * too: the site is public marketing and support copy for the studio's own apps.
 */
const CRAWLERS = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  // The Pages project preview carries the same copy as the real site. Letting it
  // be indexed would put zombit.io in a duplicate-content fight with itself.
  if (IS_PREVIEW) return { rules: [{ userAgent: "*", disallow: "/" }] };

  return {
    rules: [
      { userAgent: CRAWLERS, allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_ROOT}/sitemap.xml`,
    host: BASE_URL,
  };
}
