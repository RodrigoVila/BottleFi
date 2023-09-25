import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GradientButton } from "./";

describe("GradientButton", () => {
  it("Should render", () => {
    render(<GradientButton>Test Button</GradientButton>);

    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toBeInTheDocument();
  });

  const mockOnClick = vi.fn();
  it("Should accept classname and onclick props", async () => {
    const user = userEvent.setup();

    render(
      <GradientButton bodyClassName="leading-5" onClick={mockOnClick}>
        Test Button
      </GradientButton>
    );

    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button.firstChild).toHaveClass("leading-5");

    await user.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it("Should render spinner and change styles when loading", async () => {
    render(
      <GradientButton loading onClick={mockOnClick}>
        Test Button
      </GradientButton>
    );

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-slate-500");
    expect(button.firstChild).toHaveClass("pointer-events-none");

    expect(button).toBeDisabled();
  });
});
