import { businessConfig } from "@/lib/config/business";
import { BookCta } from "./book-cta";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { PageContainer } from "./page-container";
import { Wordmark } from "./wordmark";

/**
 * The shell's single `<header>`. Row layout:
 * - below 768px: wordmark on the left; menu toggle and CTA on the right.
 * - 768px to 1279px: wordmark and CTA on the first row, the inline links on a
 *   second row (eight links do not fit beside them any narrower than 1280px).
 * - 1280px and up: one row, links centred between the wordmark and CTA.
 */
export function Header() {
  return (
    <header className="relative border-b border-espresso/15 bg-ivory">
      <PageContainer width="wide">
        <div className="flex flex-wrap items-center gap-x-sm gap-y-xs py-sm">
          <Wordmark />
          <MainNav>
            <MobileNav routes={businessConfig.routes} />
          </MainNav>
          <BookCta />
        </div>
      </PageContainer>
    </header>
  );
}
