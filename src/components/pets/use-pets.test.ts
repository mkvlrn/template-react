import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { type ReactElement, type ReactNode, createElement } from "react";
import { describe, expect, it, vi } from "vite-plus/test";
import { usePets } from "#/components/pets/use-pets";

vi.setConfig({ testTimeout: 1000 });

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }): ReactElement =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

describe("use pets hook", () => {
  it("should return loading state initially", () => {
    // Arrange
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ message: "DOG" }));
    // Act
    const { result } = renderHook(() => usePets("dog"), { wrapper: createWrapper() });
    // Assert
    expect(result.current.loading).toBe(true);
    expect(result.current.ready).toBe(false);
  });

  it("should return dog image successfully", async () => {
    // Arrange
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ message: "DOG" }));
    // Act
    const { result } = renderHook(() => usePets("dog"), { wrapper: createWrapper() });
    // Assert
    await waitFor(() => expect(result.current.ready).toBe(true));
    expect(result.current.data).toBe("DOG");
    expect(result.current.error).toBe(false);
  });

  it("should return cat image successfully", async () => {
    // Arrange
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json([{ url: "CAT" }]));
    // Act
    const { result } = renderHook(() => usePets("cat"), { wrapper: createWrapper() });
    // Assert
    await waitFor(() => expect(result.current.ready).toBe(true));
    expect(result.current.data).toBe("CAT");
    expect(result.current.error).toBe(false);
  });

  it("should return error state for invalid pet type", async () => {
    // Arrange
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({}));
    // Act
    const { result } = renderHook(
      // @ts-expect-error -- passing an invalid pet type on purpose
      () => usePets("hamster"),
      { wrapper: createWrapper() },
    );
    // Assert
    await waitFor(() => expect(result.current.error).toBe(true));
  });

  it("should return error state if network error occurs", async () => {
    // Arrange
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));
    // Act
    const { result } = renderHook(() => usePets("dog"), { wrapper: createWrapper() });
    // Assert
    await waitFor(() => expect(result.current.error).toBe(true));
    expect(result.current.ready).toBe(false);
  });

  it("should return error state if dog response has invalid shape", async () => {
    // Arrange
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ url: "DOG" }));
    // Act
    const { result } = renderHook(() => usePets("dog"), { wrapper: createWrapper() });
    // Assert
    await waitFor(() => expect(result.current.error).toBe(true));
    expect(result.current.data).toBeUndefined();
  });

  it("should return error state if cat response is not an array", async () => {
    // Arrange
    expect.hasAssertions();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ url: "CAT" }));
    // Act
    const { result } = renderHook(() => usePets("cat"), { wrapper: createWrapper() });
    // Assert
    await waitFor(() => expect(result.current.error).toBe(true));
    expect(result.current.data).toBeUndefined();
  });
});
