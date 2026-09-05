// Fetches real store ratings at build-prep time and commits them as static JSON.
// Never invents numbers: a store that cannot be read keeps its previous value.
import { readFileSync, writeFileSync } from "node:fs";

const OUT = new URL("../src/data/ratings.json", import.meta.url);

const IOS = { artillery: "1616413054", montessori: "6760267134" };
const PLAY = {
  alwaysontime: "com.zombitstudios.alwaysontime",
  artillery: "flutter.app.artillery_let_loose",
};

async function ios(id) {
  const r = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
  const j = await r.json();
  const a = j.results?.[0];
  if (!a?.averageUserRating) return null;
  return { score: Math.round(a.averageUserRating * 10) / 10, count: a.userRatingCount ?? null };
}

async function play(pkg) {
  const r = await fetch(
    `https://play.google.com/store/apps/details?id=${pkg}&hl=en&gl=US`,
    { headers: { "User-Agent": "Mozilla/5.0" } },
  );
  const html = await r.text();
  const m = html.match(/aria-label="Rated ([0-9.]+) stars/);
  if (!m) return null;
  return { score: Number(m[1]), count: null };
}

let prev = {};
try { prev = JSON.parse(readFileSync(OUT, "utf8")); } catch {}

const out = { fetchedAt: new Date().toISOString().slice(0, 10), apps: { ...(prev.apps ?? {}) } };

for (const [key, id] of Object.entries(IOS)) {
  const v = await ios(id).catch(() => null);
  out.apps[key] = { ...(out.apps[key] ?? {}) };
  if (v) out.apps[key].ios = v;
  console.log("ios", key, v ?? "(kept previous)");
}
for (const [key, pkg] of Object.entries(PLAY)) {
  const v = await play(pkg).catch(() => null);
  out.apps[key] = { ...(out.apps[key] ?? {}) };
  if (v) out.apps[key].android = v;
  console.log("play", key, v ?? "(kept previous)");
}

writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log("wrote src/data/ratings.json");
