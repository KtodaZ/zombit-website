// Renders the 1200x630 Open Graph cards in public/og/ with headless Chrome, from the same icons
// and screenshots the site ships. Re-run after changing an app's name, descriptor, icon, or
// first screenshot:
//
//   node scripts/og-images.mjs
//
// Needs Google Chrome installed (CHROME env var overrides the path) and network access for the
// Newsreader and Geist web fonts.
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CHROME =
  process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = join(ROOT, "public/og");
mkdirSync(OUT, { recursive: true });

// Pull name, descriptor, icon, and first shot straight out of the content model source, so the
// cards cannot drift from the pages without a TypeScript toolchain at hand.
const src = readFileSync(join(ROOT, "src/data/apps.ts"), "utf8");
const apps = [...src.matchAll(/slug: "([^"]+)",\s*name: "([^"]+)",[\s\S]*?descriptor: "([^"]+)",[\s\S]*?icon: "([^"]+)",\s*shots: \[\s*"([^"]+)"/g)].map(
  ([, slug, name, descriptor, icon, shot]) => ({ slug, name, descriptor, icon, shot }),
);
if (apps.length !== 5) throw new Error(`expected 5 apps, parsed ${apps.length}`);

const file = (p) => `file://${join(ROOT, "public", p)}`;
const FONTS =
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&family=Geist:wght@400;500&display=block">';
const BASE = `
  *{margin:0;box-sizing:border-box}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{background:#F7F4ED;color:#16181D;font-family:Geist,system-ui,sans-serif;position:relative}
  .mast{position:absolute;left:72px;top:56px;display:flex;align-items:center;gap:12px;font-family:Newsreader,Georgia,serif;font-size:26px;letter-spacing:-0.01em}
  .mast img{width:30px;height:30px;border-radius:8px}
  .rule{position:absolute;left:72px;right:72px;top:112px;height:1px;background:#CFC8B8}
  .foot{position:absolute;left:72px;bottom:52px;font-size:20px;color:#5F6A75;letter-spacing:0.02em}
`;

function appCard(a) {
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}
  .icon{position:absolute;left:72px;top:176px;width:112px;height:112px;border-radius:26px;box-shadow:0 0 0 1px rgba(0,0,0,.08)}
  h1{position:absolute;left:72px;top:316px;width:720px;font-family:Newsreader,Georgia,serif;font-weight:400;font-size:76px;line-height:1.02;letter-spacing:-0.02em}
  p{position:absolute;left:72px;top:${a.name.length > 22 ? 478 : 410}px;width:700px;font-family:Newsreader,Georgia,serif;font-style:italic;font-size:36px;line-height:1.2;color:#43474F}
  .plate{position:absolute;right:96px;top:150px;width:260px;height:560px;border-radius:22px;overflow:hidden;background:#000;box-shadow:0 0 0 1px rgba(22,24,29,.16),0 24px 50px -28px rgba(22,24,29,.6)}
  .plate img{width:100%;display:block}
  </style></head><body>
  <div class="mast"><img src="${file("/icons/zombit-mark.webp")}">Zombit Studios</div>
  <div class="rule"></div>
  <img class="icon" src="${file(a.icon)}">
  <h1>${a.name}</h1>
  <p>${a.descriptor}</p>
  <div class="plate"><img src="${file(a.shot)}"></div>
  <div class="foot">zombit.io/${a.slug}</div>
  </body></html>`;
}

function homeCard() {
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}
  h1{position:absolute;left:72px;top:170px;width:980px;font-family:Newsreader,Georgia,serif;font-weight:400;font-size:84px;line-height:1.04;letter-spacing:-0.02em}
  .icons{position:absolute;left:72px;top:410px;display:flex;gap:22px}
  .icons img{width:88px;height:88px;border-radius:20px;box-shadow:0 0 0 1px rgba(0,0,0,.08)}
  </style></head><body>
  <div class="mast"><img src="${file("/icons/zombit-mark.webp")}">Zombit Studios</div>
  <div class="rule"></div>
  <h1>Small, useful apps for phones and watches.</h1>
  <div class="icons">${apps.map((a) => `<img src="${file(a.icon)}">`).join("")}</div>
  <div class="foot">zombit.io</div>
  </body></html>`;
}

const tmp = mkdtempSync(join(tmpdir(), "zombit-og-"));
function render(name, html) {
  const page = join(tmp, `${name}.html`);
  writeFileSync(page, html);
  execFileSync(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    "--virtual-time-budget=8000",
    `--user-data-dir=${join(tmp, "profile")}`,
    `--screenshot=${join(OUT, `${name}.png`)}`,
    `file://${page}`,
  ], { stdio: "ignore" });
  console.log("wrote public/og/" + name + ".png");
}

render("home", homeCard());
for (const a of apps) render(a.slug, appCard(a));
