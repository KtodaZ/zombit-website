import { indexedPosts, postPath } from "@/lib/blog";
import { SITE } from "@/data/apps";
import { BASE_URL, SITE_ROOT } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

/** Feed readers need absolute links; post HTML carries root-relative ones (already base-pathed). */
const absolute = (html: string) =>
  html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE_URL}/`).replace(/]]>/g, "]]]]><![CDATA[>");

/** RSS 2.0 feed of published posts, newest first. The full body goes in content:encoded. */
export function GET() {
  const posts = indexedPosts();
  const items = posts.map((p) => {
    const link = `${SITE_ROOT}${postPath(p)}`;
    return [
      "    <item>",
      `      <title>${esc(p.title)}</title>`,
      `      <link>${link}</link>`,
      `      <guid isPermaLink="true">${link}</guid>`,
      `      <pubDate>${rfc822(p.date)}</pubDate>`,
      `      <description>${esc(p.description)}</description>`,
      `      <content:encoded><![CDATA[${absolute(p.html)}]]></content:encoded>`,
      "    </item>",
    ].join("\n");
  });
  const latest = posts.reduce((d, p) => (p.updated > d ? p.updated : d), "");
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    "  <channel>",
    `    <title>${esc(`${SITE.name} blog`)}</title>`,
    `    <link>${SITE_ROOT}/blog/</link>`,
    `    <atom:link href="${SITE_ROOT}/blog/rss.xml" rel="self" type="application/rss+xml"/>`,
    `    <description>${esc(`Guides and plain comparisons from ${SITE.legalName}.`)}</description>`,
    "    <language>en-us</language>",
    ...(latest ? [`    <lastBuildDate>${rfc822(latest)}</lastBuildDate>`] : []),
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
