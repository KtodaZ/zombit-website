/**
 * The direction contract ships in the built HTML, not only in source. React drops
 * JSX comments during render, so the comment is written as raw markup inside an
 * inert, hidden wrapper — that is what makes it survive `next build`.
 */
const CONTRACT = `<!--
impeccable:direction-contract seed afdb082e

THESIS — The Field Guide. Three unrelated apps do not share a mood, so the site
stops pretending they do. It is a catalogue of specimens: paper ground, hairline
rules, one editorial serif, one plate per app. The studio is the careful hand
that wrote the labels, not a personality shouting over them.

OWN-WORLD — Warm paper (#F7F4ED) instead of the default white-or-dark SaaS
ground. Newsreader is the only display voice. Every entry owns exactly one
accent, and that accent appears only on a thing you can act on. Rules are
hairlines in a single weight, never boxes. No gradients, glass, glow, or hero
device render. The old Google Sites template is the explicit anti-reference.

STORY — Studio line, then three plates in fixed order, then a page per app that
reads as a field entry: what it is, what it looks like, what it does, where to
get it, and the true limits (platform, affiliation, ads).

FIRST VIEWPORT — One honest sentence about what the studio makes, set in the
serif, with the first specimen already beginning below it. No full-bleed splash,
no scroll cue, no promise the apps do not keep.

FORM — Platform tags sit in the margin because iOS/Android is information the
reader needs before clicking. Ratings print only where a real fetched number
exists; nothing is invented, and small counts are shown as-is.

FINISH — unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance
-->`;

export function DirectionContract() {
  return <div hidden aria-hidden="true" dangerouslySetInnerHTML={{ __html: CONTRACT }} />;
}
