import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { load } from "js-yaml";
import { Marked, type Tokens } from "marked";
import { bySlug } from "@/data/apps";
import { BASE_PATH } from "@/lib/site";
import { INK, onAccent } from "@/lib/accent";

/**
 * Blog posts: one Markdown file per post in src/content/blog/, YAML frontmatter on top. Read at
 * build time only; the export ships plain HTML.
 *
 * Drafts (`draft: true`) show up in `next dev` and nowhere else: they are left out of the
 * production build's pages, index, feed, sitemap, and llms.txt. `BLOG_DRAFTS=1 npm run build`
 * includes them for a local preview build; never set it in the deploy workflow.
 */
export type Post = {
  title: string;
  description: string;
  slug: string;
  /** ISO dates, YYYY-MM-DD. */
  date: string;
  updated: string;
  app?: string;
  kind: "guide" | "comparison";
  faq: { q: string; a: string }[];
  sources: { title: string; url: string; accessed?: string }[];
  draft: boolean;
  /** Rendered body HTML. */
  html: string;
};

const DIR = join(process.cwd(), "src/content/blog");
const SHOW_DRAFTS = process.env.NODE_ENV !== "production" || process.env.BLOG_DRAFTS === "1";
const ISO = /^\d{4}-\d{2}-\d{2}$/;

/** Headings get stable ids so sections can be linked and quoted. */
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const STORE_HOSTS: [RegExp, "ios" | "android", string][] = [
  [/^https:\/\/apps\.apple\.com\//, "ios", "App Store"],
  [/^https:\/\/play\.google\.com\//, "android", "Google Play"],
];
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * A post can open with one "pick" callout: a blockquote whose first line is `**Our pick: Name**`.
 * It renders as a tinted inset (the design's one sanctioned inset) with the app name set as a
 * title, the body as written, and a last line of links turned into actions: store links become
 * accent pills (the Accent Means Act rule), other links stay text links. Any other blockquote
 * renders as a plain quote.
 */
function renderer(app?: string) {
  const md = new Marked({ gfm: true });
  const accent = (app && bySlug(app)?.accent) || INK;
  md.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        // The title is the page's only h1; a stray "#" in a post is demoted.
        const level = Math.max(depth, 2);
        return `<h${level} id="${slugify(text)}">${text}</h${level}>\n`;
      },
      blockquote({ tokens }) {
        const body = tokens.filter((t) => t.type !== "space");
        const head = body[0];
        const title = head?.type === "paragraph" && /^\*\*Our pick:\s*(.+?)\*\*$/.exec(head.raw.trim());
        if (!title) return false;
        const last = body[body.length - 1] as Tokens.Paragraph;
        const isActions =
          body.length > 2 &&
          last.type === "paragraph" &&
          last.tokens.some((t) => t.type === "link") &&
          last.tokens.every((t) => t.type === "link" || (t.type === "text" && /^[\s·]*$/.test(t.raw)));
        const middle = body.slice(1, isActions ? -1 : undefined);
        const actions = isActions
          ? last.tokens
              .filter((t): t is Tokens.Link => t.type === "link")
              .map((l) => {
                const text = this.parser.parseInline(l.tokens);
                const store = STORE_HOSTS.find(([re]) => re.test(l.href));
                if (!store) return `<a href="${esc(l.href)}">${text}</a>`;
                const [, kind, name] = store;
                return (
                  `<a href="${esc(l.href)}" class="callout-store" data-store="${kind}" data-app="${esc(app ?? "")}" ` +
                  `data-placement="blog-pick" style="background-color:${accent};color:${onAccent(accent)}">` +
                  `${text}<span class="sr-only"> (opens ${name})</span></a>`
                );
              })
          : [];
        return (
          `<aside class="callout" aria-label="Our pick">\n` +
          `<p class="callout-label">Our pick</p>\n` +
          `<p class="callout-name">${this.parser.parseInline(md.Lexer.lexInline(title[1]))}</p>\n` +
          this.parser.parse(middle) +
          (actions.length ? `<p class="callout-actions">${actions.join("\n")}</p>\n` : "") +
          `</aside>\n`
        );
      },
    },
  });
  return md;
}

