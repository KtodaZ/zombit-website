import { ShotStrip } from "./ShotStrip";
import { VideoFacade } from "./VideoFacade";
import {
  SHOT_WIDTHS,
  embedUrl,
  posterPath,
  storeShotPath,
  watchUrl,
  type AppEntry,
  type Video,
} from "@/data/apps";
import { asset } from "@/lib/site";

/** Plate height: one row height for every app, so five unrelated listings line up as one tray. */
const PLATE_H = { base: 336, xl: 384 };
const PLATE_CLASS = "h-[21rem] xl:h-[24rem]";
const STORE = { ios: "App Store", android: "Google Play" } as const;

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const spoken = (s: number) => (s < 60 ? `${s} seconds` : `${clock(s)} minutes`);
const plateSizes = (ratio: number) =>
  `(min-width: 1280px) ${Math.round(PLATE_H.xl * ratio)}px, ${Math.round(PLATE_H.base * ratio)}px`;
const srcSet = (paths: [string, number][]) => paths.map(([p, w]) => `${asset(p)} ${w}w`).join(", ");

function Film({ app, video, eager, className }: { app: AppEntry; video: Video; eager: boolean; className: string }) {
  const portrait = video.orientation === "portrait";
  const widest = video.posterWidths[video.posterWidths.length - 1];
  return (
    <VideoFacade
      embedSrc={embedUrl(video)}
      watchHref={watchUrl(video)}
      title={video.title}
      duration={spoken(video.seconds)}
      clock={clock(video.seconds)}
      eager={eager}
      className={className}
      poster={{
        src: asset(posterPath(app, widest)),
        srcSet: srcSet(video.posterWidths.map((w) => [posterPath(app, w), w])),
        sizes: portrait
          ? plateSizes(video.posterW / video.posterH)
          : "(min-width: 1280px) 683px, (min-width: 1024px) 597px, calc(100vw - 48px)",
        width: video.posterW,
        height: video.posterH,
      }}
    />
  );
}

const filmNote = (v: Video) => `Video, ${clock(v.seconds)}, loads from YouTube when you press play`;

/**
 * An app's plates: its video, when it has one, and the screenshots from its current store listing.
 * A landscape video sits beside the row on wide screens and above it on phones; a portrait video
 * (a Short) is simply the first plate. Images are lazy unless `eager` marks the row as near the
 * top of the page.
 */
export function Showcase({ app, eager = false }: { app: AppEntry; eager?: boolean }) {
  const { storeShots: set, video } = app;
  if (!set) return null;
  const ratio = set.w / set.h;
  const landscape = video?.orientation === "landscape";
  const source = `Images from the ${STORE[set.source]} listing`;

  const strip = (
    <ShotStrip
      id={`${app.slug}-shots`}
      label={`${app.name}: ${video && !landscape ? "video and " : ""}store screenshots`}
      caption={video && !landscape ? `${filmNote(video)}. ${source}.` : `${source}.`}
    >
      {video && !landscape && (
        <li className="shrink-0 snap-start">
          <Film app={app} video={video} eager={eager} className={`${PLATE_CLASS} aspect-[720/1561]`} />
        </li>
      )}
      {set.alts.map((alt, i) => (
        <li key={alt} className="shrink-0 snap-start">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export: srcset by hand */}
          <img
            src={asset(storeShotPath(app, i + 1, 720))}
            srcSet={srcSet(SHOT_WIDTHS.map((w) => [storeShotPath(app, i + 1, w), w]))}
            sizes={plateSizes(ratio)}
            width={set.w}
            height={set.h}
            alt={alt}
            loading={eager && i < 3 ? "eager" : "lazy"}
            decoding="async"
            className={`store-shot block w-auto max-w-none ${PLATE_CLASS}`}
          />
        </li>
      ))}
    </ShotStrip>
  );

  if (!video || !landscape) return strip;

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      <figure className="lg:mt-1 lg:shrink-0">
        <Film
          app={app}
          video={video}
          eager={eager}
          className="aspect-video w-full lg:h-[21rem] lg:w-auto xl:h-[24rem]"
        />
        <figcaption className="mt-3 text-[0.8125rem] leading-snug text-slate lg:mt-5 lg:flex lg:min-h-10 lg:items-center">{filmNote(video)}.</figcaption>
      </figure>
      <div className="min-w-0 flex-1">{strip}</div>
    </div>
  );
}
