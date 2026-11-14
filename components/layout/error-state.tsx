import { PageContainer } from "./page-container";

type ErrorStateProps = Readonly<{
  /** Called by the "Try again" button. Pass the error boundary's `retry` function. */
  onRetry: () => void;
}>;

/**
 * Shared error message for the app's error boundaries (`app/error.tsx` and
 * `app/(public)/error.tsx`). It takes a function prop, so import it only from
 * those Client Components, never from a Server Component.
 *
 * It renders no landmark: the public boundary places it inside the public
 * layout's `<main>`, and the root boundary wraps it in its own `<main>`.
 * It never shows the error itself (message, digest or stack): visitors see only
 * a calm message and a retry action.
 */
export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <PageContainer width="narrow">
      <div role="alert" className="py-xl md:py-2xl">
        <h1 className="font-serif text-4xl md:text-6xl">Something went wrong.</h1>
        <p className="mt-md text-lg">We couldn&apos;t load this page right now. Please try again.</p>
        <button type="button" onClick={onRetry} className="button-primary mt-lg text-sm">
          Try again
        </button>
      </div>
    </PageContainer>
  );
}
