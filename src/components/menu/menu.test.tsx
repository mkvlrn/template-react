import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";
import { Menu } from "#/components/menu/menu";

vi.setConfig({ testTimeout: 1000 });

function renderMenu() {
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ["/"] }),
    routeTree: createRootRoute({ component: Menu }),
  });
  return render(<RouterProvider router={router} />);
}

describe("menu", () => {
  it("should render navigation links", async () => {
    // Act
    expect.hasAssertions();
    renderMenu();
    await screen.findByRole("link", { name: "Home" });
    // Assert
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Dogs!" })).toHaveAttribute("href", "/dogs");
    expect(screen.getByRole("link", { name: "Cats!" })).toHaveAttribute("href", "/cats");
  });

  it("should apply the active link class", async () => {
    // Act
    expect.hasAssertions();
    renderMenu();
    // Assert
    for (const link of await screen.findAllByRole("link")) {
      expect(link).toHaveClass("[&.active]:font-bold");
    }
  });
});
