import { storeAttribution } from "@/lib/store-attribution";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Masthead, Colophon, Crumbs } from "@/components/Chrome";
import { JsonLd } from "@/components/JsonLd";
import { organization, breadcrumbs, webPage } from "@/lib/schema";
import { APPS, SITE, privacyPath, type AppEntry } from "@/data/apps";
import { ASSISTANTS_LIVE } from "@/data/flags";
import { asset } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

const PATH = "/support/";
const TITLE = "Support";
const DESCRIPTION = `Get help with ${APPS.map((a) => a.shortName).join(", ")}. Email ${SITE.email}, find each app's privacy policy, and delete your Always On Time account.`;

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const link = "text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink";

/** Per-app routes beyond the shared email. Only things that exist and are published. */
function extras(app: AppEntry) {
  const items: React.ReactNode[] = [];
  if (app.slug === "always-on-time") {
    items.push(
      <>
        <strong className="font-semibold text-ink">Delete your account:</strong> in the app, choose
        Settings › Account › Manage account › Delete account, or use the{" "}
        <a className={link} href={SITE.aotDeleteAccount}>
          account deletion page
        </a>
        .
      </>,
      <>
        <strong className="font-semibold text-ink">Delete feedback or diagnostics:</strong> email{" "}
        <a className={link} href={`mailto:${SITE.email}?subject=Always%20On%20Time%20data%20deletion`}>
          {SITE.email}
        </a>{" "}
        with the subject “Always On Time data deletion”, as the{" "}
        <Link className={link} href={`${privacyPath(app)}#retention-and-deletion`}>
          privacy policy
        </Link>{" "}
        describes.
      </>,
      <>
        <strong className="font-semibold text-ink">Alarms not ringing?</strong> Open the app’s guided
        setup for notifications, exact alarms, full-screen alerts, and battery settings. Android
        permissions and your phone’s battery settings affect alarm delivery.
      </>,
    );
    if (ASSISTANTS_LIVE) {
      items.push(
        <Link className={link} href="/always-on-time/assistants/">
          Connect Claude or ChatGPT to Always On Time
        </Link>,
      );
    }
  }
  for (const s of app.support ?? []) {
    items.push(
      <>
        <a className={link} href={storeAttribution(s.url, app.slug, "support")} rel="noopener">
          {s.label}
        </a>
        {s.note && <span> — {s.note}</span>}
      </>,
    );
  }
  if (app.website) {
    items.push(
      <a className={link} href={app.website.url} rel="noopener">
        {app.website.label}
      </a>,
    );
  }
  return items;
}

export default function SupportPage() {
  const trail: [string, string][] = [
    ["Zombit Studios", "/"],
    ["Support", PATH],
  ];
  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={webPage(PATH, `${TITLE} — ${SITE.name}`, DESCRIPTION)} />
      <JsonLd data={breadcrumbs(trail.slice(1))} />
      <Masthead current="support" />
      <main id="main" className="mx-auto max-w-[var(--measure-page)] px-6 sm:px-8">
        <header className="border-b border-rule pt-10 pb-10 sm:pt-14 sm:pb-12">
          <Crumbs trail={trail} />
          <h1 className="mt-6 font-display text-[2rem] leading-[1.14] tracking-[-0.015em] text-ink sm:text-[2.5rem]">
            Support
          </h1>
          <p className="mt-4 max-w-[var(--measure-doc)] text-[1.0625rem] leading-relaxed text-ink-soft">
            Every message reaches a real person.
            Email{" "}
            <a className={link} href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>{" "}
            and say which app, which phone, and what happened.
          </p>
        </header>

        {APPS.map((app) => {
          const more = extras(app);
          return (
            <section
              key={app.slug}
              id={app.slug}
              aria-labelledby={`${app.slug}-support`}
              className="grid gap-6 border-b border-rule py-10 sm:py-12 md:grid-cols-[14rem_minmax(0,var(--measure-doc))] md:gap-12"
            >
              <div className="flex items-center gap-3 md:items-start">
                <Image
                  src={asset(app.icon)}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-[9px] ring-1 ring-black/8"
                />
                <h2
                  id={`${app.slug}-support`}
                  className="font-display text-[1.25rem] leading-snug text-ink md:mt-1"
                >
                  {app.name}
                </h2>
              </div>
              <ul className="space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                {more.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                <li>
                  <Link className={link} href={privacyPath(app)}>
                    Privacy policy
                  </Link>
                  <span className="text-slate"> · effective {app.privacyEffective}</span>
                </li>
                <li>
                  <Link className={link} href={`/${app.slug}/`}>
                    About {app.name}
                  </Link>
                  <span aria-hidden="true"> · </span>
                  {app.stores.map((s, i) => (
                    <span key={s.kind}>
                      {i > 0 && <span aria-hidden="true"> · </span>}
                      <a
                        className={link}
                        href={storeAttribution(s.url, app.slug, "support")}
                        rel="noopener"
                        data-store={s.kind}
                        data-app={app.slug}
                        data-placement="support"
                      >
                        {s.kind === "ios" ? "App Store" : "Google Play"}
                      </a>
                    </span>
                  ))}
                </li>
              </ul>
            </section>
          );
        })}
      </main>
      <Colophon />
    </>
  );
}
