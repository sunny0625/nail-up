import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageContainer, type PageContainerWidth } from "@/components/layout/page-container";

/*
 * jsdom does not load the Tailwind stylesheet, so computed widths are not
 * available here. Instead the test checks that the container carries the
 * container-width token utility (max-w-<token>), that each such utility is
 * backed by a --container-<token> design token in app/globals.css, and that
 * no hard-coded width (inline style or arbitrary value) is used.
 */

const EXPECTED_WIDTH_CLASS: Record<PageContainerWidth, string> = {
  narrow: "max-w-narrow",
  content: "max-w-content",
  wide: "max-w-wide",
};

function renderContainer(width?: PageContainerWidth) {
  const { container } = render(
    <PageContainer width={width}>
      <p>Container content</p>
    </PageContainer>,
  );
  const element = container.firstElementChild as HTMLElement;
  return { element, classes: element.className.split(/\s+/).filter(Boolean) };
}

describe("PageContainer", () => {
  it("renders its children", () => {
    const { element } = renderContainer();
    expect(screen.getByText("Container content")).toBeTruthy();
    expect(element.contains(screen.getByText("Container content"))).toBe(true);
  });

  it("applies the content container-width token class by default", () => {
    const { classes } = renderContainer();
    expect(classes).toContain("max-w-content");
  });

  it.each(Object.entries(EXPECTED_WIDTH_CLASS) as [PageContainerWidth, string][])(
    "applies exactly one container-width token class for width=%s",
    (width, expectedClass) => {
      const { classes } = renderContainer(width);
      const maxWidthClasses = classes.filter((c) => c.startsWith("max-w-"));
      expect(maxWidthClasses).toEqual([expectedClass]);
    },
  );

  it("uses container-width classes that are backed by --container-* design tokens", () => {
    // Vitest runs from the project root. (import.meta.url is not a file: URL under jsdom.)
    const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
    const declaredTokens = [...css.matchAll(/--container-([a-z0-9-]+)\s*:/g)].map((m) => m[1]);
    for (const expectedClass of Object.values(EXPECTED_WIDTH_CLASS)) {
      expect(declaredTokens).toContain(expectedClass.replace("max-w-", ""));
    }
  });

  it("does not use a hard-coded width", () => {
    for (const width of Object.keys(EXPECTED_WIDTH_CLASS) as PageContainerWidth[]) {
      const { element, classes } = renderContainer(width);
      // No inline styles, and no arbitrary-value utilities such as max-w-[1152px].
      expect(element.getAttribute("style")).toBeNull();
      expect(classes.filter((c) => c.includes("["))).toEqual([]);
    }
  });
});
