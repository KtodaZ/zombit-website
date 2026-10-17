---
name: Zombit Studios
description: Small, useful apps for phones and watches.
colors:
  paper: "#F7F4ED"
  paper-deep: "#EFEBE0"
  plate: "#FFFFFF"
  ink: "#16181D"
  ink-soft: "#43474F"
  slate: "#5F6A75"
  rule: "#CFC8B8"
  rule-soft: "#E2DCCE"
  accent-always-on-time: "#2F6DE0"
  accent-artillery: "#E0A32F"
  accent-montessori: "#E2542B"
  accent-word-garden: "#E3893A"
  accent-coffee: "#7A5A43"
typography:
  display:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.3
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  body-doc:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.11em"
rounded:
  tag: "0px"
  screen: "14px"
  icon: "22%"
  action: "9999px"
spacing:
  page-gutter: "24px"
  page-gutter-wide: "32px"
  section: "48px"
  section-wide: "64px"
components:
  store-action:
    backgroundColor: "{colors.accent-always-on-time}"
    textColor: "{colors.plate}"
    rounded: "{rounded.action}"
    padding: "8px 16px"
    height: "40px"
  platform-tag:
    textColor: "{colors.slate}"
    rounded: "{rounded.tag}"
    padding: "2px 6px"
  screen-plate:
    backgroundColor: "#000000"
    rounded: "{rounded.screen}"
---

# Design System: Zombit Studios

## Overview

**Creative North Star: "The Field Guide"**

Five unrelated apps do not share a mood, so the site stops pretending they do. It reads as a
catalogue of specimens: warm paper, hairline rules, one editorial serif, and one plate per app.
The studio is the careful hand that wrote the labels, not a personality shouting over them. The
full thesis ships in every page as the direction contract (`src/components/DirectionContract.tsx`,
seed `afdb082e`).

Density is low and the rhythm is vertical: a page is a stack of ruled sections, each with one job.
Documents (privacy policies, support, the assistant help page) use the same ground and rules but
narrow to a reading measure and drop the plates.

The old Google Sites page (blue banner, repeated ZOMBIT wallpaper, template type) is the explicit
anti-reference.

**Key Characteristics:**
- Paper ground, ink text, hairline rules in one weight. Never boxes or cards.
- Newsreader for every heading, Geist for everything read.
- Exactly one accent per app, and it only ever marks the store action.
- The store listing's own screenshots, all at one plate height, so unrelated apps sit together.
- Static, legible without JavaScript; motion is one optional settle.

## Colors

A warm, low-chroma neutral scale with five saturated accents held in reserve.

