import { APPS, RATINGS_FETCHED_AT, SITE, priceLabel, privacyPath, type AppEntry } from "@/data/apps";
import { ASSISTANTS_LIVE } from "@/data/flags";
import { SITE_ROOT } from "./site";

/**
 * llms.txt (https://llmstxt.org): a plain-text map of the site for language-model tools. Built
 * from the same content model as the pages, so it cannot drift from them.
 */
const url = (path: string) => `${SITE_ROOT}${path}`;
const STORE = { ios: "App Store", android: "Google Play" } as const;
const ON = { ios: "the App Store", android: "Google Play" } as const;

function storeLine(app: AppEntry) {
  return app.stores
    .map((s) => {
      const price = priceLabel(app.listings[s.kind]);
      return `${ON[s.kind]} as "${s.title}"${price ? ` (${price === "Free" ? "free" : `${price} US`})` : ""}: ${s.url}`;
    })
    .join("; ");
}

export function llmsTxt() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `Publisher: ${SITE.legalName}. Contact: ${SITE.email}. Each app is described from its official store listing.`,
    "",
    "## Apps",
    "",
    ...APPS.map((a) => `- [${a.name}](${url(`/${a.slug}/`)}): ${a.descriptor}. ${a.line} Available on ${storeLine(a)}.`),
    "",
    "## Support and policies",
    "",
    `- [Support](${url("/support/")}): email ${SITE.email}, per-app help, and Always On Time account deletion`,
    ...APPS.map((a) => `- [${a.name} privacy policy](${url(privacyPath(a))})`),
    ...(ASSISTANTS_LIVE
      ? [`- [Connect Claude or ChatGPT to Always On Time](${url("/always-on-time/assistants/")})`]
      : []),
    "",
    "## Optional",
    "",
    `- [Full text of every app page](${url("/llms-full.txt")})`,
    `- [Sitemap](${url("/sitemap.xml")})`,
    "",
  ];
  return lines.join("\n");
}

export function llmsFullTxt() {
  const out = [`# ${SITE.name}: full app descriptions`, "", `> ${SITE.description}`, ""];
  for (const a of APPS) {
    out.push(`## ${a.name}: ${a.descriptor}`, "", `URL: ${url(`/${a.slug}/`)}`, `Stores: ${storeLine(a)}`);
    const rated = a.stores.filter((s) => a.listings[s.kind]?.score != null);
    if (rated.length) {
      out.push(
        `Ratings (read ${RATINGS_FETCHED_AT}): ` +
          rated
            .map((s) => {
              const l = a.listings[s.kind]!;
              return `${l.score} on ${STORE[s.kind]}${l.count ? ` from ${l.count} ratings` : ""}`;
            })
            .join("; "),
      );
    }
    out.push(`Privacy policy: ${url(privacyPath(a))}`, "", a.lede, "", ...a.body.flatMap((p) => [p, ""]));
    for (const g of a.groups) out.push(`### ${g.title}`, "", ...g.items.map((i) => `- ${i}`), "");
    if (a.notes?.length) out.push("### Good to know", "", ...a.notes.map((n) => `- ${n}`), "");
    out.push("### Questions", "");
    for (const f of a.faq) out.push(`**${f.q}**`, "", f.a, "");
  }
  out.push("## Support", "", `Email ${SITE.email}. Details per app: ${url("/support/")}`, "");
  return out.join("\n");
}
