import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const projectRoot = fileURLToPath(new URL("./", import.meta.url));

export default defineConfig({
  resolve: {
    // Mirrors the `@/*` -> `./*` path alias in tsconfig.json. The pattern only
    // matches "@/...", so scoped packages such as "@testing-library/react" are unaffected.
    alias: [{ find: /^@\//, replacement: projectRoot }],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    // The single top-level tests directory (see the Foundation design).
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
