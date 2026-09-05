import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead, Colophon } from "@/components/Chrome";
import { Screen, StoreAction, PlatformTags, Ratings } from "@/components/Specimen";
import { JsonLd } from "@/components/JsonLd";
import { organization, softwareApplication } from "@/lib/schema";
import { APPS, RATINGS_FETCHED_AT, bySlug } from "@/data/apps";
import { asset } from "@/lib/site";

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
  return {
    title: app.name,
    description: app.lede,
    alternates: { canonical: `/${app.slug}/` },
    openGraph: {
      type: "website",
      title: app.name,
      description: app.lede,
      url: `/${app.slug}/`,
      images: [{ url: asset(app.icon) }],
    },
    twitter: { card: "summary", title: app.name, description: app.lede },
  };
}

export default async function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = bySlug(slug);
  if (!app) notFound();

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={softwareApplication(app)} />
      <Masthead current={app.slug} />
      <main className="mx-auto max-w-[var(--measure-page)] px-6 sm:px-8">
        {/* Entry head */}
        <header className="settle border-b border-rule pt-12 pb-10 sm:pt-16 sm:pb-14">
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
          <p className="mt-4 max-w-[var(--measure-read)] text-[1.0625rem] leading-relaxed text-ink-soft">
            {app.lede}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            {app.stores.map((s) => (
              <StoreAction key={s.kind} store={s} accent={app.accent} />
            ))}
          </div>
          <div className="mt-5">
            <Ratings app={app} />
            {(app.ratings.ios || app.ratings.android) && (
              <p className="mt-1 text-[0.75rem] text-slate">
                Store ratings, read {RATINGS_FETCHED_AT}.
              </p>
            )}
          </div>
        </header>

        {/* Plates */}
        <section aria-label="Screens" className="border-b border-rule py-12 sm:py-16">
          <div className="flex flex-wrap gap-6 sm:gap-8">
            {app.shots.map((src, i) => (
              <div key={src} className="w-[11rem] shrink-0 sm:w-[13.5rem]">
                <Screen src={src} alt={`${app.name}, screen ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>

        {/* Body */}
        <section className="border-b border-rule py-12 sm:py-16">
          <div className="max-w-[var(--measure-read)] space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft">
            {app.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        {/* Capability lists — the field-guide index of the specimen */}
        <section className="border-b border-rule py-12 sm:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {app.groups.map((g) => (
              <div key={g.title}>
                <h2 className="font-display text-[1.125rem] leading-snug text-ink">{g.title}</h2>
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

        {/* The true limits. A field guide records them; marketing hides them. */}
        {app.notes && (
          <section className="border-b border-rule py-12 sm:py-16">
            <h2 className="font-display text-[1.125rem] text-ink">Good to know</h2>
            <ul className="mt-4 max-w-[var(--measure-read)] space-y-2 text-[0.9375rem] leading-relaxed text-ink-soft">
              {app.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label="Other apps" className="py-12 sm:py-16">
          <h2 className="font-display text-[1.125rem] text-ink">Also from the studio</h2>
          <ul className="mt-4 space-y-2">
            {APPS.filter((a) => a.slug !== app.slug).map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/${a.slug}/`}
                  className="text-[0.9375rem] text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {a.name}
                </Link>
                <span className="text-slate"> — {a.line}</span>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <Colophon />
    </>
  );
}
