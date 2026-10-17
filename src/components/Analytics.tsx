"use client";

import Script from "next/script";
import { useEffect } from "react";

/** The "zombit.io" GA4 property, carried over from the old Google Sites page. */
export const GA_ID = "G-8VH9SBYS6Z";

/**
 * AI assistants and answer engines, by referring host, mapped to the `ai_source` value reported.
 * Subdomains match too (www.perplexity.ai). A `utm_source` equal to a host or a value also counts,
 * since ChatGPT and others tag outbound links that way when they strip the referrer.
 */
export const AI_SOURCES: Record<string, string> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "gemini.google.com": "gemini",
  "copilot.microsoft.com": "copilot",
  "claude.ai": "claude",
  "you.com": "you",
  "phind.com": "phind",
};

/** Runs once per page load, right after the GA config: one `ai_referral` event, or nothing. */
const AI_REFERRAL = `(function(){try{var m=${JSON.stringify(AI_SOURCES)},h="",u="";try{h=new URL(document.referrer).hostname.toLowerCase()}catch(e){}u=(new URLSearchParams(location.search).get("utm_source")||"").toLowerCase();for(var d in m){if(h===d||h.slice(-d.length-1)==="."+d||u===d||u===m[d]){gtag("event","ai_referral",{ai_source:m[d]});break}}}catch(e){}})();`;

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
 *
 * A visit that arrives from an AI assistant (see AI_SOURCES) also sends one `ai_referral` event
 * with `ai_source`, derived only from the referrer GA already records and the landing URL's
 * utm_source. It rides on the same tag, so it never fires where analytics does not load.
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
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{allow_google_signals:false,allow_ad_personalization_signals:false});${AI_REFERRAL}`}
      </Script>
    </>
  );
}
