"use client"; // Error boundaries must be Client Components.

import { ErrorState } from "@/components/layout/error-state";

/**
 * Error boundary for the public pages.
 *
 * Next.js nests a segment as layout -> error boundary -> page, so this boundary
 * wraps the public pages but NOT `app/(public)/layout.tsx`. When a public page
 * fails, the announcement bar, header and footer stay in place and this
 * message renders inside the layout's existing `<main>` (so it adds no `<main>`).
 *
 * What this boundary cannot catch:
 * - Errors thrown by `app/(public)/layout.tsx` itself or by the shell components
 *   it renders (AnnouncementBar, Header, Footer). Those go to `app/error.tsx`.
 * - Errors in the root layout (`app/layout.tsx`). Those need `app/global-error.tsx`,
 *   which does not exist yet, so Next.js shows its built-in error page.
 *
 * The error value is deliberately unused: nothing about it is shown to visitors.
 */
export default function PublicError({ retry }: { error: unknown; retry: () => void }) {
  return <ErrorState onRetry={retry} />;
}
