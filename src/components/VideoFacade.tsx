"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A YouTube video that costs nothing until it is asked for. The page ships a poster we host and a
 * plain link to the video; only a click swaps in the youtube-nocookie player, so no request reaches
 * Google and no cookie is set before the visitor presses play. Without JavaScript the link simply
 * opens the video on YouTube.
 */
export function VideoFacade({
  embedSrc,
  watchHref,
  title,
  duration,
  clock,
  poster,
  className = "",
  eager = false,
}: {
  embedSrc: string;
  watchHref: string;
  title: string;
  /** Spoken length, e.g. "17 seconds". */
  duration: string;
  /** Printed length, e.g. "0:17". */
  clock: string;
  poster: { src: string; srcSet: string; sizes: string; width: number; height: number };
  /** Sizing classes for the frame. The player takes the poster's exact box, so nothing shifts. */
  className?: string;
  eager?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) frame.current?.focus();
  }, [playing]);

  return (
    <div className={`screen relative ${className}`}>
      {playing ? (
        <iframe
          ref={frame}
          src={`${embedSrc}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <a
          href={watchHref}
          rel="noopener"
          aria-label={`Play video: ${title} (${duration})`}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            setPlaying(true);
          }}
          className="group absolute inset-0 block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export: srcset by hand */}
          <img
            src={poster.src}
            srcSet={poster.srcSet}
            sizes={poster.sizes}
            width={poster.width}
            height={poster.height}
            alt=""
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-3 inline-flex h-10 items-center gap-2 rounded-full bg-paper/95 pr-3.5 pl-1.5 text-[0.8125rem] font-medium text-ink shadow-[0_0_0_1px_rgb(22_24_29/0.12),0_8px_20px_-8px_rgb(22_24_29/0.5)] transition-colors group-hover:bg-plate"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 ease-out group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor">
                <path d="M7 4.6v14.8a.9.9 0 0 0 1.37.77l11.6-7.4a.9.9 0 0 0 0-1.54L8.37 3.83A.9.9 0 0 0 7 4.6Z" />
              </svg>
            </span>
            Play
            <span className="tnum font-normal text-ink-soft">{clock}</span>
          </span>
        </a>
      )}
    </div>
  );
}
