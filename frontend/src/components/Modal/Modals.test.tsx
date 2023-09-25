import { render } from "@testing-library/react";

import { Modals } from ".";

import { ModalProvider } from "@context/modals";

describe("Modals", () => {
  it("Should render", () => {
    const { container } = render(
      <ModalProvider>
        <Modals />
      </ModalProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
