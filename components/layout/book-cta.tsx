import Link from "next/link";
import { businessConfig } from "@/lib/config/business";

/**
 * Primary booking call-to-action. Label and destination come from
 * Business_Config. The button padding tokens are tightened below `md` so the
 * header fits on a 375px screen.
 */
export function BookCta() {
  const { copy, facts } = businessConfig;

  return (
    <Link
      href={facts.bookingRoute}
      className="button-primary text-xs whitespace-nowrap md:order-2 md:ml-auto xl:order-none xl:ml-0 [--button-padding-block:var(--spacing-xs)] [--button-padding-inline:var(--spacing-sm)] md:text-sm md:[--button-padding-block:var(--spacing-sm)] md:[--button-padding-inline:var(--spacing-lg)]"
    >
      {copy.primaryCta}
    </Link>
  );
}
