import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MobileNav } from "@/components/layout/mobile-nav";
import { businessConfig } from "@/lib/config/business";

/*
 * Keyboard contract of the mobile menu (Task 17). Real keyboard activation
 * (Tab, Enter, Space) is verified in a real browser; jsdom has no native key
 * activation, so these tests cover the parts it can observe: a native button,
 * the ARIA state, the closed panel being hidden, and Escape closing the menu
 * and returning focus to the toggle.
 */

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

function renderMenu() {
  render(<MobileNav routes={businessConfig.routes} />);
  const toggle = screen.getByRole("button", { name: "Menu" });
  const panel = document.getElementById(toggle.getAttribute("aria-controls") ?? "");
  if (!panel) throw new Error("toggle's aria-controls does not point at a panel");
  return { toggle, panel };
}

describe("MobileNav keyboard contract", () => {
  it("uses a native button wired to its panel, closed by default", () => {
    const { toggle, panel } = renderMenu();
    expect(toggle.tagName).toBe("BUTTON");
    expect(toggle.getAttribute("type")).toBe("button");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    // Closed: visibility hidden, which removes the links from the tab order.
    expect(panel.className.split(/\s+/)).toContain("invisible");
  });

  it("opens to expose every public-route link and reports the expanded state", () => {
    const { toggle, panel } = renderMenu();
    fireEvent.click(toggle);

    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(toggle.textContent).toBe("Close");
    expect(panel.className.split(/\s+/)).toContain("visible");
    const hrefs = within(panel).getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(businessConfig.routes.map((route) => route.path));
  });

  it("closes on Escape and returns focus to the toggle", () => {
    const { toggle, panel } = renderMenu();
    fireEvent.click(toggle);
    within(panel).getAllByRole("link")[0].focus();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(panel.className.split(/\s+/)).toContain("invisible");
    expect(document.activeElement).toBe(toggle);
  });

  it("closes again when the toggle is activated a second time", () => {
    const { toggle } = renderMenu();
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.textContent).toBe("Menu");
  });
});
