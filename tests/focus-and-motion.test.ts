import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/*
 * Guards the global accessibility rules in app/globals.css (Task 17):
 * a token-based :focus-visible ring and a reduced-motion rule. jsdom does not
 * render CSS, so the rendered ring and motion are verified in a real browser;
 * this test stops the rules themselves from being removed or weakened.
 */

const root = process.cwd(); // Vitest runs from the project root.
const css = readFileSync(resolve(root, "app/globals.css"), "utf8");

/** Body of the first rule whose selector matches, e.g. ":focus-visible { ... }". */
function ruleBody(selector: RegExp): string {
  const match = css.match(new RegExp(`${selector.source}\\s*\\{([^}]*)\\}`));
  return match ? match[1] : "";
}

describe("focus-visible indicator", () => {
  it("is defined with focus design tokens, not literal values", () => {
    const body = ruleBody(/(?:^|\n)\s*:focus-visible/);
    expect(body).toMatch(/outline:\s*var\(--focus-ring-width\)\s+solid\s+var\(--color-focus\)/);
    expect(body).toMatch(/outline-offset:\s*var\(--focus-ring-offset\)/);
  });

  it("uses tokens that are declared in the design system", () => {
    expect(css).toMatch(/--color-focus\s*:/);
    expect(css).toMatch(/--focus-ring-width\s*:/);
    expect(css).toMatch(/--focus-ring-offset\s*:/);
  });

  it("is not removed or overridden by any component", () => {
    const sources: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) walk(path);
        else if (/\.(tsx?|css)$/.test(entry) && !path.endsWith("globals.css")) sources.push(path);
      }
    };
    walk(resolve(root, "app"));
    walk(resolve(root, "components"));
    const offenders = sources.filter((file) =>
      /outline-none|outline-0|outline:\s*(none|0)|focus(-visible)?:outline/.test(readFileSync(file, "utf8")),
    );
    expect(offenders).toEqual([]);
  });
});

describe("reduced motion", () => {
  it("turns off transitions and animations when the user prefers reduced motion", () => {
    const block = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?\})\s*\}/);
    expect(block).not.toBeNull();
    const body = block![1];
    expect(body).toMatch(/transition-duration:\s*0s\s*!important/);
    expect(body).toMatch(/animation-duration:\s*0s\s*!important/);
    expect(body).toMatch(/\*/); // applies to every element
  });
});
