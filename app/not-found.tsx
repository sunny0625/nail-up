import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Wordmark } from "@/components/layout/wordmark";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or may have moved.",
};

/**
 * App-level 404. Next.js renders this for any unmatched URL (and for
 * `notFound()` calls that no nearer not-found file handles) inside the
 * shell-free root layout, and sets the 404 status and `noindex` automatically.
 *
 * Deliberately slim: Next.js embeds the root not-found UI in every route's
 * payload, so the full public shell (announcement bar, navigation, footer)
 * would add weight to every page. Only the wordmark and a link home remain.
 */
export default function NotFound() {
  return (
    <>
      <header className="border-b border-espresso/15">
        <PageContainer width="wide">
          <div className="py-sm">
            <Wordmark />
          </div>
        </PageContainer>
      </header>
      <main className="flex flex-1 items-center">
        <PageContainer width="narrow">
          <div className="py-xl md:py-2xl">
            <p className="editorial-label text-xs text-plum">404</p>
            <h1 className="mt-sm font-serif text-4xl md:text-6xl">Page not found.</h1>
            <p className="mt-md text-lg">
              The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>
            <Link href="/" className="button-primary mt-lg text-sm">
              Back to home
            </Link>
          </div>
        </PageContainer>
      </main>
    </>
  );
}
