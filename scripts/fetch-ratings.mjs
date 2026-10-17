// Fetches real store ratings and prices at build-prep time and commits them as static JSON.
// Never invents numbers: a store that cannot be read keeps its previous value, and a listing
// that has no rating yet is recorded as having none.
//
//   node scripts/fetch-ratings.mjs
import { readFileSync, writeFileSync } from "node:fs";

const OUT = new URL("../src/data/ratings.json", import.meta.url);

// Keys match `ratingsKey` in src/data/apps.ts.
const IOS = {
  artillery: "1616413054",
  montessori: "6760267134",
  wordgarden: "6781898007",
  coffee: "6760438622",
};
const PLAY = {
  alwaysontime: "com.zombitstudios.alwaysontime",
  artillery: "flutter.app.artillery_let_loose",
  montessori: "com.zombitstudios.visualtimer",
  wordgarden: "com.zombit.wordgarden",
  coffee: "com.zombit.coffeeRoastingCompanion",
};

const round1 = (n) => Math.round(n * 10) / 10;

/** US App Store listing via Apple's public lookup API. */
async function ios(id) {
  const r = await fetch(`https://itunes.apple.com/lookup?id=${id}&country=us`);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const a = (await r.json()).results?.[0];
  if (!a) throw new Error("no result");
  const rated = a.averageUserRating && a.userRatingCount;
  return {
    score: rated ? round1(a.averageUserRating) : null,
    count: rated ? a.userRatingCount : null,
    price: a.price ?? 0,
    currency: a.currency ?? "USD",
  };
}

/**
 * Google Play listing. The rating comes from the listing's own JSON-LD block, not from
 * "Rated N stars" text: that phrase also appears in unrelated page furniture, and matching it
 * once produced a 4.7 for apps with no ratings at all.
 */
async function play(pkg) {
  const r = await fetch(
    `https://play.google.com/store/apps/details?id=${pkg}&hl=en_US&gl=US`,
    { headers: { "User-Agent": "Mozilla/5.0 (Macintosh) Chrome/130 Safari/537.36" } },
  );
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const html = await r.text();
  const block = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return null;
      }
    })
    .find((j) => j && j["@type"] === "SoftwareApplication");
  if (!block) throw new Error("no SoftwareApplication JSON-LD");
  const agg = block.aggregateRating;
  const offer = Array.isArray(block.offers) ? block.offers[0] : block.offers;
  return {
    score: agg?.ratingValue ? round1(Number(agg.ratingValue)) : null,
    count: agg?.ratingCount ? Number(agg.ratingCount) : null,
    price: offer ? Number(offer.price) : 0,
    currency: offer?.priceCurrency ?? "USD",
  };
}

let prev = {};
try {
  prev = JSON.parse(readFileSync(OUT, "utf8"));
} catch {}

const out = { fetchedAt: new Date().toISOString().slice(0, 10), apps: {} };
const keep = (key, store) => prev.apps?.[key]?.[store];

for (const [key, id] of Object.entries(IOS)) {
  const v = await ios(id).catch((e) => (console.warn("ios", key, e.message), null));
  out.apps[key] ??= {};
  const value = v ?? keep(key, "ios");
  if (value) out.apps[key].ios = value;
  console.log("ios ", key, v ?? "(kept previous)");
}
for (const [key, pkg] of Object.entries(PLAY)) {
  const v = await play(pkg).catch((e) => (console.warn("play", key, e.message), null));
  out.apps[key] ??= {};
  const value = v ?? keep(key, "android");
  if (value) out.apps[key].android = value;
  console.log("play", key, v ?? "(kept previous)");
}

writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log("wrote src/data/ratings.json");
