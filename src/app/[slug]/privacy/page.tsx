import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead, Colophon, Crumbs } from "@/components/Chrome";
import { JsonLd } from "@/components/JsonLd";
import { organization, breadcrumbs, webPage } from "@/lib/schema";
import { ALL_APPS, SITE, bySlug, privacyPath } from "@/data/apps";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_APPS.map((a) => ({ slug: a.slug }));
}

/**
 * The policy text lives in src/content/privacy/<slug>.html. The policies were ported from where
 * each was previously hosted and rewritten in plain language on 2026-10-17 (see ASSETS.md). Each
 * is a legal document: edit its wording only when the policy itself changes, and keep existing
 * heading ids, because apps deep-link to them.
 */
function policyHtml(slug: string) {
  return readFileSync(join(process.cwd(), "src/content/privacy", `${slug}.html`), "utf8");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = bySlug(slug);
  if (!app) return {};
  return pageMeta({
    title: `${app.name} privacy policy`,
    description: `How ${app.name} handles your information: what it collects, what it shares, and how to reach ${SITE.legalName} about privacy.`,
    path: privacyPath(app),
    og: `/og/${app.slug}.png`,
    noindex: Boolean(app.prerelease),
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = bySlug(slug);
  if (!app) notFound();
  const path = privacyPath(app);
  const html = policyHtml(app.slug);
  // Some policies open with their own effective date; printing ours too would say it twice.
  const statesDate = /^\s*<p><strong>Effective date:/.test(html);
  const trail: [string, string][] = [
    ["Zombit Studios", "/"],
    [app.name, `/${app.slug}/`],
    ["Privacy policy", path],
  ];

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={webPage(path, `${app.name} privacy policy`, `Privacy policy for ${app.name}.`, app.slug)} />
      <JsonLd data={breadcrumbs(trail.slice(1))} />
      <Masthead current={app.slug} />
      <main id="main" className="mx-auto max-w-[var(--measure-page)] px-6 sm:px-8">
        <header className="border-b border-rule pt-10 pb-10 sm:pt-14 sm:pb-12">
          <Crumbs trail={trail} />
          <h1 className="mt-6 max-w-[var(--measure-doc)] font-display text-[2rem] leading-[1.14] tracking-[-0.015em] text-ink sm:text-[2.5rem]">
            {app.name} privacy policy
          </h1>
          <p className="mt-4 text-[0.9375rem] text-ink-soft">
            {!statesDate && <>Effective {app.privacyEffective} · </>}
            Questions:{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              {SITE.email}
            </a>
          </p>
        </header>

        <article
          className="policy max-w-[var(--measure-doc)] py-10 sm:py-14"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <p className="border-t border-rule pt-8 text-[0.9375rem] text-ink-soft">
          <Link
            href={`/${app.slug}/`}
            className="text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            About {app.name}
          </Link>
          <span aria-hidden="true"> · </span>
          <Link
            href={app.prerelease ? "/support/" : `/support/#${app.slug}`}
            className="text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            Support
          </Link>
        </p>
      </main>
      <Colophon app={app} />
    </>
  );
}
