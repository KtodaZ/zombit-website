import Image from "next/image";
import type { AppEntry, Rating, Store } from "@/data/apps";
import { asset } from "@/lib/site";

/** Intrinsic pixel size of each committed raster, so nothing is guessed at render. */
const SHOT_SIZE: Record<string, { w: number; h: number }> = {
  "/shots/alwaysontime-1.webp": { w: 620, h: 1103 },
  "/shots/alwaysontime-2.webp": { w: 620, h: 1103 },
  "/shots/alwaysontime-3.webp": { w: 620, h: 1103 },
  "/shots/artillery-1.webp": { w: 620, h: 1147 },
  "/shots/montessori-1.webp": { w: 620, h: 1405 },
  "/shots/montessori-2.webp": { w: 620, h: 1405 },
  "/shots/montessori-3.webp": { w: 620, h: 1405 },
};

/**
 * One device screen. The frame is site-drawn and identical across apps, which is
 * what lets three unrelated apps sit in one catalogue without looking mismatched.
 */
export function Screen({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const size = SHOT_SIZE[src] ?? { w: 620, h: 1103 };
  return (
    <figure className={`screen settle ${className}`}>
      <Image
        src={asset(src)}
        alt={alt}
        width={size.w}
        height={size.h}
        priority={priority}
        sizes="(max-width: 640px) 78vw, 300px"
        className="block h-auto w-full"
      />
    </figure>
  );
}

const STORE_NAME: Record<Store["kind"], string> = { ios: "App Store", android: "Google Play" };

/** The one place an entry's accent is allowed to appear. Accent always means "act". */
export function StoreAction({ store, accent }: { store: Store; accent: string }) {
  return (
    <a
      href={store.url}
      rel="noopener"
      style={{ backgroundColor: accent }}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.8125rem] font-medium text-white no-underline shadow-[0_1px_2px_rgba(22,24,29,0.18)] transition-transform duration-200 hover:-translate-y-px focus-visible:-translate-y-px motion-reduce:transform-none"
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
    <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] uppercase tracking-[0.11em] text-slate">
      {app.stores.map((s) => (
        <li key={s.kind} className="border border-rule-soft px-1.5 py-0.5">
          {s.kind === "ios" ? "iOS" : "Android"}
        </li>
      ))}
      <li className="border border-rule-soft px-1.5 py-0.5">{app.category}</li>
    </ul>
  );
}

function ratingLine(kind: "ios" | "android", r: Rating) {
  const where = kind === "ios" ? "App Store" : "Google Play";
  return r.count === null
    ? `${r.score.toFixed(1)} on ${where}`
    : `${r.score.toFixed(1)} on ${where} · ${r.count} ${r.count === 1 ? "rating" : "ratings"}`;
}

/** Only prints numbers that were actually fetched from a store. Never a placeholder. */
export function Ratings({ app }: { app: AppEntry }) {
  const rows = (["ios", "android"] as const)
    .map((k) => [k, app.ratings[k]] as const)
    .filter((e): e is readonly ["ios" | "android", Rating] => Boolean(e[1]));
  if (rows.length === 0) return null;
  return (
    <ul className="tnum space-y-0.5 text-[0.8125rem] text-ink-soft">
      {rows.map(([k, r]) => (
        <li key={k}>{ratingLine(k, r)}</li>
      ))}
    </ul>
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
