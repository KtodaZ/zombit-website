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

## 1. The DNS cutover

This is the only task that changes what the public sees. Nothing below depends on
it, and it depends on nothing below.

**Do not start this without the owner's explicit go-ahead.** It takes zombit.io
off Google Sites, and DNS changes are slow to walk back.

Before cutting over, confirm the preview looks right on a phone — the whole point
of the preview is that it is the same build.

1. **In Squarespace DNS for `zombit.io`,** replace the records pointing at Google
   Sites with GitHub's. Read the current values off GitHub's own docs rather than
   trusting this file — the apex IPs have changed before:
   <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>
   - four `A` records on the apex, plus the matching `AAAA` records
   - a `CNAME` on `www` → `ktodaz.github.io`
2. **Add a `CNAME` file** containing `zombit.io` at `public/CNAME`, so the static
   export carries it into `out/` on every build. Setting the custom domain in the
   repo's Pages settings writes this file at the repo root instead; either works,
   but do not end up with both disagreeing.
3. **Delete the two `NEXT_PUBLIC_*` env lines** from the `npm run build` step in
   `.github/workflows/deploy.yml`. This is the important one. Dropping the base
   path is what flips canonicals, the sitemap, JSON-LD ids, image URLs,
   `robots.txt`, and the robots meta from the preview back to the apex — and what
   makes the site indexable at all. There is no other switch.
4. **Wait for HTTPS.** GitHub provisions the certificate after DNS resolves; the
   Pages settings page shows "Enforce HTTPS" once it is ready. Turn it on.
5. **Verify** — every line should mention `zombit.io`, and robots should say
   `Allow`, not `Disallow`:
   ```sh
   curl -s https://zombit.io/robots.txt
   curl -s https://zombit.io/sitemap.xml | grep -o '<loc>[^<]*</loc>'
   curl -s https://zombit.io/always-on-time/ | grep -o 'rel="canonical" href="[^"]*"'
   ```

### Why the preview is `noindex`

It serves copy identical to the real site. An indexed preview would put zombit.io
into a duplicate-content fight with itself. `src/app/robots.ts` and the `robots`
metadata in `src/app/layout.tsx` both branch on `IS_PREVIEW`, which is simply
"was a base path set". Step 3 flips both at once. Do not hand-edit either file to
force indexing before cutover.

---

## 2. After cutover

- **Search Console, Bing, IndexNow:** the steps and the exact IndexNow ping are in
  [docs/AEO.md](docs/AEO.md#after-the-cutover).
- **Store listings:** point each app's developer website and privacy policy URL at its zombit.io
  page and `/<slug>/privacy/`. The old Flycricket and Google Sites URLs can then be retired.
- **Analytics:** the Google Sites page had a GA tag; this site has **none**. If it should keep
  measuring, add the GA4 tag to `src/app/layout.tsx`. Decide deliberately — shipping without it is
  a legitimate choice.
- **Retire or redirect the Google Sites page** so the two do not both exist. Not urgent, but
  leaving it published means two pages competing for the same name.

---

## 3. The assistant connector page

`/always-on-time/assistants/` builds today, because the Always On Time app links to it, but it is
held back by one flag, `ASSISTANTS_LIVE` in `src/data/flags.ts`. While it is `false` the page:

- renders `noindex` and a "Not available yet" note,
- is left out of the sitemap, llms.txt, the Always On Time page, and the support page.

**To go live,** merge the pushed branch `policy/assistant-connector`. It ports the connector and
usage-statistics sections of the Always On Time privacy policy (from the cloud repo's
`assistant/server` branch, anchors `#assistants` and `#usage-statistics`) and flips the flag in
the same commit. Merge it only when the connector is deployed and `CONNECTOR_URL`
(`https://alwaysontime.zombit.io/mcp`) answers. Check that the app's own connector address
(`AppLinks.CONNECTOR_URL` in calendar-meeting-alarm) is the same URL before merging.

---

## 4. Content

- **Screenshots.** Word Garden and Coffee Roast Tracker ship one screen each. Their store images
  are marketing composites, and only one per app shows a full, straight-on screen that could be
  cropped back. The other apps have three. Two more real captures per app would close it; see
  `ASSETS.md` for the crop and encode commands.
- **Ratings and prices go stale.** `src/data/ratings.json` is generated; re-run
  `node scripts/fetch-ratings.mjs` to refresh ratings and US prices from the App Store and Google
  Play. Never hand-edit it. A store that cannot be read keeps its previous value. Play ratings come
  from the listing's own JSON-LD; the old "Rated N stars" match picked up unrelated page furniture
  and reported 4.7 for apps with no ratings.
- **Privacy policies are legal text.** `src/content/privacy/*.html` are verbatim ports. Change
  their wording only when the policy changes, keep heading ids (apps deep-link to
  `#travel-location`, `#assistants`, `#usage-statistics`), and update `privacyEffective` in
  `src/data/apps.ts` to match.
- **Sitemap dates.** Bump `LASTMOD` in `src/data/flags.ts` when a page's content changes.
- **Nothing on this site may be invented.** No testimonials, press, awards, download counts,
  revenue, team size, or founding date — none of it exists, and the studio has none to cite.

---

## 5. Design

The impeccable finish sequence is done: detector clean, one batched desktop + mobile inspection
round with its fixes, and [DESIGN.md](DESIGN.md) written from the built site. Keep the direction
contract seed in the build:

```sh
grep -c afdb082e out/index.html   # must be > 0
```

The owner has said to expect **lots of refinements** to the visual design. None are captured yet.

---

## 6. Build gotchas worth knowing

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
