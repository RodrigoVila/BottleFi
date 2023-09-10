import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SelectInput } from "./";

const testOptions = [
  {
    id: 1,
    name: "test name",
    description: "test desc",
    image: "www.imageuri.com",
    mintedAt: "minted date",
    isValid: true,
  },
  {
    id: 2,
    name: "test name2",
    description: "test desc2",
    image: "www.imageuri2.com",
    mintedAt: "minted date2",
    isValid: false,
  },
];

describe("SelectInput", () => {
  it("Should render", () => {
    render(
      <SelectInput label="test label" options={testOptions}>
        Test Select
      </SelectInput>
    );

    const input = screen.getByPlaceholderText("Select a token");
    expect(input).toBeInTheDocument();

    const label = screen.getByText("test label");
    expect(label).toBeInTheDocument();
  });
  it("Should render options", () => {
    render(<SelectInput options={testOptions}>Test Select</SelectInput>);

    const options = screen.getAllByRole("option");
    //Default (disabled) + 2 actual options
    expect(options).toHaveLength(3);
  });

  it("Should fire onChange fn", async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();

    render(
      <SelectInput options={testOptions} onChange={onChangeMock}>
        Test Select
      </SelectInput>
    );

    const input = screen.getByPlaceholderText("Select a token");
    await user.selectOptions(input, "2");
    expect(onChangeMock).toHaveBeenCalled();
  });
});
