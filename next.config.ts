import type { NextConfig } from "next";

/**
 * The site is built for the apex domain `zombit.io` with no base path. The GitHub
 * Pages *project* preview lives at a subpath instead, so both are env-driven: the
 * preview build sets BASE_PATH and SITE_URL, and the eventual apex build sets
 * neither. Nothing else in the codebase hardcodes either value.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML at build time. This is the whole reason for leaving Google Sites:
  // answer engines and crawlers that do not run JS still get the full page.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
