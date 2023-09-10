import { render, screen } from "@testing-library/react";

import { Logo } from ".";

describe("AnimatedContainer", () => {
  it("Should render with default styles", () => {
    render(<Logo />);
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("flex-col");

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent("BottleFi");
    expect(title).toHaveClass("text-5xl");
  });

  it("Should render navbar styles", async () => {
    render(<Logo type="navbar" />);
    const logo = screen.getByTestId("logo");
    expect(logo).toHaveClass("flex-row ml-2");

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveClass("text-2xl");
  });
});
