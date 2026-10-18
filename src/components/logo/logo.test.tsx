import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";
import { Logo } from "#/components/logo/logo";

vi.setConfig({ testTimeout: 1000 });

describe("logo", () => {
  it("should render the component", () => {
    // Act
    expect.hasAssertions();
    render(<Logo />);
    const logo = screen.getByRole("img");
    // Assert
    expect(logo).toBeInTheDocument();
  });
});
