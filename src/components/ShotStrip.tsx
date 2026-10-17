"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A row of plates that scrolls sideways. The row itself is the control: it is focusable, so arrow
 * keys scroll it, and touch and trackpads swipe it. Previous and next buttons appear only when the
 * row actually overflows, for mouse users who have no sideways scroll. Nothing moves on its own.
 */
export function ShotStrip({
  id,
  label,
  caption,
  children,
}: {
  id: string;
  /** Accessible name of the scrolling region. */
  label: string;
  /** Provenance line printed under the row. */
  caption: React.ReactNode;
  children: React.ReactNode;
}) {
  const row = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ overflow: false, start: true, end: true });

  const measure = useCallback(() => {
    const el = row.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ overflow: max > 4, start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    // Lazy images change the row's width as they decode.
    el.querySelectorAll("img").forEach((img) => img.addEventListener("load", measure));
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: still ? "auto" : "smooth" });
  };

  return (
    <div className="min-w-0">
      <div
        ref={row}
        id={id}
        role="region"
        tabIndex={0}
        aria-label={label}
        className="strip -mx-6 snap-x snap-mandatory scroll-px-6 overflow-x-auto px-6 pt-1 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-1 lg:scroll-px-1 lg:px-1"
      >
        <ul className="flex w-max gap-4 lg:gap-5">{children}</ul>
      </div>
      <div className="mt-1 flex min-h-10 items-center justify-between gap-4">
        <p className="text-[0.8125rem] leading-snug text-slate">{caption}</p>
        {edge.overflow && (
          <div className="flex shrink-0 gap-2">
            <StepButton dir={-1} disabled={edge.start} controls={id} onClick={() => step(-1)} />
            <StepButton dir={1} disabled={edge.end} controls={id} onClick={() => step(1)} />
          </div>
        )}
      </div>
    </div>
  );
}

function StepButton({
  dir,
  disabled,
  controls,
  onClick,
}: {
  dir: 1 | -1;
  disabled: boolean;
  controls: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-controls={controls}
      aria-label={dir === 1 ? "Next screenshots" : "Previous screenshots"}
      disabled={disabled}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-rule text-ink transition-colors hover:border-ink disabled:cursor-default disabled:border-rule-soft disabled:text-rule"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d={dir === 1 ? "M6 3.5 10.5 8 6 12.5" : "M10 3.5 5.5 8 10 12.5"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
