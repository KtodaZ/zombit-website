import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Masthead, Colophon, Crumbs } from "@/components/Chrome";
import { JsonLd } from "@/components/JsonLd";
import { organization, breadcrumbs, webPage } from "@/lib/schema";
import { SITE } from "@/data/apps";
import { pageMeta } from "@/lib/meta";

/**
 * Terms of Use for the website, the apps, and the Always On Time assistant connector. The text
 * lives in src/content/terms.html. It is a legal document: change its wording only when the terms
 * change, keep heading ids, and update EFFECTIVE in the same change.
 */
const PATH = "/terms/";
const TITLE = "Terms of Use";
const EFFECTIVE = "TBD";
const DESCRIPTION = `The terms for using zombit.io and the ${SITE.legalName} apps, including the Always On Time assistant connector.`;

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const link = "text-ink underline decoration-rule underline-offset-4 hover:decoration-ink";

export default function TermsPage() {
  const html = readFileSync(join(process.cwd(), "src/content/terms.html"), "utf8");
  const trail: [string, string][] = [
    ["Zombit Studios", "/"],
    [TITLE, PATH],
  ];
  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={webPage(PATH, `${TITLE} — ${SITE.name}`, DESCRIPTION)} />
      <JsonLd data={breadcrumbs(trail.slice(1))} />
      <Masthead />
      <main id="main" className="mx-auto max-w-[var(--measure-page)] px-6 sm:px-8">
        <header className="border-b border-rule pt-10 pb-10 sm:pt-14 sm:pb-12">
          <Crumbs trail={trail} />
          <h1 className="mt-6 max-w-[var(--measure-doc)] font-display text-[2rem] leading-[1.14] tracking-[-0.015em] text-ink sm:text-[2.5rem]">
            {TITLE}
          </h1>
          <p className="mt-4 text-[0.9375rem] text-ink-soft">
            Effective {EFFECTIVE} · Questions:{" "}
            <a href={`mailto:${SITE.email}`} className={link}>
              {SITE.email}
            </a>
          </p>
        </header>
        <article
          className="policy max-w-[var(--measure-doc)] py-10 sm:py-14"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
      <Colophon />
    </>
  );
}
