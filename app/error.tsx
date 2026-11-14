"use client"; // Error boundaries must be Client Components.

import { ErrorState } from "@/components/layout/error-state";

/**
 * Root error boundary: the fallback for every segment that has no nearer
 * boundary. In practice that means errors in `app/(public)/layout.tsx` and its
 * shell components, and any future segments outside `(public)` (such as admin).
 *
 * It replaces the failed segment's layout, so the public shell is not shown and
 * this boundary renders its own (single) `<main>`. It renders inside the root
 * layout, so fonts and global styles still apply. Errors in the root layout
 * itself are not caught here; they need `app/global-error.tsx`.
 *
 * The error value is deliberately unused: nothing about it is shown to visitors.
 */
export default function RootError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <main className="flex-1">
      <ErrorState onRetry={retry} />
    </main>
  );
}
