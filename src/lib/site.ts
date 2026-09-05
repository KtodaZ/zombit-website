/** Canonical origin. Overridden only for the GitHub Pages project preview. */
export const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zombit.io"
).replace(/\/$/, "");

/** Path prefix. Empty on the apex domain, `/zombit-website` on the Pages preview. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * The site root as an absolute URL. Everything that must be absolute — canonicals,
 * sitemap, JSON-LD ids and image URLs — is built from this, so a base-path change
 * moves all of them together instead of leaving half the site pointing at the apex.
 */
export const SITE_ROOT = `${BASE_URL}${BASE_PATH}`;

/** Absolute URL for a root-relative path such as `/icons/zombit-mark.webp`. */
export const abs = (path: string) => `${SITE_ROOT}${path}`;

/**
 * Root-relative path for a public asset. `next/image` with `unoptimized` passes
 * `src` through verbatim — unlike CSS and `next/link`, it does not apply basePath —
 * so every image src goes through here or it 404s on the Pages project preview.
 */
export const asset = (path: string) => `${BASE_PATH}${path}`;
