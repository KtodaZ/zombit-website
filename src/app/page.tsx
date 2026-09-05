import Link from "next/link";
import Image from "next/image";
import { Masthead, Colophon } from "@/components/Chrome";
import { Screen, StoreAction, PlatformTags, Ratings } from "@/components/Specimen";
import { JsonLd } from "@/components/JsonLd";
import { organization, website, catalogue } from "@/lib/schema";
import { APPS, SITE, type AppEntry } from "@/data/apps";
import { asset } from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
      <JsonLd data={catalogue} />
      <Masthead />
      <main className="mx-auto max-w-[var(--measure-page)] px-6 sm:px-8">
        <section className="settle border-b border-rule pt-16 pb-12 sm:pt-24 sm:pb-16">
          <h1 className="max-w-[var(--measure-read)] font-display text-[2.25rem] leading-[1.12] tracking-[-0.015em] text-ink sm:text-[3.25rem]">
            {SITE.tagline}
          </h1>
          <p className="mt-5 max-w-[var(--measure-read)] text-[1.0625rem] leading-relaxed text-ink-soft">
            {SITE.legalName} is a small independent studio. We ship three apps, and each one
            does a single thing: an alarm that catches your calendar, an artillery calculator for Hell Let
            Loose, and a visual timer children can read without knowing how to read a clock.
          </p>
        </section>

        <h2 className="sr-only">The apps</h2>
        {APPS.map((app, i) => (
          <Entry key={app.slug} app={app} index={i} />
        ))}
      </main>
      <Colophon />
    </>
  );
}

/** One catalogue entry. Identical armature for every app; only the specimen changes. */
function Entry({ app, index }: { app: AppEntry; index: number }) {
  return (
    <section
      aria-labelledby={`${app.slug}-heading`}
      className="grid grid-cols-1 gap-8 border-b border-rule py-12 sm:py-16 md:grid-cols-[1fr_auto] md:gap-14"
    >
      <div className="max-w-[var(--measure-read)]">
        <div className="flex items-center gap-3">
          <Image
            src={asset(app.icon)}
            alt=""
            width={44}
            height={44}
            className="rounded-[10px] ring-1 ring-black/8"
          />
          <PlatformTags app={app} />
        </div>

        <h3 id={`${app.slug}-heading`} className="mt-5 font-display text-[1.75rem] leading-tight tracking-[-0.01em] text-ink sm:text-[2.125rem]">
          <Link
            href={`/${app.slug}/`}
            className="text-ink no-underline transition-colors hover:text-ink-soft"
          >
            {app.name}
          </Link>
        </h3>

        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{app.line}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          {app.stores.map((s) => (
            <StoreAction key={s.kind} store={s} accent={app.accent} />
          ))}
          <Link
            href={`/${app.slug}/`}
            className="text-[0.875rem] text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
          >
            Read the entry
          </Link>
        </div>

        <div className="mt-5">
          <Ratings app={app} />
        </div>
      </div>

      <div className="w-[10.5rem] shrink-0 sm:w-[12.5rem]">
        <Screen
          src={app.shots[0]}
          alt={`${app.name} on a phone screen`}
          priority={index === 0}
        />
      </div>
    </section>
  );
}
