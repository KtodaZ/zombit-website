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

Three genuinely unrelated apps — a meeting alarm, a Hell Let Loose artillery calculator, and a
children's visual timer — shipped by one two-person studio. The honest through-line is small,
useful, single-purpose tools that do one job without ads or manipulation, not a themed portfolio.
Do not invent a fake unifying brand story.

## Operating Context

Most traffic is mobile, arriving from an app store listing. Visits are short and evaluative.
The site is static, has no backend, no forms that submit anywhere, and no analytics beyond the
existing Google Analytics property (`G-8VH9SBYS6Z`, property "zombit.io").

## Capabilities and Constraints

- Four routes: homepage, plus one page per app.
- Store availability differs per app and must be stated accurately, never uniformly:
  - **Always On Time: Meeting Alarm** — Android only (`com.zombitstudios.alwaysontime`). Has a
    Wear OS companion. No iOS build exists.
  - **ALL - HLL Artillery Calculator** — both iOS (`1616413054`) and Android
    (`flutter.app.artillery_let_loose`).
  - **Montessori Visual Timer** — iOS only (`6760267134`). No Android build exists.
- Ratings are real and fetched from Apple's public lookup API and the Play listing at build time,
  then committed as static JSON. Review counts are genuinely low (iOS: 22 and 4 respectively) —
  the design must not lean on volume as proof.
- Screenshot assets are inconsistent in kind: Always On Time has raw device screenshots; the other
  two ship only pre-composed store marketing slides with device frames baked in. Raw screens can
  be cropped back out of the straight-on slides.
- No backend, so no working contact form. Support contact must be a real channel (email, or the
  Artillery Discord, which is a genuine published link).

## Brand Commitments

- Legal entity name is **Zombit Studios LLC**. App Store seller name matches.
- The existing blue rounded-square **Z mark** (white Z with an orbit ellipse) is a fixed asset:
  designed by the user's wife, and to be kept. The user's own read is that it looks "a bit too
  90s," and the instruction is to use it **subtly** — as a small mark, favicon, and footer
  presence — not as the hero of the design.
- The rest of the current Google Sites look (blue banner, repeated ZOMBIT wallpaper, default
  template type) is explicitly an anti-reference. The user asked for something "completely new"
  and "professional modern," at "Apple quality."
- The three app pages must share one layout system, so the studio reads as one publisher.

## Evidence on Hand

Real, verified, in `_assets-raw/`:

- Official App Store descriptions and metadata for both iOS apps (via iTunes lookup API).
- Official Play Store long description for Always On Time, from the app repo at
  `~/repos/calendar-meeting-alarm/play-store-assets/listing/en-US/`.
- App icons at 1024px for all three; the Zombit Z mark at 2000px.
- Screenshots: raw 1080x1920 for Always On Time; composed store slides for the other two.
- Live ratings, confirmed fetchable: iOS 4.86 (22 ratings) Artillery, 4.75 (4) Montessori;
  Play 4.7 for both Android apps.
- A real Discord invite published in the Artillery store listing:
  `https://discord.gg/PsuUYHAKkT`.
- Always On Time privacy policy exists at
  `~/repos/calendar-meeting-alarm/play-store-assets/privacy-policy.html`.

Explicitly absent — must not be fabricated: press coverage, testimonials, customer logos, award
claims, revenue or download figures, team bios, and a company founding date.

## Product Principles

1. **Accurate per app.** Store badges, platform claims, and ratings differ per app and must reflect
   reality. A uniform "Download on iOS and Android" row would be a lie on two of three pages.
2. **One layout, three characters.** Shared structure and components so the studio reads as one
   publisher, with each app's own artwork and accent carrying its personality.
3. **Ship real artifacts.** Use the actual screenshots, icons, copy, and ratings. Never a
   placeholder, a lorem block, or an invented number.
4. **Machine-legible by construction.** Static HTML, correct metadata, sitemap, robots, and
   per-app `SoftwareApplication` JSON-LD are part of the deliverable, not an afterthought.
5. **Quiet about the studio, loud about the apps.** The visitor came for an app. Studio framing
   stays brief and factual.

## Accessibility & Inclusion

Always On Time is explicitly built for people with time blindness, ADHD-adjacent scheduling
difficulty, and packed calendars; its own store copy names that audience and promises "no guilt,
scores, or streaks." The site must not undercut that with pressure tactics, fake urgency, or
shame-based copy. Montessori Visual Timer is used by children, parents, and therapists, so its
page should stay calm and plain-language. Meet WCAG AA contrast, respect
`prefers-reduced-motion`, and keep all interactive targets keyboard-reachable.
