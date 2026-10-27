/**
 * Whether the assistant connector is live: on since Always On Time 1.0.184 shipped on Play
 * (2026-10-26). While false, the help page at /always-on-time/assistants/ still builds (the app
 * links to it), but it renders `noindex`, says the connector is not available yet, and is left out
 * of the sitemap, navigation, support page, and llms.txt.
 */
export const ASSISTANTS_LIVE = true;

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
  assistants: "2026-10-26",
} as const;
