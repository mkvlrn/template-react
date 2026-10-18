import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vite-plus/test";
import { Pets } from "#/components/pets/pets";

vi.setConfig({ testTimeout: 1000 });

const NONE = 0;
const SINGLE = 1;
const FIRST = 0;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("pets", () => {
  it("should show loading state initially", () => {
    // Arrange
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ message: "DOG" }));
    // Act
    render(<Pets type="dog" />, { wrapper: createWrapper() });
    // Assert
    expect(screen.getByText("🐾")).toBeVisible();
    const imgs = screen
      .queryAllByAltText("dog!")
      .filter((img) => getComputedStyle(img).display !== "none");
    expect(imgs).toHaveLength(NONE);
  });

  it("should show dog image when loaded", async () => {
    // Arrange
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ message: "DOG" }));
    // Act
    render(<Pets type="dog" />, { wrapper: createWrapper() });
    // Assert
    await waitFor(() => {
      const imgs = screen
        .queryAllByAltText("dog!")
        .filter((img) => getComputedStyle(img).display !== "none");
      expect(imgs).toHaveLength(SINGLE);
      expect(imgs[FIRST]).toHaveAttribute("src", "DOG");
    });
  });

  it("should show cat image when loaded", async () => {
    // Arrange
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json([{ url: "CAT" }]));
    // Act
    render(<Pets type="cat" />, { wrapper: createWrapper() });
    // Assert
    await waitFor(() => {
      const imgs = screen
        .queryAllByAltText("cat!")
        .filter((img) => getComputedStyle(img).display !== "none");
      expect(imgs).toHaveLength(SINGLE);
      expect(imgs[FIRST]).toHaveAttribute("src", "CAT");
    });
  });

  it("should show error message on fetch failure", async () => {
    // Arrange
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));
    // Act
    render(<Pets type="dog" />, { wrapper: createWrapper() });
    // Assert
    await waitFor(() => {
      const errors = screen
        .queryAllByText("Error loading pet :(")
        .filter((el) => getComputedStyle(el).display !== "none");
      expect(errors).toHaveLength(SINGLE);
    });
  });
});
