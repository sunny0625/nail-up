import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Vitest globals are off (imports stay explicit), so React Testing Library
// cannot register its automatic cleanup. Unmount rendered trees after each test
// so tests stay isolated.
afterEach(() => {
  cleanup();
});
