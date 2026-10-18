import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";
import { Title } from "#/components/title/title";

vi.setConfig({ testTimeout: 1000 });

describe("title", () => {
  it("should render the component", () => {
    // Act
    expect.hasAssertions();
    render(<Title />);
    const title = screen.getByRole("heading");
    // Assert
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("React TypeScript SPA");
  });
});
