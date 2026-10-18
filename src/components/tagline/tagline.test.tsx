import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";
import { Tagline } from "#/components/tagline/tagline";

vi.setConfig({ testTimeout: 1000 });

describe("tagline", () => {
  it("should render the component", () => {
    // Act
    expect.hasAssertions();
    render(<Tagline />);
    const tagline = screen.getByRole("heading");
    // Assert
    expect(tagline).toBeInTheDocument();
    expect(tagline).toHaveTextContent(
      "An opinionated template for SPA React projects built with Vite.",
    );
  });
});
