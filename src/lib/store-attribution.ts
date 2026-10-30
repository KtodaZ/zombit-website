/** Source tags on outbound store links; canonical listing URLs stay in the content model. */
export function storeAttribution(raw: string, campaign: string, content: string): string {
  const url = new URL(raw);
  if (!["play.google.com", "apps.apple.com"].includes(url.hostname)) return raw;
  const tags = { utm_source: "zombit", utm_medium: "website", utm_campaign: campaign, utm_content: content };
  for (const [key, value] of Object.entries(tags)) url.searchParams.set(key, value);
  if (url.hostname === "play.google.com") {
    const referrer = new URLSearchParams(url.searchParams.get("referrer") ?? "");
    for (const [key, value] of Object.entries(tags)) referrer.set(key, value);
    url.searchParams.set("referrer", referrer.toString());
  }
  return url.toString();
}
