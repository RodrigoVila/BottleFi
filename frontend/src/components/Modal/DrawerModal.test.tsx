import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { DrawerModal } from ".";

import { ModalProvider } from "@context/modals";
import { useModalContext } from "@hooks";

describe("DrawerModal", () => {
  it("Should render intial state", () => {
    const { isDrawerModalOpen, setDrawerModalOpen } = renderSut();

    expect(isDrawerModalOpen).toBe(false);
    expect(setDrawerModalOpen).toBeDefined();
  });
});

const renderSut = () => {
  render(
    <ModalProvider>
      <DrawerModal />
    </ModalProvider>
  );
  const { result } = renderHook(useModalContext);
  return result.current;
};
