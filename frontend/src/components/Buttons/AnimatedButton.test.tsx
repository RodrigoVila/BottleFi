import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AnimatedButton } from "./";

describe("AnimatedContainer", () => {
  it("Should render", () => {
    render(<AnimatedButton>Test Button</AnimatedButton>);

    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toBeInTheDocument();
  });

  const mockOnClick = vi.fn();
  it("Should accept classname and onclick props", async () => {
    const user = userEvent.setup();

    render(
      <AnimatedButton className="bg-slate-200" onClick={mockOnClick}>
        Test Button
      </AnimatedButton>
    );

    const button = screen.getByText("Test Button");
    expect(button).toHaveClass("bg-slate-200");

    await user.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
