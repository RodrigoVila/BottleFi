import { render, screen } from "@testing-library/react";

import { Modals } from ".";

import { ModalProvider } from "@context/modals";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual, //TODO: Fix types
    useNavigate: vi.fn(),
  };
});

vi.mock("@utils/ethers", async () => {
  const actual = await vi.importActual("@utils/ethers");
  return {
    ...actual, //TODO: Fix types
    connectToSupportedNetwork: vi.fn(),
    getSigner: vi.fn(),
  };
});

describe("Modals", () => {
  it("Should render", () => {
    const { container } = render(
      <ModalProvider>
        <Modals />
      </ModalProvider>
    );
    screen.debug();
    expect(container).toBeDefined();
  });
});
