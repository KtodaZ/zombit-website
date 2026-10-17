import { priceLabel, showsRating, type AppEntry, type Listing, type Store } from "@/data/apps";
import { onAccent } from "@/lib/accent";

const STORE_NAME: Record<Store["kind"], string> = { ios: "App Store", android: "Google Play" };

/** The one place an entry's accent is allowed to appear. Accent always means "act". */
export function StoreAction({
  store,
  accent,
  app,
  placement,
}: {
  store: Store;
  accent: string;
  /** App slug and page position, reported with the store_click analytics event. */
  app: string;
  placement: string;
}) {
  return (
    <a
      href={store.url}
      rel="noopener"
      data-store={store.kind}
      data-app={app}
      data-placement={placement}
      style={{ backgroundColor: accent, color: onAccent(accent) }}
      className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-2 text-[0.8125rem] font-medium no-underline shadow-[0_1px_2px_rgba(22,24,29,0.18)] transition-transform duration-200 hover:-translate-y-px focus-visible:-translate-y-px motion-reduce:transform-none"
    >
      {store.kind === "ios" ? <AppleGlyph /> : <PlayGlyph />}
      <span>{store.label}</span>
      <span className="sr-only"> (opens {STORE_NAME[store.kind]})</span>
    </a>
  );
}

/** Platform availability is information, not decoration — it sets in the margin. */
export function PlatformTags({ app }: { app: AppEntry }) {
  return (
    <ul
      aria-label="Platforms and category"
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] uppercase tracking-[0.11em] text-slate"
    >
      {app.stores.map((s) => (
        <li key={s.kind} className="border border-rule-soft px-1.5 py-0.5">
          {s.kind === "ios" ? "iOS" : "Android"}
        </li>
      ))}
      <li className="border border-rule-soft px-1.5 py-0.5">{app.category}</li>
    </ul>
  );
}

function ratingLine(kind: Store["kind"], r: Listing) {
  const where = STORE_NAME[kind];
  const count = r.count ?? 0;
  return `${(r.score ?? 0).toFixed(1)} on ${where} · ${count.toLocaleString("en-US")} ratings`;
}

const rated = showsRating;

/**
 * Only prints numbers that were actually fetched from a store, and only with at least
 * MIN_RATINGS ratings behind them. Never a placeholder.
 */
export function Ratings({ app }: { app: AppEntry }) {
  const rows = app.stores
    .map((s) => [s.kind, app.listings[s.kind]] as const)
    .filter((e): e is readonly [Store["kind"], Listing] => rated(e[1]));
  if (rows.length === 0) return null;
  return (
    <ul className="tnum space-y-0.5 text-[0.8125rem] text-ink-soft">
      {rows.map(([k, r]) => (
        <li key={k}>{ratingLine(k, r)}</li>
      ))}
    </ul>
  );
}

export const hasRatings = (app: AppEntry) => app.stores.some((s) => rated(app.listings[s.kind]));

/**
 * Where to get it, store by store: the listing's own title and its US price. Store titles differ
 * from the app's name for two apps, and people search by either.
 */
export function StoreFacts({ app }: { app: AppEntry }) {
  return (
    <dl className="tnum grid gap-x-8 gap-y-4 text-[0.9375rem] sm:grid-cols-2">
      {app.stores.map((s) => {
        const price = priceLabel(app.listings[s.kind]);
        return (
          <div key={s.kind} className="border-t border-rule-soft pt-3">
            <dt className="text-[0.75rem] uppercase tracking-[0.11em] text-slate">{STORE_NAME[s.kind]}</dt>
            <dd className="mt-1 text-ink">
              <a
                href={s.url}
                rel="noopener"
                data-store={s.kind}
                data-app={app.slug}
                data-placement="app-facts"
                className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
              >
                {s.title}
              </a>
            </dd>
            {price && (
              <dd className="mt-0.5 text-ink-soft">
                {price === "Free" ? "Free to download" : `${price} (US price)`}
              </dd>
            )}
          </div>
        );
      })}
    </dl>
  );
}

function AppleGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M11.03 8.5c.01-1.3.68-2.3 1.72-2.94-.6-.85-1.5-1.32-2.68-1.4-1.13-.08-2.36.65-2.8.65-.47 0-1.56-.62-2.42-.62-1.78.03-3.67 1.42-3.67 4.24 0 .84.15 1.7.46 2.6.4 1.16 1.87 4.02 3.4 3.97.8-.02 1.36-.57 2.4-.57 1.01 0 1.53.57 2.42.57 1.55-.02 2.88-2.62 3.26-3.79-2.07-.98-2.09-2.86-2.09-2.71ZM9.4 3.06c.78-.93.71-1.78.69-2.06-.7.04-1.5.47-1.96 1-.5.57-.8 1.28-.73 2.03.75.06 1.44-.33 2-.97Z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M1.9.6a.9.9 0 0 0-.4.76v13.28c0 .32.15.6.4.76l7.2-7.4L1.9.6Zm8.24 6.5L3.2.28 11.4 4.9l-1.26 2.2ZM3.2 15.72l6.94-6.82 1.26 2.2-8.2 4.62Zm8.9-4.98L10.7 8.5l1.4-2.24 2.6 1.47c.6.34.6 1.2 0 1.54l-2.6 1.47Z" />
    </svg>
  );
}
