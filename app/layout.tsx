import type { Metadata } from "next";
import localFont from "next/font/local";
import { businessConfig } from "@/lib/config/business";
import "./globals.css";

// Self-hosted variable fonts (see app/fonts/README.md). Each call exposes a CSS
// variable that the --font-serif / --font-sans tokens in globals.css consume.
const headlineFont = localFont({
  src: "./fonts/bodoni-moda-latin-wght-normal.woff2",
  variable: "--font-headline",
  weight: "400 900",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const bodyFont = localFont({
  src: "./fonts/dm-sans-latin-wght-normal.woff2",
  variable: "--font-body",
  weight: "100 1000",
  display: "swap",
  adjustFontFallback: "Arial",
});

const { facts, copy } = businessConfig;

export const metadata: Metadata = {
  title: {
    default: `${facts.name} | ${copy.tagline}`,
    template: `%s | ${facts.name}`,
  },
  description: copy.supportingStatement,
};

/**
 * Root_Layout: intentionally shell-free. It applies to every route, public and
 * future admin, so the announcement bar, navigation and footer live in
 * app/(public)/layout.tsx instead.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${headlineFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
