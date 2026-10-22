# Work remaining

Written so a session with no prior context can pick this up. Current state: the
site is built, committed, and deploying to a GitHub Pages preview, with all five
apps, their privacy policies, a support page, and the (unlisted) assistant
connector help page. It is not yet the live zombit.io.

- **Repo:** `KtodaZ/zombit-website` (public — GitHub Pages will not serve a
  private repo on a free plan)
- **Preview:** <https://ktodaz.github.io/zombit-website/> — deliberately
  `noindex`, see below
- **Live site today:** zombit.io still serves the old Google Sites page, untouched
- **Registrar / DNS:** Squarespace

---

## 1. The DNS cutover — done 2026-10-17

zombit.io and www now point at GitHub Pages; `public/CNAME` is committed and the
workflow builds for the apex. noelle, wordgarden, alwaysontime and email records
were left untouched. The old Google Sites page no longer serves zombit.io.

## 2. After cutover

- **Search Console, Bing, IndexNow:** the steps and the exact IndexNow ping are in
  [docs/AEO.md](docs/AEO.md#after-the-cutover).
- **Store listings:** point each app's developer website and privacy policy URL at its zombit.io
  page and `/<slug>/privacy/`. The old Flycricket and Google Sites URLs can then be retired.
- **Analytics:** done 2026-10-17. GA4 (`G-8VH9SBYS6Z`, the existing "zombit.io" property) loads from
  `src/components/Analytics.tsx` on the production apex build only, with `store_click` events
  (`app`, `store`, `placement`) on every App Store / Google Play link that carries `data-store`.
  `/privacy/` describes it; change the two together. Optional in the GA4 admin: mark `store_click`
  as a key event, and register `app`, `store`, `placement` as event-scoped custom dimensions so
  they show up in reports.
- **Retire or redirect the Google Sites page** so the two do not both exist. Not urgent, but
  leaving it published means two pages competing for the same name.

---

## 3. The assistant connector page

`/always-on-time/assistants/` builds today, because the Always On Time app links to it, but it is
held back by one flag, `ASSISTANTS_LIVE` in `src/data/flags.ts`. While it is `false` the page:

- renders `noindex` and a "Not available yet" note,
- is left out of the sitemap, llms.txt, the Always On Time page, and the support page.

**To go live,** set `ASSISTANTS_LIVE = true` once the Always On Time release with Connected
assistants is live on Google Play. The connector server is already deployed (2026-10-17) at
`https://alwaysontime.zombit.io/mcp`, and the privacy policy's `#assistants` and
`#usage-statistics` sections (plus the Gemini paragraph) are already published.

---

## 4. PhotoVault (prerelease)

PhotoVault has only a draft on Google Play's internal track, so its entry in `src/data/apps.ts`
carries `prerelease`. `/photovault/` and `/photovault/privacy/` build (the Play listing and the
Google OAuth consent screen point at them) but render `noindex`, say it is coming soon, and are left
out of navigation, the home page, the sitemap, llms.txt, the support page, and the catalogue.

**To go live,** once the Google Play listing is public: delete `prerelease` (and `platforms`), add
the Play store entry and its `storeShots` (see ASSETS.md), add the package to
`scripts/fetch-ratings.mjs`, update the home page's "five apps" line and `SITE.description`, then
re-run `node scripts/og-images.mjs`.

---

## 5. Content

- **Store screenshots and videos.** The showcase shows each listing's own images (see
  `ASSETS.md`). Re-fetch when a listing changes. Artillery, Word Garden, and Coffee Roast Tracker
  have no video yet; adding `video` to an entry in `src/data/apps.ts` (plus its poster) is all it
  takes for the player to appear.
- **Ratings and prices go stale.** `src/data/ratings.json` is generated; re-run
  `node scripts/fetch-ratings.mjs` to refresh ratings and US prices from the App Store and Google
  Play. Never hand-edit it. A store that cannot be read keeps its previous value. Play ratings come
  from the listing's own JSON-LD; the old "Rated N stars" match picked up unrelated page furniture
  and reported 4.7 for apps with no ratings.
- **Privacy policies are legal text.** `src/content/privacy/*.html` were rewritten in plain
  language on 2026-10-17. Change their wording only when the policy changes, keep heading ids (apps deep-link to
  `#travel-location`, `#assistants`, `#usage-statistics`), and update `privacyEffective` in
  `src/data/apps.ts` to match.
- **Sitemap dates.** Bump `LASTMOD` in `src/data/flags.ts` when a page's content changes.
- **Nothing on this site may be invented.** No testimonials, press, awards, download counts,
  revenue, team size, or founding date — none of it exists, and the studio has none to cite.

---

## 6. Design

The impeccable finish sequence is done: detector clean, one batched desktop + mobile inspection
round with its fixes, and [DESIGN.md](DESIGN.md) written from the built site. Keep the direction
contract seed in the build:

```sh
grep -c afdb082e out/index.html   # must be > 0
```

The owner has said to expect **lots of refinements** to the visual design. None are captured yet.

---

## 7. Build gotchas worth knowing

- **`dev` and `build` are pinned to `--webpack`.** Turbopack cannot load
  Tailwind's native oxide binding through its bundled postcss worker on this
  toolchain. Do not remove the flags without checking the build still runs.
- **`next/image` with `unoptimized` does not apply `basePath`** — unlike CSS and
  `next/link`, which do. Every image `src` therefore goes through the `asset()`
  helper in `src/lib/site.ts`. A new `<Image>` that skips it renders fine locally
  and 404s on the preview.
- **The lockfile matters.** CI failed twice on `npm ci` because the lockfile had
  been generated by a `--force` install after two truncated native binary
  downloads, and was missing `@emnapi` packages Linux needs. If `npm ci` fails on
  the runner but installs fine locally, regenerate with a clean
  `rm -rf node_modules package-lock.json && npm install`.
- **OG cards** are committed PNGs in `public/og/`. Re-run `node scripts/og-images.mjs` after
  changing an app's name, descriptor, icon, or first screenshot (needs Chrome and network for
  fonts).
