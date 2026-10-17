# Asset provenance

Every raster and every ported document this site ships is listed here with its source. The
uncompressed captures live in `_assets-raw/`, which is gitignored because it is large and fully
derivable from the sources below.

## Store screenshots — `public/screens/<slug>/`

The showcase strip on the home page and each app page shows the current store listing's own
images (caption plus device, as the store shows them), in listing order. Fetched 2026-10-17:
App Store images through the App Store Connect API (live version, en-US, iPhone set), Play images
through the Play Developer API (`edits.images.list` for `phoneScreenshots` on a throwaway edit
that was deleted, never committed). Each is encoded at 360, 540, and 720px wide with
`cwebp -q 80 -m 6 -resize <w> 0` as `<n>-<w>.webp`; sizes and alt text are in `storeShots` in
`src/data/apps.ts`.

| App | Set used | Why |
|---|---|---|
| Always On Time | Google Play, 4 images (1080×1920) | Android only |
| Artillery Let Loose | Google Play, 3 images (1080×1920) | Most of its ratings are on Play; the iOS set is the same slides drawn on an iPhone |
| Montessori Visual Timer | Google Play, 4 images (1080×1920) | Superset of the iOS set (adds Quick Timers) |
| Word Garden | App Store iPhone 6.5", 4 images (1242×2688) | Identical to the Play set |
| Coffee Roast Tracker | App Store iPhone 6.5", 3 images (1242×2688) | Identical to the Play set (Play's copies are JPEG) |

Re-fetch when a listing's screenshots change, and keep the alt text in step with the captions.

## Videos and posters — `public/screens/<slug>/video-poster-<w>.webp`

| App | Video | Poster |
|---|---|---|
| Always On Time | YouTube `UVZwlFZaIBc` (landscape, 0:17, 2026-09-24) | YouTube `maxresdefault.jpg`, encoded at 640/960/1280 |
| Montessori Visual Timer | YouTube Short `W3l46xFXA5s` (portrait, 0:28, 2026-10-14) | Frame at 2 s of the master `Montessori-Visual-Timer/marketing/promo-video/out/preview-final.mp4` (YouTube's thumbnail is a landscape crop of the PIN pad), encoded at 360/540/720 |

The player is the youtube-nocookie embed, loaded only after a click (`src/components/VideoFacade.tsx`).

## Real screens — `public/shots/`

These now feed only the social cards (`scripts/og-images.mjs`). All are real app screens, not marketing composites. Composites were cropped back to the raw
screen with `ffmpeg -vf crop=w:h:x:y`, and everything is encoded with
`cwebp -q 86 -resize 620 0`. The site draws its own device frame, so every app sits in an
identical one.

| File | Source | Treatment |
|---|---|---|
| `alwaysontime-1..3.webp` | Google Play listing for `com.zombitstudios.alwaysontime` (raw 1080×1920 screens, earlier listing) | resize, WebP |
| `artillery-1.webp` | Game picker, v2.20 iOS capture from the app repo (`artillery_let_loose/.impeccable/review/ios-game.png`) | resize, WebP |
| `artillery-2.webp`, `artillery-3.webp` | Raw 1080×2400 calculator and history captures in `artillery_let_loose/screenshots/` — the screens inside the current store composites | resize, WebP |
| `montessori-1.webp` | App Store listing `6760267134`, slide 1 (straight-on) | `crop=738:1672:253:842`, then 5% off the top (notch) and 3.5% off the bottom |
| `montessori-2.webp`, `montessori-3.webp` | Frames at 50 s and 46 s of the raw simulator recording `Montessori-Visual-Timer/marketing/promo-video/out/raw/testTakeOneTimer.mp4` (running timer, PIN lock) | `crop=1320:2560:0:300` (drops the Dynamic Island) |
| `wordgarden-1.webp` | Google Play listing for `com.zombit.wordgarden`, image 4 (the only straight-on full screen) | `crop=740:1500:252:1030` |
| `coffee-1.webp` | Google Play listing for `com.zombit.coffeeRoastingCompanion`, image 1 (the only straight-on full screen) | `crop=780:1555:231:905` |

The earlier `montessori-2` and `montessori-3` were cropped from App Store slides 2 and 3 with
slide 1's crop box; those slides are laid out differently, so the crops caught marketing text and
an angled phone. They were replaced.

**Known gap:** Word Garden and Coffee Roast Tracker ship one screen each. Their other store images
are angled, partial, or a settings card rather than a screen, and there is no local source repo
with raw captures for either. The Android captures in the Artillery repo were not used because
they show AdMob test banners.

## Icons — `public/icons/`

| File | Source |
|---|---|
| `alwaysontime.webp`, `artillery.webp`, `montessori.webp` | store listing icons, 256px, WebP |
| `wordgarden.webp`, `coffee.webp` | App Store listing icons (`artworkUrl512` from the iTunes lookup API at 1024px), resized to 256px, WebP q90 |
| `zombit-mark.webp` | the studio's existing blue Z mark, 512px, WebP |

The Z mark is existing brand work and is not to be redrawn or retired. It is used subtly —
favicon, masthead, colophon — and never as a hero element.

## Open Graph cards — `public/og/`

Rendered by `scripts/og-images.mjs` with headless Chrome from the icons and first screenshot
above, in the site's own fonts. Nothing else is in them.

## Store copy

App copy in `src/data/apps.ts` is drawn from the official listings, read 2026-10-17: the iTunes
lookup API (`https://itunes.apple.com/lookup?id=<id>`) for iOS ids 1616413054, 6760267134,
6781898007, and 6760438622, and the Google Play listing pages for the five Android packages.
Montessori's "quick timers" and "PIN lock" items come from its Google Play screenshot captions.

## Privacy policies — `src/content/privacy/`

Ported verbatim. Only markup changed: Flycricket's literal `**bold**` paragraphs became `<h2>`
headings, empty spacer paragraphs were dropped, and headings got ids. A normalised text diff
against each source shows no wording changes.

| File | Source | Effective |
|---|---|---|
| `always-on-time.html` | `always-on-time-cloud` `origin/main:account-web/privacy-policy.html` | October 16, 2026 |
| `artillery-calculator.html` | <https://pages.flycricket.io/artillery-let-loose/privacy.html> | 2026-05-10 |
| `montessori-visual-timer.html` | <https://doc-hosting.flycricket.io/montessori-visual-timer/1c5cdcb2-37e1-424c-988b-4e81d2ee7950/privacy> | 2026-04-10 |
| `word-garden.html` | <https://doc-hosting.flycricket.io/word-garden-spelling/d33dc669-7ac3-449a-b039-8adbd3019491/privacy> | 2026-06-19 |
| `coffee-roast-tracker.html` | <https://doc-hosting.flycricket.io/coffee-roast-tracker/214425cb-dda9-4b2e-8894-d739a752cae3/privacy> | 2026-03-12 |

One hosting reference changed in the Always On Time policy: the account deletion link now points
to `https://alwaysontime.zombit.io/delete-account/` instead of the Firebase Hosting address.

## Ratings and prices

`src/data/ratings.json` is generated by `scripts/fetch-ratings.mjs` from the iTunes lookup API and
the JSON-LD block on each Google Play listing. On a fetch failure it keeps the previously
committed value rather than writing a placeholder. No rating, review count, price, or download
figure on this site is hand-written.
