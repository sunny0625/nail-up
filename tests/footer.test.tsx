import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/footer";

/*
 * Renders the Footer and checks what a visitor can actually use: a link to every
 * public route, and the WhatsApp, Instagram and email contact links with the
 * correct destinations and accessible names. Expected values are the confirmed
 * routes and facts (Requirements 4.9-4.12), written as literals.
 */

const PUBLIC_ROUTES = [
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
];

function renderFooter() {
  render(<Footer />);
  return within(screen.getByRole("contentinfo"));
}

describe("Footer", () => {
  it("links to each of the ten public routes exactly once, including /privacy and /terms", () => {
    const footer = renderFooter();
    const internalHrefs = footer
      .getAllByRole("link")
      .map((link) => link.getAttribute("href") ?? "")
      .filter((href) => href.startsWith("/"));

    expect([...internalHrefs].sort()).toEqual([...PUBLIC_ROUTES].sort());
  });

  it("has a WhatsApp link with the exact URL and an accessible label", () => {
    const link = renderFooter().getByRole("link", { name: "Nail Up on WhatsApp" });
    expect(link.getAttribute("href")).toBe("https://wa.me/16473347600");
  });

  it("has an Instagram link with the exact URL (no tracking parameters) and an accessible label", () => {
    const link = renderFooter().getByRole("link", { name: "Nail Up on Instagram" });
    expect(link.getAttribute("href")).toBe("https://www.instagram.com/nailup_/");
  });

  it("has an email link named by the address that starts a message to it", () => {
    const link = renderFooter().getByRole("link", { name: "prabhvirdi3011@gmail.com" });
    expect(link.getAttribute("href")).toBe("mailto:prabhvirdi3011@gmail.com");
  });
});
