import Link from "next/link";
import Image from "next/image";
import { APPS, SITE, privacyPath, type AppEntry } from "@/data/apps";
import { asset } from "@/lib/site";
import { hasBlog } from "@/lib/blog";

const quietLink =
  "text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink";

/** The masthead. Small, set once, never competing with an entry. */
export function Masthead({ current }: { current?: string }) {
  return (
    <header className="border-b border-rule-soft">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:bg-paper focus:px-3 focus:py-2 focus:text-[0.875rem]"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-[var(--measure-page)] items-baseline gap-x-6 gap-y-2 px-6 py-4 sm:flex-wrap sm:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 no-underline"
          aria-label={`${SITE.name}, home`}
        >
          <Image
            src={asset("/icons/zombit-mark.webp")}
            alt=""
            width={20}
            height={20}
            className="translate-y-[3px] rounded-[5px] opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="font-display text-[1.0625rem] tracking-tight text-ink">{SITE.name}</span>
        </Link>
        <nav aria-label="Apps and support" className="ml-auto">
          <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[0.8125rem]">
            {/* Phones get Apps, Blog, and Support instead of every app wrapped across three lines; the home page lists every app. */}
            <li className="sm:hidden">
              <Link href="/#apps" className="text-slate no-underline transition-colors hover:text-ink">
                Apps
              </Link>
            </li>
            {[
              ...APPS.map((a) => [a.slug, a.shortName] as const),
              ...(hasBlog() ? [["blog", "Blog"] as const] : []),
              ["support", "Support"] as const,
            ].map(
              ([slug, label]) => (
                <li key={slug} className={slug === "support" || slug === "blog" ? undefined : "hidden sm:list-item"}>
                  <Link
                    href={`/${slug}/`}
                    aria-current={current === slug ? "page" : undefined}
                    className={
                      current === slug
                        ? "text-ink no-underline"
                        : "text-slate no-underline transition-colors hover:text-ink"
                    }
                  >
                    {label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

/**
 * The colophon. Where the studio, not the app, gets to speak. On an app's pages it leads with
 * that app's privacy policy; everywhere else it lists all of them.
 */
export function Colophon({ app }: { app?: AppEntry }) {
  return (
    <footer className="mt-24 border-t border-rule-soft">
      <div className="mx-auto max-w-[var(--measure-page)] px-6 py-10 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[minmax(0,26rem)_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src={asset("/icons/zombit-mark.webp")}
                alt=""
                width={22}
                height={22}
                className="rounded-[6px] opacity-85"
              />
              <span className="font-display text-base text-ink">{SITE.legalName}</span>
            </div>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">{SITE.tagline}</p>
          </div>

          <div className="text-[0.8125rem] leading-relaxed">
            <h2 className="font-display text-[0.9375rem] text-ink">Help</h2>
            <ul className="mt-2 space-y-1.5">
              <li>
                <Link className={quietLink} href="/support/">
                  Support
                </Link>
              </li>
              <li>
                <a className={quietLink} href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              {hasBlog() && (
                <li>
                  <Link className={quietLink} href="/blog/">
                    Blog
                  </Link>
                </li>
              )}
              <li>
                <Link className={quietLink} href="/terms/">
                  Terms of use
                </Link>
              </li>
              {app?.support?.map((s) => (
                <li key={s.url}>
                  <a className={quietLink} href={s.url} rel="noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-[0.8125rem] leading-relaxed">
            <h2 className="font-display text-[0.9375rem] text-ink">Privacy</h2>
            <ul className="mt-2 space-y-1.5">
              {app ? (
                <li>
                  <Link className={quietLink} href={privacyPath(app)}>
                    {app.shortName} privacy policy
                  </Link>
                </li>
              ) : (
                APPS.map((a) => (
                  <li key={a.slug}>
                    <Link className={quietLink} href={privacyPath(a)}>
                      {a.shortName}
                    </Link>
                  </li>
                ))
              )}
              <li>
                <Link className={quietLink} href="/privacy/">
                  This website
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 max-w-[var(--measure-read)] text-[0.75rem] leading-relaxed text-slate">
          © {new Date().getFullYear()} {SITE.legalName}. Hell Let Loose and WARDOGS are trademarks of
          their respective owners; Artillery Let Loose is an unofficial companion app, not affiliated
          with or endorsed by Black Matter Pty Ltd, Team17 Digital Limited, or Bulkhead Limited.
        </p>
      </div>
    </footer>
  );
}

/** A visible breadcrumb trail for document pages, matching their BreadcrumbList JSON-LD. */
export function Crumbs({ trail }: { trail: [string, string][] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-slate">
      <ol className="flex flex-wrap items-baseline gap-x-2">
        {trail.map(([name, href], i) => (
          <li key={href} className="flex items-baseline gap-x-2">
            {i < trail.length - 1 ? (
              <>
                <Link href={href} className="text-slate underline decoration-rule underline-offset-4 hover:text-ink">
                  {name}
                </Link>
                <span aria-hidden="true">/</span>
              </>
            ) : (
              <span aria-current="page" className="text-ink-soft">
                {name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
