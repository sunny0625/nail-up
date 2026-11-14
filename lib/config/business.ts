import type { BusinessConfig } from "@/types/business";

/**
 * Business_Config: the single typed source of confirmed Nail Up facts, brand
 * copy and public routes. Values are copied verbatim from
 * `.kiro/steering/product.md`. A plain module with no secrets and no env
 * access, so it is safe to import from Server and Client Components.
 *
 * Deliberately omitted until the business confirms them (never invent them):
 * street address, opening hours, service prices and durations, artist name or
 * biography, and customer testimonials or ratings.
 */
export const businessConfig: BusinessConfig = {
  facts: {
    name: "Nail Up",
    type: "Nail Extension Artist & Nail Art Studio",
    location: "Brampton, Ontario, Canada",
    whatsappNumber: "+1-6473347600",
    whatsappUrl: "https://wa.me/16473347600",
    instagramUrl: "https://www.instagram.com/nailup_/",
    email: "prabhvirdi3011@gmail.com",
    bookingRoute: "/book",
    currency: "CAD",
    timezone: "America/Toronto",
  },

  copy: {
    tagline: "Nails, but make them art.",
    homepageHeadline: "Your nails. Your canvas.",
    supportingStatement:
      "Luxury nail extensions and custom nail artistry, designed around your style.",
    announcement:
      "Brampton, your next nail obsession starts here. ✦ Book your set.",
    primaryCta: "BOOK YOUR SET",
    secondaryCta: "EXPLORE THE LOOKBOOK",
    communityCta: "SHARE YOUR NAIL INSPIRATION",
    yourArtHeading: "Your Idea. Our Canvas.",
    yourArtSupporting:
      "Found a nail design you love? Share it with Nail Up and let's make your next set personal.",
  },

  // Ordered: the eight primary-nav routes first, then the footer-only routes.
  routes: [
    { path: "/", label: "Home", inPrimaryNav: true },
    { path: "/services", label: "Services", inPrimaryNav: true },
    { path: "/lookbook", label: "Lookbook", inPrimaryNav: true },
    { path: "/love-notes", label: "The Love Notes", inPrimaryNav: true },
    { path: "/your-art", label: "Your Art", inPrimaryNav: true },
    { path: "/about", label: "About", inPrimaryNav: true },
    { path: "/book", label: "Book", inPrimaryNav: true },
    { path: "/contact", label: "Contact", inPrimaryNav: true },
    { path: "/privacy", label: "Privacy", inPrimaryNav: false },
    { path: "/terms", label: "Terms", inPrimaryNav: false },
  ],
};
