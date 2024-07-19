import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { RolesModal } from ".";

import { ModalProvider } from "@context/modals";
import { useModalContext } from "@hooks";

vi.mock("@utils/ethers", () => ({
  getSigner: vi.fn(),
}));

describe("RolesModal", () => {
  it("Should render intial state", () => {
    const { isRolesModalOpen, setRolesModalOpen } = renderSut();

    expect(isRolesModalOpen).toBe(false);
    expect(setRolesModalOpen).toBeDefined();
  });
});

const renderSut = () => {
  render(
    <ModalProvider>
      <RolesModal />
    </ModalProvider>
  );
  const { result } = renderHook(useModalContext);
  return result.current;
};
