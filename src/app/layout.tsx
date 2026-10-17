import type { Metadata } from "next";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { DirectionContract } from "@/components/DirectionContract";
import { SITE } from "@/data/apps";
import { IS_PREVIEW, SITE_ROOT, abs } from "@/lib/site";

// Per-page canonical, Open Graph, and Twitter tags come from pageMeta() in src/lib/meta.ts.
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

/** Analytics only on the production apex build: not in `next dev`, not on a base-path preview. */
const ANALYTICS = process.env.NODE_ENV === "production" && !IS_PREVIEW;

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_ROOT}/`),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE_ROOT }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  robots: IS_PREVIEW ? { index: false, follow: false } : { index: true, follow: true },
  icons: { icon: abs("/icons/zombit-mark.webp"), apple: abs("/icons/zombit-mark.webp") },
  formatDetection: { email: false, telephone: false, address: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <DirectionContract />
        {children}
        {ANALYTICS && <Analytics />}
      </body>
    </html>
  );
}
