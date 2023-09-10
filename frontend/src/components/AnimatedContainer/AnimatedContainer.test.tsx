import { render, screen } from "@testing-library/react";

import { AnimatedContainer } from "./";

describe("AnimatedContainer", () => {
  it("Should render", () => {
    render(<AnimatedContainer>Test Content</AnimatedContainer>);
    const children = screen.getByText("Test Content");
    expect(children).toBeInTheDocument();
  });

  it("Should apply custom className", () => {
    render(
      <AnimatedContainer className="bg-yellow-400">
        Test Content
      </AnimatedContainer>
    );

    const container = screen.getByTestId("animated-container");
    expect(container).toHaveClass("bg-yellow-400");
  });

  it("Should apply custom bodyClassName", () => {
    render(
      <AnimatedContainer bodyClassName="bg-purple-100">
        Test Content
      </AnimatedContainer>
    );

    const body = screen.getByText("Test Content");
    expect(body).toHaveClass("bg-purple-100");
  });
});
