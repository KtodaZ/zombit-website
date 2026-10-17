import { APPS, SITE, privacyPath, type AppEntry, type Faq, type Listing } from "@/data/apps";
import { SITE_ROOT, abs } from "./site";

const ORG_ID = `${SITE_ROOT}/#organization`;
const SITE_ID = `${SITE_ROOT}/#website`;

/** The one Organization node. Every other node points at it by @id. */
export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: `${SITE_ROOT}/`,
  description: SITE.description,
  email: SITE.email,
  logo: { "@type": "ImageObject", url: abs("/icons/zombit-mark.webp"), width: 512, height: 512 },
  sameAs: SITE.sameAs,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SITE.email,
    url: `${SITE_ROOT}/support/`,
    availableLanguage: "English",
  },
};

export const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  url: `${SITE_ROOT}/`,
  name: SITE.name,
  description: SITE.description,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
};

const OS = { ios: "iOS, iPadOS", android: "Android" } as const;

function offer(store: AppEntry["stores"][number], l: Listing | undefined) {
  if (!l) return null;
  return {
    "@type": "Offer",
    price: l.price.toFixed(2),
    priceCurrency: l.currency,
    url: store.url,
    availability: "https://schema.org/InStock",
    category: store.kind === "ios" ? "App Store" : "Google Play",
  };
}

/**
 * One MobileApplication per app. aggregateRating is emitted only for a real fetched rating with
 * a real count, and only one store's: the store with the most ratings. Blending two stores into
 * one number would be a figure neither store published.
 */
export function mobileApplication(app: AppEntry) {
  const rated = (["ios", "android"] as const)
    .map((k) => app.listings[k])
    .filter((l): l is Listing => Boolean(l && l.score !== null && l.count))
    .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))[0];
  const offers = app.stores
    .map((s) => offer(s, app.listings[s.kind]))
    .filter(Boolean);
  const alternates = [...new Set(app.stores.map((s) => s.title))].filter((t) => t !== app.name);
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": `${SITE_ROOT}/${app.slug}/#app`,
    name: app.name,
    ...(alternates.length ? { alternateName: alternates } : {}),
    url: `${SITE_ROOT}/${app.slug}/`,
    description: app.lede,
    applicationCategory: app.schemaCategory,
    operatingSystem: app.stores.map((s) => OS[s.kind]).join(", "),
    image: abs(app.icon),
    screenshot: app.shots.map((s) => abs(s)),
    installUrl: app.stores.map((s) => s.url),
    sameAs: app.stores.map((s) => s.url),
    featureList: app.groups.flatMap((g) => g.items),
    publisher: { "@id": ORG_ID },
    author: { "@id": ORG_ID },
    privacyPolicy: `${SITE_ROOT}${privacyPath(app)}`,
    ...(offers.length ? { offers } : {}),
    ...(rated
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rated.score,
            ratingCount: rated.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

/** Only for a FAQ that is rendered visibly on the same page. */
export function faqPage(url: string, faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Crumbs are [name, root-relative path] pairs, starting below Home. */
export function breadcrumbs(crumbs: [string, string][]) {
  const all: [string, string][] = [["Zombit Studios", "/"], ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_ROOT}${path}`,
    })),
  };
}

/** A plain WebPage node tying a document page to the site and, optionally, to an app. */
export function webPage(path: string, name: string, description: string, aboutAppSlug?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_ROOT}${path}#webpage`,
    url: `${SITE_ROOT}${path}`,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
    ...(aboutAppSlug ? { about: { "@id": `${SITE_ROOT}/${aboutAppSlug}/#app` } } : {}),
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
