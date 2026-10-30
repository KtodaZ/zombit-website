# zombit.io

The Zombit Studios site: a studio index, one page per app, each app's privacy policy, a support
page, a blog, and the Always On Time assistant connector help page.

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
  store listings; per-app store availability, accents, and caveats live here. An entry with
  `prerelease` (no public store listing yet) gets noindex pages and is left out of every list.
- `src/data/ratings.json` — generated. Run `node scripts/fetch-ratings.mjs` to
  refresh ratings and prices from the App Store and Google Play. Never edit by hand. The
  deploy workflow also refreshes it before each build, falling back to the committed file.
  Ratings show only with at least 10 ratings.
- `src/content/blog/` — blog posts as Markdown with frontmatter; see docs/AEO.md. Drafts
  (`draft: true`) appear only in `npm run dev`.
- `src/data/flags.ts` — `ASSISTANTS_LIVE`, the connector address, and sitemap dates.
- `src/content/privacy/` — the privacy policies. Legal text; see TODO.md §5.
- `src/components/Analytics.tsx` — GA4, apex production build only; `/privacy/` (`src/app/privacy/`)
  describes what it collects. Store links carry `data-store`/`data-app`/`data-placement` for the
  `store_click` event; visits from AI assistants send `ai_referral`. Outbound store links carry
  `utm_source=zombit`, `utm_medium=website`, a page/app campaign and placement content; Google
  Play links also include those tags in the encoded `referrer`. Canonical metadata stays clean.
- `docs/AEO.md` — structured data, llms.txt, robots, and the post-cutover search steps.
- `ASSETS.md` — where every shipping image came from.
- `PRODUCT.md` / `DESIGN.md` — product truth and the visual system.

## Deploy

Pushing to `main` builds and publishes via `.github/workflows/deploy.yml`.

The site is served at <https://zombit.io> (custom domain from `public/CNAME`;
DNS at Squarespace: four `A` + four `AAAA` apex records for GitHub Pages and a
`www` CNAME to `ktodaz.github.io`). Building without `NEXT_PUBLIC_BASE_PATH` is
what makes canonicals, the sitemap, JSON-LD and `robots.txt` target the apex and
the site indexable. Setting `NEXT_PUBLIC_BASE_PATH` (e.g. for a project-page
preview) flips all of them back to `noindex`.
