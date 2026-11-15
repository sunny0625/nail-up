import { describe, expect, it } from "vitest";
import { businessConfig } from "@/lib/config/business";

/*
 * Guards the confirmed Nail Up facts and copy against typos and fabrication.
 * Expected values are literals copied from the confirmed business facts in
 * .kiro/steering/product.md, deliberately NOT read back from the config:
 * a test that compares the config with itself would never fail.
 */

const { facts, copy, routes } = businessConfig;

describe("Business_Config confirmed facts", () => {
  it("has the exact WhatsApp URL, matching the WhatsApp number", () => {
    expect(facts.whatsappUrl).toBe("https://wa.me/16473347600");
    expect(facts.whatsappNumber).toBe("+1-6473347600");
    // wa.me links use the number's digits only; the two values must agree.
    expect(facts.whatsappUrl).toBe(`https://wa.me/${facts.whatsappNumber.replace(/\D/g, "")}`);
  });

  it("has the exact Instagram URL with no query string or tracking parameters", () => {
    expect(facts.instagramUrl).toBe("https://www.instagram.com/nailup_/");
    const url = new URL(facts.instagramUrl);
    expect(url.search).toBe("");
    expect(url.hash).toBe("");
  });

  it("has the exact business email", () => {
    expect(facts.email).toBe("prabhvirdi3011@gmail.com");
  });

  it("has the exact default announcement text, including the U+2726 star", () => {
    expect(copy.announcement).toBe(
      "Brampton, your next nail obsession starts here. \u2726 Book your set.",
    );
  });

  it("has the exact primary call-to-action, pointing at the booking route", () => {
    expect(copy.primaryCta).toBe("BOOK YOUR SET");
    expect(facts.bookingRoute).toBe("/book");
  });
});

describe("Business_Config routes", () => {
  it("lists the primary navigation routes in the confirmed order", () => {
    const navPaths = routes.filter((route) => route.inPrimaryNav).map((route) => route.path);
    expect(navPaths).toEqual([
      "/",
      "/services",
      "/lookbook",
      "/love-notes",
      "/your-art",
      "/about",
      "/book",
      "/contact",
    ]);
  });

  it("orders the primary routes first, then the footer-only routes, with no duplicates", () => {
    expect(routes.map((route) => route.path)).toEqual([
      "/",
      "/services",
      "/lookbook",
      "/love-notes",
      "/your-art",
      "/about",
      "/book",
      "/contact",
      "/privacy",
      "/terms",
    ]);
    expect(routes.filter((route) => !route.inPrimaryNav).map((route) => route.path)).toEqual([
      "/privacy",
      "/terms",
    ]);
    expect(new Set(routes.map((route) => route.path)).size).toBe(routes.length);
  });
});

describe("Business_Config structure", () => {
  it("holds only confirmed facts, copy and routes (no unconfirmed business facts)", () => {
    // Unconfirmed facts (address, hours, prices, durations, bio, testimonials)
    // must be omitted from the active config, never invented.
    expect(Object.keys(businessConfig).sort()).toEqual(["copy", "facts", "routes"]);
    expect(Object.keys(facts).sort()).toEqual([
      "bookingRoute",
      "currency",
      "email",
      "instagramUrl",
      "location",
      "name",
      "timezone",
      "type",
      "whatsappNumber",
      "whatsappUrl",
    ]);
  });
});
