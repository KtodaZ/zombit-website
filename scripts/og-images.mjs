// Renders the 1200x630 Open Graph cards in public/og/ with headless Chrome, from the same icons
// and screenshots the site ships. Re-run after changing an app's name, descriptor, icon, or
// first screenshot:
//
//   node scripts/og-images.mjs          # studio, app, and blog cards
//   node scripts/og-images.mjs blog     # blog post cards only (public/og/blog/<slug>.png)
//
// Post cards are rendered for published posts only (pass --drafts to include drafts for a
// look; do not commit those). A post without its own card falls back to its app's card.
//
// Needs Google Chrome installed (CHROME env var overrides the path) and network access for the
// Newsreader and Geist web fonts.
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
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

// Blog frontmatter, read with a few line regexes (title, slug, app, draft are one-line scalars).
const BLOG = join(ROOT, "src/content/blog");
const field = (fm, k) => fm.match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, "m"))?.[1];
let posts = [];
try {
  posts = readdirSync(BLOG)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const fm = readFileSync(join(BLOG, f), "utf8").split(/^---$/m)[1] ?? "";
      return {
        slug: field(fm, "slug") || f.replace(/\.md$/, ""),
        title: field(fm, "title") ?? "",
        app: apps.find((a) => a.slug === field(fm, "app")),
        draft: field(fm, "draft") === "true",
      };
    })
    .filter((p) => p.title && (!p.draft || process.argv.includes("--drafts")));
} catch {}

const escHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function postCard(p) {
  const size = p.title.length > 48 ? 64 : 76;
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}
  .kicker{position:absolute;left:72px;top:168px;font-size:20px;letter-spacing:0.14em;text-transform:uppercase;color:#5F6A75}
  h1{position:absolute;left:72px;top:212px;width:1040px;font-family:Newsreader,Georgia,serif;font-weight:400;font-size:${size}px;line-height:1.08;letter-spacing:-0.02em}
  .app{position:absolute;right:72px;bottom:44px;display:flex;align-items:center;gap:14px;font-family:Newsreader,Georgia,serif;font-size:26px;color:#43474F}
  .app img{width:52px;height:52px;border-radius:12px;box-shadow:0 0 0 1px rgba(0,0,0,.08)}
  </style></head><body>
  <div class="mast"><img src="${file("/icons/zombit-mark.webp")}">Zombit Studios</div>
  <div class="rule"></div>
  <div class="kicker">Blog</div>
  <h1>${escHtml(p.title)}</h1>
  ${p.app ? `<div class="app"><img src="${file(p.app.icon)}">${p.app.name}</div>` : ""}
  <div class="foot">zombit.io/blog</div>
  </body></html>`;
}

const tmp = mkdtempSync(join(tmpdir(), "zombit-og-"));
function render(name, html) {
  const page = join(tmp, `${name.replace(/\//g, "-")}.html`);
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

if (process.argv[2] !== "blog") {
  render("home", homeCard());
  for (const a of apps) render(a.slug, appCard(a));
}
mkdirSync(join(OUT, "blog"), { recursive: true });
for (const p of posts) render(`blog/${p.slug}`, postCard(p));
