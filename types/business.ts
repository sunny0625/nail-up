/**
 * Shared type definitions for the Nail Up Business_Config.
 *
 * Types only: no runtime code lives in this directory. The typed values are
 * populated in `lib/config/business.ts`.
 */

/** A public route the shell links to. */
export interface PublicRoute {
  readonly path: string; // e.g. "/services"
  readonly label: string; // nav/footer display label (English Canadian spelling)
  readonly inPrimaryNav: boolean; // true for the 8 nav routes; false for /privacy, /terms
}

/** Confirmed, final business facts. Never substituted. */
export interface BusinessFacts {
  readonly name: string; // "Nail Up"
  readonly type: string; // "Nail Extension Artist & Nail Art Studio"
  readonly location: string; // "Brampton, Ontario, Canada"
  readonly whatsappNumber: string; // "+1-6473347600"
  readonly whatsappUrl: string; // "https://wa.me/16473347600"
  readonly instagramUrl: string; // "https://www.instagram.com/nailup_/" (no params)
  readonly email: string; // "prabhvirdi3011@gmail.com"
  readonly bookingRoute: string; // "/book"
  readonly currency: "CAD";
  readonly timezone: "America/Toronto";
}

/** Confirmed brand copy, verbatim from product.md. */
export interface BrandCopy {
  readonly tagline: string;
  readonly homepageHeadline: string;
  readonly supportingStatement: string;
  readonly announcement: string; // default announcement-bar text
  readonly primaryCta: string; // "BOOK YOUR SET"
  readonly secondaryCta: string; // "EXPLORE THE LOOKBOOK"
  readonly communityCta: string;
  readonly yourArtHeading: string;
  readonly yourArtSupporting: string;
}

/**
 * A business detail that is unknown until the owner confirms it. Never fabricated.
 * Rendered either omitted, or with visible text containing "awaiting business confirmation".
 */
export interface UnconfirmedFact {
  readonly key:
    | "streetAddress"
    | "openingHours"
    | "prices"
    | "durations"
    | "artistBio"
    | "testimonials";
  readonly status: "awaiting-business-confirmation";
}

export interface BusinessConfig {
  readonly facts: BusinessFacts;
  readonly copy: BrandCopy;
  readonly routes: readonly PublicRoute[]; // ordered: nav routes first, then /privacy, /terms
}
