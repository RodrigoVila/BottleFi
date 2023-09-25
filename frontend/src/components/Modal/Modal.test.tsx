import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Modal } from ".";

import { ModalProvider } from "@context/modals";


describe("Modal", () => {
  it("Should render and calls close fn", async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();
    render(
      <ModalProvider>
        <Modal isOpen={true} onClose={mockClose}>
          Test Modal
        </Modal>
      </ModalProvider>
    );

    const text = screen.getByText("Test Modal");
    expect(text).toBeInTheDocument();

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    expect(mockClose).toHaveBeenCalled();
  });
});
