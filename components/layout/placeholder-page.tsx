import { PageContainer } from "./page-container";

type PlaceholderPageProps = Readonly<{
  /** Page heading, for example the route's navigation label. */
  title: string;
  /** Optional supporting line. Use confirmed copy only; never business facts that are not confirmed. */
  description?: string;
}>;

/**
 * Shared "coming soon" page for public routes whose content is deferred to a
 * later spec. It always states that the page is coming soon, so a placeholder
 * can never be mistaken for real content. Renders inside the public layout's
 * `<main>`, so it has no landmark of its own.
 */
export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <PageContainer width="narrow">
      <div className="py-xl md:py-2xl">
        <p className="editorial-label text-xs text-plum">Coming soon</p>
        <h1 className="mt-sm font-serif text-4xl md:text-6xl">{title}</h1>
        {description ? <p className="mt-md text-lg">{description}</p> : null}
        <p className="mt-md">This page is coming soon.</p>
      </div>
    </PageContainer>
  );
}
