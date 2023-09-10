import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./";

describe("Button", () => {
  it("Should render", () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toBeInTheDocument();
  });

  const mockOnClick = vi.fn();
  it("Should accept classname and onclick props", async () => {
    const user = userEvent.setup();

    render(
      <Button className="bg-slate-200" onClick={mockOnClick}>
        Test Button
      </Button>
    );

    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toHaveClass("bg-slate-200");

    await user.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it("Should change styles when loading", async () => {
    render(
      <Button loading onClick={mockOnClick}>
        Test Button
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("bg-slate-500");
    expect(button).toHaveClass("pointer-events-none");
    expect(button).toHaveTextContent("Loading");
  });
});
