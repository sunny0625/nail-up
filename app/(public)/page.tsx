import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { businessConfig } from "@/lib/config/business";
import { getRoute, homeMetadata } from "@/lib/config/page-metadata";

export const metadata = homeMetadata;

/**
 * Home: a light editorial landing using confirmed copy only. The full homepage
 * (hero imagery, sections, motion) is a later spec.
 */
export default function HomePage() {
  const { copy, facts } = businessConfig;

  return (
    <PageContainer width="wide">
      <div className="py-xl md:py-2xl">
        <p className="editorial-label text-xs text-plum">{copy.tagline}</p>
        <h1 className="mt-sm font-serif text-5xl md:text-7xl">{copy.homepageHeadline}</h1>
        <p className="mt-md max-w-narrow text-lg md:text-xl">{copy.supportingStatement}</p>
        <div className="mt-lg flex flex-wrap gap-sm">
          <Link href={facts.bookingRoute} className="button-primary text-sm">
            {copy.primaryCta}
          </Link>
          <Link href={getRoute("/lookbook").path} className="button-secondary text-sm">
            {copy.secondaryCta}
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
