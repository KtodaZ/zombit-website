// Fetches real store ratings and prices at build-prep time and commits them as static JSON.
// Never invents numbers: a store that cannot be read keeps its previous value, and a listing
// that has no rating yet is recorded as having none.
//
//   node scripts/fetch-ratings.mjs                # local refresh; commit the result
//   node scripts/fetch-ratings.mjs --allow-clear  # also accept a rating that disappeared
//
// The deploy workflow runs this before every build. It must never make the site worse than the
// committed file: a store that is down, slow, or serves an unexpected page keeps its previous
// value, and a listing that used to have a rating but now reads as unrated keeps the old figure
// unless --allow-clear is passed (ratings do not vanish; a missing one is far more likely a
// changed page than a real reset). `fetchedAt` only moves forward when every store was read
// fresh, so the "ratings read <date>" line is never newer than the oldest figure on the page.
import { readFileSync, renameSync, writeFileSync } from "node:fs";

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
const ALLOW_CLEAR = process.argv.includes("--allow-clear");
const TIMEOUT_MS = 20_000;

/** US App Store listing via Apple's public lookup API. */
async function ios(id) {
  const r = await fetch(`https://itunes.apple.com/lookup?id=${id}&country=us`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
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
    {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh) Chrome/130 Safari/537.36" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
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

const out = { fetchedAt: prev.fetchedAt, apps: {} };
let allFresh = true;

/**
 * Picks what to record for one store: the fresh read, or the previous value when the read failed
 * or lost a rating the store had before.
 */
function settle(label, prevValue, fresh) {
  if (!fresh) {
    allFresh = false;
    console.log(label, "(kept previous)", prevValue ?? "(none)");
    return prevValue;
  }
  if (fresh.score === null && prevValue?.score != null && !ALLOW_CLEAR) {
    allFresh = false;
    console.warn(label, "read as unrated but had", prevValue.score, "- kept previous rating (use --allow-clear to accept)");
    return { ...fresh, score: prevValue.score, count: prevValue.count };
  }
  console.log(label, fresh);
  return fresh;
}

const STORES = [
  ["ios", IOS, ios],
  ["android", PLAY, play],
];
for (const [store, ids, read] of STORES) {
  for (const [key, id] of Object.entries(ids)) {
    const fresh = await read(id).catch((e) => (console.warn(store, key, e.message), null));
    const value = settle(`${store} ${key}`, prev.apps?.[key]?.[store], fresh);
    out.apps[key] ??= {};
    if (value) out.apps[key][store] = value;
  }
}

if (allFresh || !out.fetchedAt) out.fetchedAt = new Date().toISOString().slice(0, 10);
// Write-then-rename, so a run killed mid-write (the workflow step has a timeout) leaves the
// committed file intact rather than a truncated one.
const TMP = new URL("../src/data/ratings.json.tmp", import.meta.url);
writeFileSync(TMP, JSON.stringify(out, null, 2) + "\n");
renameSync(TMP, OUT);
console.log(`wrote src/data/ratings.json (fetchedAt ${out.fetchedAt}${allFresh ? "" : ", some stores kept previous values"})`);
