import Image from "next/image";
import Link from "next/link";
import { PlatformTags, Ratings, StoreAction } from "@/components/Specimen";
import { longDate, postPath, type Post } from "@/lib/blog";
import type { AppEntry } from "@/data/apps";
import { asset } from "@/lib/site";

const textLink = "text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink";

export function PostDates({ post, className = "mt-4" }: { post: Post; className?: string }) {
  return (
    <p className={`${className} text-[0.8125rem] text-slate`}>
      {post.kind === "comparison" ? "Comparison" : "Guide"}
      <span aria-hidden="true"> · </span>
      <time dateTime={post.date}>{longDate(post.date)}</time>
      {post.updated !== post.date && (
        <>
          <span aria-hidden="true"> · </span>
          Updated <time dateTime={post.updated}>{longDate(post.updated)}</time>
        </>
      )}
    </p>
  );
}

/** The related app, set like a catalogue entry: rules above and below, never a box. */
export function AppCard({ app }: { app: AppEntry }) {
  return (
    <section aria-labelledby="app-card" className="border-b border-rule py-12 sm:py-16">
      <div className="max-w-[var(--measure-read)]">
        <div className="flex items-center gap-3">
          <Image src={asset(app.icon)} alt="" width={44} height={44} className="rounded-[10px] ring-1 ring-black/8" />
          <PlatformTags app={app} />
        </div>
        <h2 id="app-card" className="mt-5 font-display text-[1.75rem] leading-tight tracking-[-0.01em] text-ink">
          <Link href={`/${app.slug}/`} className="text-ink no-underline transition-colors hover:text-ink-soft">
            {app.name}
          </Link>
        </h2>
        <p className="mt-1 font-display text-[1.125rem] italic leading-snug text-ink-soft">{app.descriptor}</p>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{app.line}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          {app.stores.map((s) => (
            <StoreAction key={s.kind} store={s} accent={app.accent} app={app.slug} placement="blog-post" />
          ))}
          <Link href={`/${app.slug}/`} className={`text-[0.875rem] ${textLink}`}>
            About {app.shortName}
          </Link>
        </div>
        <div className="mt-5">
          <Ratings app={app} />
        </div>
      </div>
    </section>
  );
}

/** A list of posts: title, dates, and the description as the answer-first summary. */
export function PostList({ posts, headingLevel = 2 }: { posts: Post[]; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <ul className="max-w-[var(--measure-doc)]">
      {posts.map((p) => (
        <li key={p.slug} className="border-t border-rule-soft py-6 first:border-t-0 first:pt-0">
          <H className="font-display text-[1.375rem] leading-snug text-ink">
            <Link href={postPath(p)} className="text-ink no-underline transition-colors hover:text-ink-soft">
              {p.title}
            </Link>
            {p.draft && <span className="ml-2 align-middle text-[0.6875rem] uppercase tracking-[0.11em] text-slate">Draft</span>}
          </H>
          <PostDates post={p} className="mt-1.5" />
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{p.description}</p>
        </li>
      ))}
    </ul>
  );
}
