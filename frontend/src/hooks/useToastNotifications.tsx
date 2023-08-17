import { toast, ToastOptions, ToastPromiseParams } from "react-toastify";

const options: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const useToastNotifications = () => {
  const showSuccessNotification = (message: string) => {
    toast.success(message, options);
  };

  const showErrorNotification = (message: string) => {
    toast.error(message, options);
  };

  const showInfoNotification = (message: string) => {
    toast.info(message, options);
  };

  const promiseWithNotifications = (
    promise: Promise<unknown>,
    messages: ToastPromiseParams
  ) => {
    return toast.promise(promise, messages, options);
  };
  
  return {
    showSuccessNotification,
    showErrorNotification,
    showInfoNotification,
    promiseWithNotifications,
  };
};
