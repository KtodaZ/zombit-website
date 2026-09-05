import { APPS, SITE, type AppEntry } from "@/data/apps";
import { SITE_ROOT, abs } from "./site";

export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_ROOT}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE_ROOT,
  description: SITE.description,
  logo: `${SITE_ROOT}/icons/zombit-mark.webp`,
};

export const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_ROOT}/#website`,
  url: SITE_ROOT,
  name: SITE.name,
  publisher: { "@id": `${SITE_ROOT}/#organization` },
};

const OS: Record<"ios" | "android", string> = { ios: "iOS", android: "Android" };

/**
 * One SoftwareApplication per app. aggregateRating is emitted only when a real
 * rating with a real review count was fetched — schema.org requires the count,
 * and inventing one to satisfy the validator would be a lie in machine-readable form.
 */
export function softwareApplication(app: AppEntry) {
  const rated = app.ratings.ios ?? app.ratings.android;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_ROOT}/${app.slug}/#app`,
    name: app.name,
    url: `${SITE_ROOT}/${app.slug}/`,
    description: app.lede,
    applicationCategory: `${app.category}Application`,
    operatingSystem: app.stores.map((s) => OS[s.kind]).join(", "),
    image: abs(app.icon),
    screenshot: app.shots.map((s) => abs(s)),
    downloadUrl: app.stores.map((s) => s.url),
    publisher: { "@id": `${SITE_ROOT}/#organization` },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    ...(rated && rated.count
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rated.score,
            ratingCount: rated.count,
            bestRating: 5,
          },
        }
      : {}),
  };
}

export const catalogue = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Apps by ${SITE.name}`,
  itemListElement: APPS.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_ROOT}/${a.slug}/`,
    name: a.name,
  })),
};
