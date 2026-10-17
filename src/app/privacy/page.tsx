import type { Metadata } from "next";
import Link from "next/link";
import { Masthead, Colophon, Crumbs } from "@/components/Chrome";
import { JsonLd } from "@/components/JsonLd";
import { organization, breadcrumbs, webPage } from "@/lib/schema";
import { APPS, SITE, privacyPath } from "@/data/apps";
import { pageMeta } from "@/lib/meta";

/**
 * Privacy for zombit.io itself, not the apps. Describes exactly what src/components/Analytics.tsx
 * loads; change the two together.
 */
const PATH = "/privacy/";
const TITLE = "Website privacy";
const EFFECTIVE = "October 17, 2026";
const DESCRIPTION = `How zombit.io uses Google Analytics for aggregate visit statistics, what it collects, and how to opt out. Each app has its own privacy policy.`;

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const link = "text-ink underline decoration-rule underline-offset-4 hover:decoration-ink";

export default function SitePrivacyPage() {
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

        <article className="policy max-w-[var(--measure-doc)] py-10 sm:py-14">
          <h2 id="short-version">The short version</h2>
          <p>
            This page covers the zombit.io website, run by {SITE.legalName} (“we”). Each app has its
            own privacy policy:{" "}
            {APPS.map((a, i) => (
              <span key={a.slug}>
                {i > 0 && (i === APPS.length - 1 ? ", and " : ", ")}
                <Link className={link} href={privacyPath(a)}>
                  {a.shortName}
                </Link>
              </span>
            ))}
            .
          </p>
          <ul>
            <li>
              We use Google Analytics to count visits, see which pages people read, and see how often
              they follow a link to the App Store or Google Play. We look at these numbers in aggregate.
            </li>
            <li>The site has no accounts or forms, and we do not try to identify individual visitors.</li>
            <li>
              Google Analytics sets first-party cookies. Google signals and ad-personalisation signals
              are off, so visits are not used for advertising.
            </li>
            <li>
              To opt out, use Google’s opt-out browser add-on or block analytics scripts or cookies. The
              site works the same either way.
            </li>
            <li>GitHub Pages hosts the site and logs visitors’ IP addresses for security.</li>
            <li>
              Questions:{" "}
              <a className={link} href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </li>
          </ul>
          <p>The details are below.</p>

          <h2 id="analytics">Google Analytics</h2>
          <p>
            We use Google Analytics to see how many people visit this site, which pages they read, and
            how often they follow a link to the App Store or Google Play. We look at these numbers in
            aggregate. The site has no accounts or forms, and we do not try to identify individual
            visitors.
          </p>
          <p>When you visit, Google Analytics collects, in general terms:</p>
          <ul>
            <li>the pages you view and how you arrived, such as a search engine, an AI assistant, or another site;</li>
            <li>your device type, browser, operating system, screen size, and language;</li>
            <li>an approximate location, such as country or city, worked out from your IP address;</li>
            <li>clicks on App Store and Google Play buttons, recorded with the app and the store only.</li>
          </ul>
          <p>
            To tell one visit from the next, it sets first-party cookies on zombit.io. We have turned
            off Google signals and ad-personalisation signals for this site, so these visits are not
            used for advertising.
          </p>
          <p>
            Google processes this data under its own terms. See{" "}
            <a className={link} href="https://policies.google.com/technologies/partner-sites" rel="noopener">
              how Google uses information from sites that use its services
            </a>{" "}
            and the{" "}
            <a className={link} href="https://policies.google.com/privacy" rel="noopener">
              Google Privacy Policy
            </a>
            .
          </p>

          <h2 id="opt-out">Opting out</h2>
          <p>
            Install Google’s{" "}
            <a className={link} href="https://tools.google.com/dlpage/gaoptout" rel="noopener">
              Google Analytics opt-out browser add-on
            </a>
            , or block analytics scripts or cookies in your browser or with a content blocker. The site
            works the same either way.
          </p>

          <h2 id="hosting">Hosting</h2>
          <p>
            The site is hosted on GitHub Pages. GitHub logs visitors’ IP addresses for security
            purposes, as described in{" "}
            <a
              className={link}
              href="https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection"
              rel="noopener"
            >
              GitHub’s documentation
            </a>
            .
          </p>

          <h2 id="contact">Contact</h2>
          <p>
            Questions about this page:{" "}
            <a className={link} href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .
          </p>
        </article>
      </main>
      <Colophon />
    </>
  );
}
