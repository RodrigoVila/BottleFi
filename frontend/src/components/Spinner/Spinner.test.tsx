import { render, screen } from "@testing-library/react";

import { Spinner } from "./";

describe("Button", () => {
  it("Should render", () => {
    render(<Spinner />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("Should render label, modify svgClassName and labelClasName", () => {
    render(
      <Spinner svgClassName="svg-classname" labelClasName="label-classname">
        Test Spinner
      </Spinner>
    );

    const spinner = screen.getByRole("status");
    const svg = spinner.firstChild;
    expect(svg).toHaveClass("svg-classname");

    const label = screen.getByText("Test Spinner");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("label-classname");
  });
});
