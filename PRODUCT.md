# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js with static export (`output: 'export'`), deployed to GitHub Pages from
`github.com/KtodaZ/zombit-website`. User chose Next.js static explicitly, after being told a
client-rendered SPA would hurt answer-engine visibility. Static HTML at build time is a hard
requirement, not a preference: the whole reason for leaving Google Sites is control over
`robots.txt`, `sitemap.xml`, meta tags, and JSON-LD.

Build targets the apex domain `zombit.io` (no `basePath`). The DNS cutover from Squarespace is
deliberately NOT part of the build: the Google Sites page stays live until the user reviews the
new site on a GitHub Pages preview URL and approves the switch.

## Users

Two audiences arrive by different routes and want different things:

1. **People evaluating one app.** They arrive from a store listing, a search, or a link, on
   mobile, deciding whether to install. They want to see the app, understand what it does, and
   get to the store. Per-app pages serve them.
2. **People checking the studio is real.** Store-listing "Developer Website" clicks, and anyone
   verifying a small publisher before installing. They want proof this is a legitimate operation
   with a support path. The homepage and contact/support routes serve them.

There is no logged-in user and no account. Every visitor is anonymous and first-time.

## Product Purpose

A marketing and credibility site for Zombit Studios LLC, a small independent app studio. It
replaces a default-template Google Sites page that had no meta description, no structured data,
no sitemap, and shipped `<title>Home</title>`.

Success is: a visitor lands on an app page, understands the app, and taps through to the correct
store. Secondary success is machine legibility — the pages should be parseable by search crawlers
and answer engines (which is why static HTML and JSON-LD matter).

## Positioning

Five genuinely unrelated apps — a calendar meeting alarm, an artillery calculator for Hell Let
Loose and WARDOGS, a children's visual timer, a daily spelling bee word puzzle, and a home coffee
roast log — shipped by one small studio. The honest through-line is small,
useful, single-purpose tools that do one job without ads or manipulation, not a themed portfolio.
Do not invent a fake unifying brand story.

## Operating Context

Most traffic is mobile, arriving from an app store listing. Visits are short and evaluative.
The site is static, has no backend, no forms that submit anywhere, and no analytics beyond the
existing Google Analytics property (`G-8VH9SBYS6Z`, property "zombit.io").

## Capabilities and Constraints

- Routes: homepage; one page per app; `/<slug>/privacy/` for each app; `/support/`; and
  `/always-on-time/assistants/` (built but unlisted and `noindex` until the connector is live).
  These paths are fixed: the apps, the cloud service's redirects, and store listings link to them.
- Store availability differs per app and must be stated accurately, never uniformly. Store titles
  differ from the app names for two apps, and both are shown:
  - **Always On Time** — Android only (`com.zombitstudios.alwaysontime`, listed as "Calendar
    Alarm: Always On Time"). Has a Wear OS companion. No iOS build exists.
  - **Artillery Let Loose** — iOS (`1616413054`, "ALL - HLL Artillery Calculator", $1.99) and
    Android (`flutter.app.artillery_let_loose`, "Wardogs & HLL Calculator", free with in-app
    purchases).
  - **Montessori Visual Timer** — iOS (`6760267134`, $1.99) and Android
    (`com.zombitstudios.visualtimer`, free).
  - **Word Garden: Spelling Bee** — iOS (`6781898007`) and Android (`com.zombit.wordgarden`), both
    free; also a web version at wordgarden.zombit.io (a separate site, not this one).
  - **Coffee Roast Tracker** — iOS (`6760438622`, $0.99) and Android
    (`com.zombit.coffeeRoastingCompanion`, free).
- Ratings and prices are real, fetched from Apple's lookup API and each Play listing's JSON-LD,
  then committed as static JSON. Counts are genuinely low or absent (Artillery: 22 on iOS, 1,219 on
  Play; Montessori 4; Word Garden 1; none for Always On Time or Coffee) — the design must not lean
  on volume as proof.
- Screenshots are real screens in one site-drawn frame. Word Garden and Coffee Roast Tracker have
  one each, because their store images are composites with only one clean screen.
- No backend, so no working contact form. Support is email (zombit.studios@gmail.com), the
  Artillery Let Loose Discord, and Always On Time's account deletion page.

## Brand Commitments

- Legal entity name is **Zombit Studios LLC**. App Store seller name matches.
- The existing blue rounded-square **Z mark** (white Z with an orbit ellipse) is a fixed asset:
  designed by the user's wife, and to be kept. The user's own read is that it looks "a bit too
  90s," and the instruction is to use it **subtly** — as a small mark, favicon, and footer
  presence — not as the hero of the design.
- The rest of the current Google Sites look (blue banner, repeated ZOMBIT wallpaper, default
  template type) is explicitly an anti-reference. The user asked for something "completely new"
  and "professional modern," at "Apple quality."
- The app pages share one layout system, so the studio reads as one publisher.

## Evidence on Hand

Real, verified, in `_assets-raw/`:

- Official App Store descriptions and metadata for all four iOS apps (via iTunes lookup API), and
  Google Play descriptions for all five Android apps.
- Official Play Store long description for Always On Time, from the app repo at
  `~/repos/calendar-meeting-alarm/play-store-assets/listing/en-US/`.
- App icons at 1024px for all five; the Zombit Z mark at 2000px.
- Screenshots: raw 1080x1920 for Always On Time; composed store slides for the other two.
- Live ratings in `src/data/ratings.json` (see above).
- A real Discord invite published in the Artillery store listing:
  `https://discord.gg/PsuUYHAKkT`.
- Privacy policies for all five apps, now hosted on this site (sources in `ASSETS.md`).

Explicitly absent — must not be fabricated: press coverage, testimonials, customer logos, award
claims, revenue or download figures, team bios, and a company founding date.

## Product Principles

1. **Accurate per app.** Store badges, platform claims, and ratings differ per app and must reflect
   reality. A uniform "Download on iOS and Android" row would be a lie on the Always On Time page.
2. **One layout, five characters.** Shared structure and components so the studio reads as one
   publisher, with each app's own artwork and accent carrying its personality.
3. **Ship real artifacts.** Use the actual screenshots, icons, copy, and ratings. Never a
   placeholder, a lorem block, or an invented number.
4. **Machine-legible by construction.** Static HTML, correct metadata, sitemap, robots, llms.txt,
   per-app `MobileApplication` and `FAQPage` JSON-LD, and visible FAQs are part of the
   deliverable, not an afterthought. See `docs/AEO.md`.
5. **Quiet about the studio, loud about the apps.** The visitor came for an app. Studio framing
   stays brief and factual.

## Accessibility & Inclusion

Always On Time is explicitly built for people with time blindness, ADHD-adjacent scheduling
difficulty, and packed calendars; its own store copy names that audience and promises "no guilt,
scores, or streaks." The site must not undercut that with pressure tactics, fake urgency, or
shame-based copy. Montessori Visual Timer is used by children, parents, and therapists, so its
page should stay calm and plain-language. Meet WCAG AA contrast, respect
`prefers-reduced-motion`, and keep all interactive targets keyboard-reachable.