/**
 * External links get rel="noopener"; site links get the base path (raw HTML bypasses next/link);
 * wide tables scroll sideways on phones instead of squeezing the page. A table row whose first
 * cell is wholly bold is our app's row and gets a tint.
 */
const finish = (html: string) =>
  html
    .replace(/<a href="\/(?!\/)/g, `<a href="${BASE_PATH}/`)
    .replace(/<a href="(https?:\/\/(?!zombit\.io)[^"]*)"/g, '<a rel="noopener" href="$1"')
    .replace(/<table>/g, '<div class="table-wrap" tabindex="0"><table>')
    .replace(/<\/table>/g, "</table></div>")
    .replace(/<tr>(\s*<td>)<strong>([^<]*)<\/strong>(<\/td>)/g, '<tr class="pick">$1<strong>$2</strong>$3');

function parse(file: string): Post {
  const raw = readFileSync(join(DIR, file), "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const fm = (load(m[1]) ?? {}) as Record<string, unknown>;
  const str = (k: string) => (typeof fm[k] === "string" ? (fm[k] as string).trim() : "");
  const slug = str("slug") || file.replace(/\.md$/, "");
  const post: Post = {
    title: str("title"),
    description: str("description"),
    slug,
    date: str("date"),
    updated: str("updated") || str("date"),
    app: str("app") || undefined,
    kind: str("kind") === "comparison" ? "comparison" : "guide",
    faq: Array.isArray(fm.faq) ? (fm.faq as Post["faq"]) : [],
    sources: Array.isArray(fm.sources) ? (fm.sources as Post["sources"]) : [],
    draft: fm.draft === true,
    html: finish(renderer(str("app") || undefined).parse(m[2], { async: false }) as string),
  };
  // Fail the build on a malformed post rather than ship a page with holes in its metadata.
  const problems = [
    !post.title && "title",
    !post.description && "description",
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && "slug (kebab-case)",
    !ISO.test(post.date) && "date (YYYY-MM-DD)",
    !ISO.test(post.updated) && "updated (YYYY-MM-DD)",
    post.app && !bySlug(post.app) && `app (no app "${post.app}")`,
    post.faq.some((f) => !f?.q || !f?.a) && "faq (each needs q and a)",
    post.sources.some((s) => !s?.title || !/^https?:\/\//.test(s?.url ?? "")) && "sources (each needs title and url)",
  ].filter(Boolean);
  if (problems.length) throw new Error(`${file}: bad frontmatter: ${problems.join(", ")}`);
  return post;
}

let cache: Post[] | undefined;

/** Every post this build should publish, newest first. */
export function allPosts(): Post[] {
  if (!cache) {
    let files: string[] = [];
    try {
      files = readdirSync(DIR).filter((f) => f.endsWith(".md"));
    } catch {}
    const posts = files.map(parse).filter((p) => SHOW_DRAFTS || !p.draft);
    const seen = new Set<string>();
    for (const p of posts) {
      if (seen.has(p.slug)) throw new Error(`duplicate blog slug "${p.slug}"`);
      seen.add(p.slug);
    }
    cache = posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  }
  return cache;
}

export const postBySlug = (slug: string) => allPosts().find((p) => p.slug === slug);
export const postsForApp = (app: string) => allPosts().filter((p) => p.app === app);
/** Indexable posts: what the sitemap, feed, and llms.txt list. Drafts only exist in dev builds. */
export const indexedPosts = () => allPosts().filter((p) => !p.draft);
/** The blog link appears in navigation only once this build has a post to show. */
export const hasBlog = () => allPosts().length > 0;
export const postPath = (p: Pick<Post, "slug">) => `/blog/${p.slug}/`;

/** "October 17, 2026", from an ISO date, without a timezone shifting the day. */
export function longDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Social card: a post's own `public/og/blog/<slug>.png` if scripts/og-images.mjs has rendered
 * one, else its app's card, else the studio card.
 */
export function ogImage(p: Pick<Post, "slug" | "app">) {
  const own = `/og/blog/${p.slug}.png`;
  if (existsSync(join(process.cwd(), "public", own))) return own;
  return p.app ? `/og/${p.app}.png` : "/og/home.png";
}