### Primary (one per app)
- **Calendar Blue** (#2F6DE0): Always On Time. Store action only; white text (4.8:1).
- **Range Amber** (#E0A32F): Artillery Let Loose. Store action only; ink text (8.0:1).
- **Timer Vermilion** (#E2542B): Montessori Visual Timer. Store action only; ink text (4.7:1).
- **Garden Tile Orange** (#E3893A): Word Garden. Store action only; ink text (6.7:1).
- **Roast Brown** (#7A5A43): Coffee Roast Tracker. Store action only; white text (6.2:1).

Text colour on an accent is computed (`onAccent()` in `src/components/Specimen.tsx`): whichever
of white or ink has more contrast. Never hard-code white on a light accent.

### Neutral
- **Paper** (#F7F4ED): the ground on every page.
- **Paper Deep** (#EFEBE0): inline code and the rare tinted inset.
- **Plate** (#FFFFFF): example chips on the assistant page; nothing large.
- **Ink** (#16181D): headings, links, current nav item.
- **Ink Soft** (#43474F): body copy (8.5:1 on paper).
- **Slate** (#5F6A75): secondary text, tags, captions, inactive nav (5.0:1 on paper; it was
  #6E7A85 until it was found failing AA at small sizes).
- **Rule** (#CFC8B8): section rules and link underlines.
- **Rule Soft** (#E2DCCE): list dividers, tag borders, the masthead and footer rules.

### Named Rules
**The Accent Means Act Rule.** An app's accent appears on its store buttons and nowhere else: not
headings, not icons, not backgrounds. If a reader sees the colour, they can tap it.

## Typography

**Display Font:** Newsreader (with Georgia)
**Body Font:** Geist (with system-ui)
**Mono:** Geist Mono, only for the connector address and inline code

**Character:** A bookish serif that sets the labels, and a plain grotesque that gets out of the
way of the facts.

### Hierarchy
- **Display** (400, 2rem → 3.25rem on the home page, 2.875rem on app pages, 2.5rem on documents,
  1.12–1.14): one h1 per page.
- **Descriptor** (Newsreader italic, 1.1875–1.3125rem): the plain-words line under an app's name.
- **Headline** (400, 1.375rem, 1.3): section titles ("Questions", "Where to get it", policy h2s).
- **Title** (400, 1.125rem): capability group titles and FAQ questions.
- **Body** (400, 1.0625rem, ~1.65): ledes and app copy, at a 34rem measure.
- **Body (documents)** (400, 1rem, 1.7): policies and help, at a 40rem measure.
- **Label** (400, 0.6875rem, 0.11em tracking, uppercase): platform tags and store names only.

## Layout

One centred column, max 74rem, with 24px gutters (32px from `sm`). Two measures: 34rem for
marketing copy, 40rem for documents. Sections are separated by full-width hairline rules and
48px/64px vertical padding. Capability lists go 1 → 2 → 3 columns; FAQs go 1 → 2.

On phones, the masthead collapses to "Apps", "Blog" (once a post is published), and "Support", and every app's plates are one
sideways-scrolling row (snap, keyboard-focusable).

**The plate tray.** Every catalogue entry and every app page carries one tray under its copy: the
store listing's screenshots at a single plate height (21rem, 24rem from `xl`), in listing order,
with a slate provenance line ("Images from the Google Play listing."). A landscape video sits
beside the row from `lg` (above it on phones); a portrait video is simply the first plate. The row
scrolls sideways and never moves on its own; previous/next buttons appear only when it
overflows.

## Elevation & Depth

Flat paper. The only shadows belong to the device screen (`.screen`: a 1px ink hairline plus a
soft drop) and the store action (a 1px lift). Depth means "this is a real object you could hold";
it is never used to group content.

## Shapes

Square platform tags with hairline borders. 14px corners on device screens; app icons at their
store shape (~22%); pill store actions. No other radii.

## Components

- **Store action:** pill, accent background, computed text colour, store glyph, a visually hidden
  "(opens App Store)". Lifts 1px on hover and focus, not under reduced motion. Min height 40px.
- **Platform tags:** uppercase labels in hairline boxes beside the icon: platforms, then category.
- **Store plate:** a store screenshot as published, 14px corners, a 1px ink hairline and soft
  drop (`.store-shot`), fixed height, width from its intrinsic ratio (no layout shift), lazy,
  WebP at 360/540/720 with `srcset`. Alt text names the slide's caption and the screen shown.
- **Video plate:** our own poster in the `.screen` mat with a paper "Play 0:17" pill in the
  bottom-left corner (never centred over the poster's own text; never an accent colour). It is a
  link to the YouTube page until clicked; the click swaps in the youtube-nocookie player in the
  same box, so nothing loads from YouTube before play. Caption: "Video, 0:17, loads from YouTube
  when you press play."
- **Ratings:** one line per store, only for fetched ratings with at least 10 ratings; a dated
  footnote.
- **Blog post:** the document armature (crumbs, h1, a slate kind-and-date line) over `.post`
  body copy at the 40rem measure; hairline tables that scroll sideways on phones; then the
  visible FAQ, a numbered sources list, and the related app set like a catalogue entry (rules,
  never a card).
- **Questions:** an open definition list, never an accordion. It is also the FAQPage JSON-LD.
- **Breadcrumbs:** on document pages only; matches the BreadcrumbList JSON-LD.
- **Policy body:** `.policy` / `.doc` in `globals.css`: serif h2s over a soft rule, sans body at
  1.7, disc markers in slate, underlined links.

## Do's and Don'ts

- **Do** state platform availability, price, and limits per app, from the store listing.
- **Do** show store screenshots exactly as the store publishes them; never redraw or re-caption.
- **Don't** add a hero device render, gradients, glass, glow, or cards.
- **Don't** use an accent for anything but the store action.
- **Don't** invent ratings, counts, testimonials, or claims; small numbers are shown as they are.
- **Don't** collapse answers or policy text behind interaction; it must be visible static HTML.
