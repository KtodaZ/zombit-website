# Work remaining

Written so a session with no prior context can pick this up. Current state: the
site is built, committed, and deploying to a GitHub Pages preview. It is not yet
the live zombit.io.

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

- **Google Search Console:** add `zombit.io` as a property and submit
  `https://zombit.io/sitemap.xml`. The old Google Sites page could not serve a
  sitemap at all, so this is new capability, not a re-do.
- **Analytics:** the Google Sites page had a GA tag; this site has **none**. If
  it should keep measuring, add the GA4 tag to `src/app/layout.tsx`. Decide
  deliberately — shipping without it is a legitimate choice.
- **Retire or redirect the Google Sites page** so the two do not both exist. Not
  urgent, but leaving it published means two pages competing for the same name.

---

## 3. Content gaps

- **Artillery has one screenshot; the other two apps have three.** This is the
  most visible unfinished thing on the site. The App Store images are angled
  marketing composites that cannot be cropped back to a flat screen, and scraping
  the Play Store listing returned images belonging to unrelated apps. Two more
  straight-on captures from the app itself would close it. See `ASSETS.md` for the
  crop and encode commands used for the existing shots.
- **Ratings go stale.** `src/data/ratings.json` is generated; re-run
  `node scripts/fetch-ratings.mjs` to refresh from the App Store and Google Play.
  Never hand-edit it. The script keeps the previous committed value on a fetch
  failure rather than writing a placeholder, so a silent failure degrades to
  "slightly old" rather than "invented".
- **Nothing on this site may be invented.** No testimonials, press, awards,
  download counts, revenue, team size, or founding date — none of it exists, and
  the studio has none to cite. Review counts are genuinely small (22 and 4); the
  design deliberately does not lean on volume as proof.

---

## 4. Design work not yet done

The site was built under the `impeccable` skill and its finish sequence is
incomplete:

- **Run the detector** once against the finished UI:
  ```sh
  node ~/.claude/skills/impeccable/scripts/detect.mjs --json src/app src/components
  ```
- **Batched inspection round** — desktop and mobile together, fix findings in one
  batch, at most one confirming round. Not an open-ended polish loop.
- **Write `DESIGN.md`** from the built site, not from intent. It does not exist yet.
- The direction contract lives in `src/components/DirectionContract.tsx` and ships
  as a real HTML comment in the built output (seed `afdb082e`). It records the
  design thesis. Verify it survives any build change:
  ```sh
  grep -c afdb082e out/index.html   # must be > 0
  ```

The owner has said to expect **lots of refinements** to the visual design. None
of them are captured here yet.

---

## 5. Build gotchas worth knowing

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
