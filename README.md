# zombit.io

The Zombit Studios site: a studio index plus one landing page per app.

Static Next.js, exported to plain HTML at build time and served from GitHub
Pages. Static export is the point — answer engines and crawlers that do not run
JavaScript still get the whole page, along with `robots.txt`, `sitemap.xml`, and
JSON-LD, none of which the previous Google Sites page could provide.

## Develop

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into out/
```

Both scripts pass `--webpack`. Turbopack cannot load Tailwind's native oxide
binding through its bundled postcss worker on this toolchain.

## Content

- `src/data/apps.ts` — the whole content model. Copy is drawn from the official
  store listings; per-app store availability, accents, and caveats live here.
- `src/data/ratings.json` — generated. Run `node scripts/fetch-ratings.mjs` to
  refresh from the App Store and Google Play. Never edit by hand.
- `ASSETS.md` — where every shipping image came from.
- `PRODUCT.md` / `DESIGN.md` — product truth and the visual system.

## Deploy

Pushing to `main` builds and publishes via `.github/workflows/deploy.yml`.
The site is built for the apex domain `zombit.io`, which still points at the old
Google Sites page; the DNS cutover is a separate, deliberate step.
