import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead, Colophon } from "@/components/Chrome";
import {
  Screen,
  StoreAction,
  PlatformTags,
  Ratings,
  StoreFacts,
  hasRatings,
} from "@/components/Specimen";
import { JsonLd } from "@/components/JsonLd";
import { Faqs } from "@/components/Faqs";
import {
  organization,
  mobileApplication,
  faqPage,
  breadcrumbs,
} from "@/lib/schema";
import {
  APPS,
  RATINGS_FETCHED_AT,
  SITE,
  bySlug,
  privacyPath,
} from "@/data/apps";
import { ASSISTANTS_LIVE } from "@/data/flags";
import { SITE_ROOT, asset } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return APPS.map((a) => ({ slug: a.slug }));
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
    title: `${app.name}: ${app.descriptor}`,
    description: app.lede,
    path: `/${app.slug}/`,
    og: `/og/${app.slug}.png`,
    ogAlt: `${app.name}, ${app.descriptor.toLowerCase()}`,
  });
}

const sectionRule = "border-b border-rule py-12 sm:py-16";
const sectionTitle = "font-display text-[1.375rem] leading-snug text-ink";
const textLink =
  "text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink";

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = bySlug(slug);
  if (!app) notFound();
  const url = `${SITE_ROOT}/${app.slug}/`;
  const single = app.shots.length === 1;

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={mobileApplication(app)} />
      <JsonLd data={faqPage(url, app.faq)} />
      <JsonLd data={breadcrumbs([[app.name, `/${app.slug}/`]])} />
      <Masthead current={app.slug} />
      <main
        id="main"
        className="mx-auto max-w-[var(--measure-page)] px-6 sm:px-8"
      >
        {/* Entry head. An app with a single screen carries it here, beside the copy, instead of
            alone in a row built for three. */}
        <header
          className={`settle grid grid-cols-1 gap-10 border-b border-rule pt-12 pb-10 sm:pt-16 sm:pb-14 ${
            single ? "md:grid-cols-[1fr_auto] md:gap-14" : ""
          }`}
        >
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={asset(app.icon)}
                alt=""
                width={52}
                height={52}
                priority
                className="rounded-[12px] ring-1 ring-black/8"
              />
              <PlatformTags app={app} />
            </div>
            <h1 className="mt-6 max-w-[var(--measure-read)] font-display text-[2rem] leading-[1.14] tracking-[-0.015em] text-ink sm:text-[2.875rem]">
              {app.name}
            </h1>
            <p className="mt-1.5 font-display text-[1.1875rem] italic leading-snug text-ink-soft sm:text-[1.3125rem]">
              {app.descriptor}
            </p>
            <p className="mt-5 max-w-[var(--measure-read)] text-[1.0625rem] leading-relaxed text-ink-soft">
              {app.lede}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              {app.stores.map((s) => (
                <StoreAction key={s.kind} store={s} accent={app.accent} />
              ))}
              {app.website && (
                <a
                  href={app.website.url}
                  rel="noopener"
                  className={`text-[0.875rem] ${textLink}`}
                >
                  {app.website.label}
                </a>
              )}
            </div>
            {hasRatings(app) && (
              <div className="mt-5">
                <Ratings app={app} />
                <p className="mt-1 text-[0.75rem] text-slate">
                  Store ratings, read {RATINGS_FETCHED_AT}.
                </p>
              </div>
            )}
          </div>
          {single && (
            <div className="w-[12rem] sm:w-[14rem]">
              <Screen
                src={app.shots[0]}
                alt={app.shotAlts[0] ?? `${app.name} screen`}
                priority
              />
            </div>
          )}
        </header>

        {/* Plates. On phones they sit in one row that scrolls sideways, rather than a tall stack. */}
        {!single && (
          <section aria-label="Screens" className={sectionRule}>
            <div
              tabIndex={0}
              aria-label={`${app.name} screens`}
              className="-mx-6 flex snap-x snap-mandatory scroll-px-6 items-start gap-5 overflow-x-auto px-6 pb-3 sm:mx-0 sm:flex-wrap sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0"
            >
              {app.shots.map((src, i) => (
                <div
                  key={src}
                  className="w-[12.5rem] shrink-0 snap-start sm:w-[13.5rem]"
                >
                  <Screen
                    src={src}
                    alt={app.shotAlts[i] ?? `${app.name}, screen ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Body */}
        <section aria-label="About the app" className={sectionRule}>
          <div className="max-w-[var(--measure-read)] space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft">
            {app.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        {/* Capability lists — the field-guide index of the specimen */}
        <section aria-labelledby="what-it-does" className={sectionRule}>
          <h2 id="what-it-does" className="sr-only">
            What it does
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {app.groups.map((g) => (
              <div key={g.title}>
                <h3 className="font-display text-[1.125rem] leading-snug text-ink">
                  {g.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="border-t border-rule-soft pt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Questions, answered from the listing. Visible, because FAQPage markup must be. */}
        <section aria-labelledby="questions" className={sectionRule}>
          <h2 id="questions" className={sectionTitle}>
            Questions
          </h2>
          <Faqs faq={app.faq} />
        </section>

        {/* Where to get it, and the true limits. A field guide records them; marketing hides them. */}
        <section aria-labelledby="where" className={sectionRule}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,var(--measure-read))_1fr] lg:gap-16">
            <div>
              <h2 id="where" className={sectionTitle}>
                Where to get it
              </h2>
              <div className="mt-5">
                <StoreFacts app={app} />
              </div>
            </div>
            {app.notes && (
              <div>
                <h2 className={sectionTitle}>Good to know</h2>
                <ul className="mt-5 space-y-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {app.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="help" className={sectionRule}>
          <h2 id="help" className={sectionTitle}>
            Help and privacy
          </h2>
          <ul className="mt-5 max-w-[var(--measure-read)] space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
            <li>
              <Link href={`/support/#${app.slug}`} className={textLink}>
                {app.shortName} support
              </Link>{" "}
              — or email{" "}
              <a href={`mailto:${SITE.email}`} className={textLink}>
                {SITE.email}
              </a>
              .
            </li>
            {app.support?.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener" className={textLink}>
                  {s.label}
                </a>
              </li>
            ))}
            {app.slug === "always-on-time" && ASSISTANTS_LIVE && (
              <li>
                <Link href="/always-on-time/assistants/" className={textLink}>
                  Connect Claude or ChatGPT to Always On Time
                </Link>
              </li>
            )}
            <li>
              <Link href={privacyPath(app)} className={textLink}>
                {app.shortName} privacy policy
              </Link>
            </li>
          </ul>
        </section>

        <nav aria-labelledby="also" className="py-12 sm:py-16">
          <h2 id="also" className="font-display text-[1.125rem] text-ink">
            Also from the studio
          </h2>
          <ul className="mt-4 space-y-2">
            {APPS.filter((a) => a.slug !== app.slug).map((a) => (
              <li key={a.slug} className="text-[0.9375rem]">
                <Link href={`/${a.slug}/`} className={textLink}>
                  {a.name}
                </Link>
                <span className="text-slate"> — {a.line}</span>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <Colophon app={app} />
    </>
  );
}
