import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
// provides custom matchers for assertions like toBeInTheDocument
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
