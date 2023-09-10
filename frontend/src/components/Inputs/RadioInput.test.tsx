import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RadioInput } from "./";

describe("RadioInput", () => {
  it("Should render", () => {
    render(
      <RadioInput value="Supplier" onChange={() => {}}>
        Test Radio
      </RadioInput>
    );

    const children = screen.getByText("Test Radio");
    expect(children).toBeInTheDocument();
  });

  it("Should render with a custom class name", () => {
      render(
        <RadioInput
          value="Supplier"
          className="custom-class"
          onChange={() => {}}
        >
          Test Radio
        </RadioInput>
      );

      const input = screen.getByRole("radio");
      expect(input).toHaveClass("custom-class");
  });

  it("Should fire onChange fn", async () => {
    const onChangeMock = vi.fn()
    const user = userEvent.setup();

    render(
      <RadioInput
        value="Supplier"
        className="custom-class"
        onChange={onChangeMock}
      >
        Test Radio
      </RadioInput>
    );

    const input = screen.getByRole("radio");
    await user.click(input);
    expect(onChangeMock).toHaveBeenCalled();
  });
});
