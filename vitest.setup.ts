/* oxlint-disable typescript/no-empty-interface, typescript/no-empty-object-type, typescript/no-explicit-any, id-length */
import "@testing-library/jest-dom/vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vite-plus/test" {
  interface Assertion<R, T> extends TestingLibraryMatchers<any, T> {}
}
