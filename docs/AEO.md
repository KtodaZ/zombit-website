# Search and answer-engine optimisation

What the site does so search engines and AI assistants (ChatGPT search, Claude, Perplexity, Google
AI Overviews, Bing Copilot) can find, read, and quote it accurately, and what is left to do after
the DNS cutover.

## The principle

Answer engines quote pages they can fetch, parse, and trust. Everything here follows from three
rules: every fact is visible static HTML, every fact comes from a store listing or a policy, and
structured data repeats what the page already says rather than adding to it.

## What is in place

**Static HTML.** `output: 'export'` renders every page at build time. Crawlers that do not run
JavaScript (most AI fetchers) get the full text, FAQs, and policies.

**Structured data** (`src/lib/schema.ts`), one JSON-LD block per node:

| Page | Nodes |
| --- | --- |
| Home | Organization, WebSite, ItemList of the five apps |
| App pages | Organization, MobileApplication, FAQPage, BreadcrumbList |
| Privacy pages | Organization, WebPage (about the app), BreadcrumbList |
| Support | Organization (with ContactPoint), WebPage, BreadcrumbList |
| Assistants help | Organization, WebPage, FAQPage, BreadcrumbList |

- One Organization `@id` (`/#organization`); everything else points at it. `sameAs` lists the
  Google Play and App Store developer pages.
- MobileApplication carries `alternateName` (the store titles where they differ from the app's
  name), one Offer per store with the real US price, `privacyPolicy`, and `aggregateRating` only
  from `ratings.json`, using a single store's figure (the store with the most ratings), never a blend.
- FAQPage only on pages where the same questions are rendered visibly.

**Visible FAQs.** Each app page has a "Questions" section written as the questions people type
or ask ("Is there an Android app that turns Google Calendar events into real alarms?"), answered
only with listing or policy facts. No superlatives, no comparisons to named competitors.

**Metadata** (`src/lib/meta.ts`). Every page gets a descriptive title ("Word Garden: Daily
spelling bee word puzzle"), a description, a canonical URL, Open Graph and Twitter tags, and a
1200×630 card (`public/og/`, rendered by `scripts/og-images.mjs`).

**robots.txt** (`src/app/robots.ts`). On the apex build it names and allows the major search and
AI crawlers (Googlebot, Google-Extended, Bingbot, Applebot, Applebot-Extended, DuckDuckBot,
GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot,
Perplexity-User), then allows everyone else, and points to the sitemap. The Pages preview stays
`Disallow: /` with `noindex`.

**Sitemap** (`src/app/sitemap.ts`). Home, five app pages (with image entries), support, website privacy,
Terms of Use, and five app privacy pages, each with a `lastmod` from `LASTMOD` in `src/data/flags.ts` rather than the build
time. Bump the relevant date when content actually changes. The assistants page joins the sitemap
when `ASSISTANTS_LIVE` is flipped.

**llms.txt and llms-full.txt** (`src/lib/llms.ts`). A plain-text map of the studio, apps, stores,
prices, and policies, and a full-text version of every app page. They are generated from the same
content model, so they cannot drift. llms.txt is a proposal, not a standard: no major engine has
said it uses it, so treat it as cheap insurance rather than a ranking lever.

**IndexNow key.** `public/38be00c7f16837337e9d5743de5aa8b7.txt` holds the key that lets the site
notify Bing, Yandex, and other IndexNow engines of changed URLs.

## After the cutover

Do these once zombit.io serves this site (see TODO.md §1).

1. **Google Search Console.** Add a Domain property for `zombit.io` (DNS TXT verification in
   Squarespace), then submit `https://zombit.io/sitemap.xml`. Use URL Inspection on the home page
   and one app page to request indexing.
2. **Bing Webmaster Tools.** Sign in and choose *Import from Google Search Console*; it brings the
   property and sitemap across. Bing's index also feeds ChatGPT search and Copilot.
3. **IndexNow ping.** Tell IndexNow engines every URL exists:

   ```sh
   curl -s -X POST https://api.indexnow.org/indexnow \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d "{\"host\":\"zombit.io\",\"key\":\"38be00c7f16837337e9d5743de5aa8b7\",
          \"keyLocation\":\"https://zombit.io/38be00c7f16837337e9d5743de5aa8b7.txt\",
          \"urlList\":$(curl -s https://zombit.io/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' | python3 -c 'import json,sys;print(json.dumps([l.strip() for l in sys.stdin]))')}"
   ```

   A `200` or `202` means accepted. Repeat with just the changed URLs after future content
   changes.
4. **Validate.** Run one app page through <https://search.google.com/test/rich-results> and
   <https://validator.schema.org> to confirm the MobileApplication and FAQPage nodes parse.
5. **Store listings.** Point each app's "Developer website" and privacy policy URL at its
   zombit.io page and `/<slug>/privacy/`, so the stores and the site link to each other.
