/**
 * The connector server is live (2026-10-17) and the privacy policy describes it, but the Android
 * release that syncs alarms to it has not shipped. While this is false, the help page at
 * /always-on-time/assistants/ still builds (the app links to it), but it renders `noindex`, says
 * the connector is not available yet, and is left out of the sitemap, navigation, support page,
 * and llms.txt. Flip it when the Always On Time release with Connected assistants is live on Play.
 */
export const ASSISTANTS_LIVE = false;

/** What the user pastes into Claude or ChatGPT. */
export const CONNECTOR_URL = "https://alwaysontime.zombit.io/mcp";

/**
 * Last meaningful content change per page group, written into sitemap <lastmod>. Bump the date
 * when the page's content actually changes; a build alone is not a change.
 */
export const LASTMOD = {
  home: "2026-10-17",
  apps: "2026-10-17",
  privacy: "2026-10-17",
  support: "2026-10-17",
  assistants: "2026-10-17",
} as const;
