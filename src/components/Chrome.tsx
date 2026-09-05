import Link from "next/link";
import Image from "next/image";
import { APPS, SITE } from "@/data/apps";
import { asset } from "@/lib/site";

/** The masthead. Small, set once, never competing with an entry. */
export function Masthead({ current }: { current?: string }) {
  return (
    <header className="border-b border-rule-soft">
      <div className="mx-auto flex max-w-[var(--measure-page)] items-baseline gap-x-6 gap-y-2 px-6 py-4 sm:px-8 flex-wrap">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 no-underline"
          aria-label={`${SITE.name} — home`}
        >
          <Image
            src={asset("/icons/zombit-mark.webp")}
            alt=""
            width={20}
            height={20}
            className="translate-y-[3px] rounded-[5px] opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="font-display text-[1.0625rem] tracking-tight text-ink">
            {SITE.name}
          </span>
        </Link>
        <nav className="ml-auto flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[0.8125rem]">
          {APPS.map((a) => (
            <Link
              key={a.slug}
              href={`/${a.slug}/`}
              aria-current={current === a.slug ? "page" : undefined}
              className={
                current === a.slug
                  ? "text-ink no-underline"
                  : "text-slate no-underline transition-colors hover:text-ink"
              }
            >
              {a.shortName}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

/** The colophon. Where the studio, not the app, gets to speak. */
export function Colophon() {
  return (
    <footer className="mt-24 border-t border-rule-soft">
      <div className="mx-auto max-w-[var(--measure-page)] px-6 py-10 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-[26rem]">
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
            <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">
              {SITE.tagline}
            </p>
          </div>
          <div className="text-[0.8125rem] leading-relaxed">
            <h2 className="font-display text-[0.9375rem] text-ink">Support</h2>
            <ul className="mt-2 space-y-1.5">
              <li>
                <a
                  className="text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink"
                  href={SITE.discord}
                  rel="noopener"
                >
                  Artillery Let Loose Discord
                </a>
              </li>
              {APPS.map((a) => (
                <li key={a.slug}>
                  <Link
                    className="text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink"
                    href={`/${a.slug}/`}
                  >
                    {a.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 text-[0.75rem] text-slate">
          © {new Date().getFullYear()} {SITE.legalName}. Hell Let Loose is a trademark of its
          respective owners; Zombit Studios is not affiliated with Black Matter Pty Ltd or
          Team17 Group PLC.
        </p>
      </div>
    </footer>
  );
}
