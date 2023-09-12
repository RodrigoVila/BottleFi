import { act, render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { ChainSwitchModal } from ".";

import { ModalProvider } from "@context/modals";
import { useModalContext } from "@hooks";

vi.mock("@utils/ethers", () => ({
  connectToSupportedNetwork: vi.fn(),
}));

// TODO: Add test cases 
describe("ChainSwitchModal", () => {
  it("Should render intial state", () => {
    const { isChainSwitchModalOpen, setChainSwitchModalOpen } = renderSut();

    expect(isChainSwitchModalOpen).toBe(false);
    expect(setChainSwitchModalOpen).toBeDefined();
  });
});

const renderSut = () => {
  render(
    <ModalProvider>
      <ChainSwitchModal />
    </ModalProvider>
  );
  const { result } = renderHook(useModalContext);
  return result.current;
};
