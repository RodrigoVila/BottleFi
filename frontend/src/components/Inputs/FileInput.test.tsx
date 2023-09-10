import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FileInput } from "./FileInput";

const fakeFile = new File(["dummy content"], "testfile.txt", { type: "text/plain" });

describe("FileInput", () => {
  it("Should render default input", () => {
    render(<FileInput label="Upload a file" value={null} />);
    
    const input = screen.getByLabelText("file-input");
    expect(input).toBeInTheDocument();

    const defaultLabel = screen.getByText("Upload a file");
    expect(defaultLabel).toBeInTheDocument();
});

  it("Should display the selected file name", () => {
    render(<FileInput label="Upload a file" value={fakeFile} />);
    
    const uploadTextElement = screen.getByText("testfile.txt");

    expect(uploadTextElement).toBeInTheDocument();
  });

  it("Should call the onChange callback when a file is selected", async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();

    render(<FileInput label="Upload a file" value={null} onChange={onChangeMock} />);
    
    const input = screen.getByLabelText("file-input");

    await user.upload(input, fakeFile);

    expect(onChangeMock).toHaveBeenCalled();
  });
});