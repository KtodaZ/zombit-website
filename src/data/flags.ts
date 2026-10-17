/**
 * The Always On Time assistant connector is not live yet. While this is false, the help page at
 * /always-on-time/assistants/ still builds (the app links to it), but it renders `noindex`, says
 * the connector is not available yet, and is left out of the sitemap, navigation, support page,
 * and llms.txt. Flip it in the same change that ports the connector section of the privacy policy
 * (branch `policy/assistant-connector`). See TODO.md.
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
  assistants: "2026-10-17",
} as const;
