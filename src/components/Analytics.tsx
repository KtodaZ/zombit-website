"use client";

import Script from "next/script";
import { useEffect } from "react";

/** The "zombit.io" GA4 property, carried over from the old Google Sites page. */
export const GA_ID = "G-8VH9SBYS6Z";

type Gtag = (command: "event", name: string, params: Record<string, string>) => void;

/**
 * Google Analytics 4, loaded after the page is interactive. The root layout renders this only on
 * the production apex build: never in `next dev`, never on a base-path preview. What it collects
 * is described on /privacy/; keep that page in step with any change here.
 *
 * Google signals and ad-personalisation signals are switched off for this tag, so visits are
 * used for aggregate statistics only.
 *
 * Store clicks are reported as one `store_click` event per click on any link carrying
 * `data-store`, with the app slug, the store, and where on the page the link sat. Nothing about
 * the visitor is added.
 */
export function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a[data-store]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      gtag?.("event", "store_click", {
        app: a.dataset.app ?? "",
        store: a.dataset.store ?? "",
        placement: a.dataset.placement ?? "",
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{allow_google_signals:false,allow_ad_personalization_signals:false});`}
      </Script>
    </>
  );
}
