import { render, screen } from "@testing-library/react";

import { Portal } from "./Portal";

describe("Portal", () => {
  it("Should render with default wrapper", () => {
    render(
      <Portal>
        <p>Test portal</p>
      </Portal>
    );
    const testParagraph = screen.getByText("Test portal");
    expect(testParagraph.parentElement).toHaveAttribute(
      "id",
      "react-portal-wrapper"
    );
  });

  it("Should render with custom wrapper", () => {
    render(
      <Portal wrapperId="custom-wrapper">
        <p>Test portal</p>
      </Portal>
    );
    const testParagraph = screen.getByText("Test portal");
    expect(testParagraph.parentElement).toHaveAttribute("id", "custom-wrapper");
  });
});
