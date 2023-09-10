import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextInput } from "./";

describe("TextInput", () => {
  it("Should render", () => {
    render(<TextInput label="Username" />);

    const labelElement = screen.getByText("Username");
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("Should render without a label", () => {
    render(<TextInput />);

    const labelElement = screen.queryByText("Username");
    expect(labelElement).not.toBeInTheDocument();
  });

  it("Should render with a custom class name", () => {
    render(<TextInput className="custom-class" />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("custom-class");
  });

  it("Should fire onChange fn", async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();
    
    render(<TextInput onChange={(e) => onChangeMock(e.target.value)} />);

    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "test abc");
    expect(onChangeMock).toHaveBeenCalledWith("test abc");
  });
});
