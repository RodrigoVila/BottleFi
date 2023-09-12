import * as ToastLibrary from "react-toastify";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { useToastNotifications } from "@hooks";

const options = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

vi.mock("react-toastify", async () => {
  const actual = (await vi.importActual(
    "react-toastify"
  )) as typeof ToastLibrary;
  return {
    ...actual,
    toast: {
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      warning: vi.fn(),
    },
  };
});

describe("useToastNotifications", () => {
  it("Should render success notification", async () => {
    const { showSuccessNotification } = renderSut();

    showSuccessNotification("Test success");
    expect(ToastLibrary.toast.success).toHaveBeenCalledWith("Test success",options);
  });

  it("Should render error notification", async () => {
    const { showErrorNotification } = renderSut();

    showErrorNotification("Test error");
    expect(ToastLibrary.toast.error).toHaveBeenCalledWith("Test error",options);
  });

  it("Should render info notification", async () => {
    const { showInfoNotification } = renderSut();

    showInfoNotification("Test info");
    expect(ToastLibrary.toast.info).toHaveBeenCalledWith("Test info",options);
  });

  it("Should render warning notification", async () => {
    const { showWarningNotification } = renderSut();

    showWarningNotification("Test warning");
    expect(ToastLibrary.toast.warning).toHaveBeenCalledWith("Test warning",options);
  });
});

const renderSut = () => {
  render(<ToastLibrary.ToastContainer />);
  const { result } = renderHook(useToastNotifications);
  return result.current;
};
