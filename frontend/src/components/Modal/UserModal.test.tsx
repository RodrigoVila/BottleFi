import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { UserModal } from ".";

import { ModalProvider } from "@context/modals";
import { useModalContext } from "@hooks";

describe("UserModal", () => {
  // TODO: Fix
  it.skip("Should render intial state", () => {
    const { isUserModalOpen, setUserModalOpen } = renderSut();

    expect(isUserModalOpen).toBe(false);
    expect(setUserModalOpen).toBeDefined();
  });
});

const renderSut = () => {
  render(
    <ModalProvider>
      <UserModal />
    </ModalProvider>
  );
  const { result } = renderHook(useModalContext);
  return result.current;
};
