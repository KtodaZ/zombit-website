import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead, Colophon, Crumbs } from "@/components/Chrome";
import { AppCard, PostDates } from "@/components/Blog";
import { JsonLd } from "@/components/JsonLd";
import { Faqs } from "@/components/Faqs";
import { organization, blogPosting, faqPage, breadcrumbs } from "@/lib/schema";
import { allPosts, longDate, ogImage, postBySlug, postPath } from "@/lib/blog";
import { bySlug } from "@/data/apps";
import { SITE_ROOT } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;

/**
 * A static export cannot have a dynamic route with no params, so a build with no publishable
 * posts emits one placeholder path that renders a 404 page, kept out of every index.
 */
const NO_POSTS = "_none";

export function generateStaticParams() {
  const posts = allPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: NO_POSTS }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { robots: { index: false, follow: false } };
  const meta = pageMeta({
    title: post.title,
    description: post.description,
    path: postPath(post),
    og: ogImage(post),
    noindex: post.draft,
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ["Zombit Studios LLC"],
    },
    alternates: { ...meta.alternates, types: { "application/rss+xml": "/blog/rss.xml" } },
  };
}

const sectionTitle = "font-display text-[1.375rem] leading-snug text-ink";
const textLink = "text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();
  const app = post.app ? bySlug(post.app) : undefined;
  const url = `${SITE_ROOT}${postPath(post)}`;
  const trail: [string, string][] = [
    ["Zombit Studios", "/"],
    ["Blog", "/blog/"],
    [post.title, postPath(post)],
  ];
  const others = allPosts().filter((p) => p.slug !== post.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={blogPosting({ ...post, image: ogImage(post) })} />
      {post.faq.length > 0 && <JsonLd data={faqPage(url, post.faq)} />}
      <JsonLd data={breadcrumbs(trail.slice(1))} />
      <Masthead current="blog" />
      <main id="main" className="mx-auto max-w-[var(--measure-page)] px-6 sm:px-8">
        <article>
          <header className="border-b border-rule pt-10 pb-10 sm:pt-14 sm:pb-12">
            <Crumbs trail={trail} />
            {post.draft && (
              <p className="mt-6 inline-block border border-rule-soft px-1.5 py-0.5 text-[0.6875rem] uppercase tracking-[0.11em] text-slate">
                Draft, not published
              </p>
            )}
            <h1 className="mt-6 max-w-[var(--measure-doc)] font-display text-[2rem] leading-[1.14] tracking-[-0.015em] text-ink sm:text-[2.5rem]">
              {post.title}
            </h1>
            <PostDates post={post} />
          </header>

          <div
            className="post max-w-[var(--measure-doc)] border-b border-rule py-10 sm:py-12"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {post.faq.length > 0 && (
            <section aria-labelledby="questions" className="border-b border-rule py-12 sm:py-16">
              <h2 id="questions" className={sectionTitle}>
                Questions
              </h2>
              <Faqs faq={post.faq} />
            </section>
          )}

          {post.sources.length > 0 && (
            <section aria-labelledby="sources" className="border-b border-rule py-12 sm:py-16">
              <h2 id="sources" className={sectionTitle}>
                Sources
              </h2>
              <ol className="mt-5 max-w-[var(--measure-doc)] list-decimal space-y-2 pl-5 text-[0.9375rem] leading-relaxed text-ink-soft marker:text-slate">
                {post.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} rel="noopener" className={`${textLink} [overflow-wrap:anywhere]`}>
                      {s.title}
                    </a>
                    {s.accessed && <span className="text-slate"> · accessed {longDate(s.accessed)}</span>}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </article>

        {app && <AppCard app={app} />}

        {others.length > 0 && (
          <nav aria-labelledby="more" className="py-12 sm:py-16">
            <h2 id="more" className="font-display text-[1.125rem] text-ink">
              More from the blog
            </h2>
            <ul className="mt-4 space-y-2">
              {others.map((p) => (
                <li key={p.slug} className="text-[0.9375rem]">
                  <Link href={postPath(p)} className={textLink}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </main>
      <Colophon app={app} />
    </>
  );
}
