import {
  APPS,
  SITE,
  platformsOf,
  embedUrl,
  posterPath,
  privacyPath,
  showsRating,
  storeShotUrls,
  watchUrl,
  type AppEntry,
  type Faq,
  type Listing,
} from "@/data/apps";
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
 * at least MIN_RATINGS ratings, and only one store's: the store with the most ratings. Blending two stores into
 * one number would be a figure neither store published.
 */
export function mobileApplication(app: AppEntry) {
  const rated = (["ios", "android"] as const)
    .map((k) => app.listings[k])
    .filter(showsRating)
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
    operatingSystem: platformsOf(app).map((k) => OS[k]).join(", "),
    image: abs(app.icon),
    screenshot: storeShotUrls(app).map((s) => abs(s)),
    ...(app.stores.length
      ? { installUrl: app.stores.map((s) => s.url), sameAs: app.stores.map((s) => s.url) }
      : {}),
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

/**
 * One of our own videos, for a page that shows its player. The thumbnail is the poster the site
 * hosts; the embed is the youtube-nocookie player the page loads on play.
 */
export function videoObject(app: AppEntry) {
  const v = app.video;
  if (!v) return null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${SITE_ROOT}/${app.slug}/#video`,
    name: v.title,
    description: v.description,
    thumbnailUrl: [abs(posterPath(app, v.posterWidths[v.posterWidths.length - 1]))],
    uploadDate: v.uploadDate,
    duration: `PT${v.seconds}S`,
    embedUrl: embedUrl(v),
    contentUrl: watchUrl(v),
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    about: { "@id": `${SITE_ROOT}/${app.slug}/#app` },
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

/** One blog post. Author and publisher are the studio: posts carry no personal byline. */
export function blogPosting(p: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  app?: string;
  image: string;
}) {
  const url = `${SITE_ROOT}/blog/${p.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.updated,
    inLanguage: "en",
    image: abs(p.image),
    author: { "@id": ORG_ID, "@type": "Organization", name: SITE.legalName, url: `${SITE_ROOT}/` },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@type": "Blog", "@id": `${SITE_ROOT}/blog/#blog` },
    ...(p.app ? { about: { "@id": `${SITE_ROOT}/${p.app}/#app` } } : {}),
  };
}

/** The blog index: a Blog node listing its posts. */
export function blog(posts: { slug: string; title: string; date: string; updated: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_ROOT}/blog/#blog`,
    url: `${SITE_ROOT}/blog/`,
    name: `${SITE.name} blog`,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_ROOT}/blog/${p.slug}/#article`,
      url: `${SITE_ROOT}/blog/${p.slug}/`,
      headline: p.title,
      datePublished: p.date,
      dateModified: p.updated,
    })),
  };
}
