import type { Metadata } from "next";
import { Masthead, Colophon, Crumbs } from "@/components/Chrome";
import { PostList } from "@/components/Blog";
import { JsonLd } from "@/components/JsonLd";
import { organization, blog, breadcrumbs } from "@/lib/schema";
import { allPosts, indexedPosts } from "@/lib/blog";
import { SITE } from "@/data/apps";
import { pageMeta } from "@/lib/meta";

const PATH = "/blog/";
const TITLE = "Blog";
const DESCRIPTION = `Guides and plain comparisons from ${SITE.name}: calendar alarms, artillery calculators, visual timers, word puzzles, and home coffee roasting.`;

export function generateMetadata(): Metadata {
  const meta = pageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    // An empty blog is not worth indexing; it joins the index with its first published post.
    noindex: indexedPosts().length === 0,
  });
  return { ...meta, alternates: { ...meta.alternates, types: { "application/rss+xml": "/blog/rss.xml" } } };
}

export default function BlogIndex() {
  const posts = allPosts();
  const trail: [string, string][] = [
    ["Zombit Studios", "/"],
    ["Blog", PATH],
  ];
  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={blog(indexedPosts())} />
      <JsonLd data={breadcrumbs(trail.slice(1))} />
      <Masthead current="blog" />
      <main id="main" className="mx-auto max-w-[var(--measure-page)] px-6 sm:px-8">
        <header className="border-b border-rule pt-10 pb-10 sm:pt-14 sm:pb-12">
          <Crumbs trail={trail} />
          <h1 className="mt-6 font-display text-[2rem] leading-[1.14] tracking-[-0.015em] text-ink sm:text-[2.5rem]">
            Blog
          </h1>
          <p className="mt-4 max-w-[var(--measure-doc)] text-[1.0625rem] leading-relaxed text-ink-soft">
            Guides and plain comparisons for the problems our apps solve, written by the people who make
            them. Each one answers the question first and lists its sources.
          </p>
        </header>
        <section aria-label="Posts" className="py-10 sm:py-12">
          {posts.length ? (
            <PostList posts={posts} />
          ) : (
            <p className="text-[1rem] leading-relaxed text-ink-soft">No posts yet.</p>
          )}
        </section>
      </main>
      <Colophon />
    </>
  );
}
