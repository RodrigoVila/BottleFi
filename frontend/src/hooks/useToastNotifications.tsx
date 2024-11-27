import { toast, ToastOptions } from "react-toastify";
import { useDappContext } from "./useDappContext";

export const useToastNotifications = () => {
  const { isProfessionalTheme } = useDappContext()
  
  const options: ToastOptions = {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: isProfessionalTheme? "light" :"dark",
  };
  const showSuccessNotification = (message: string) => {
    toast.success(message, options);
  };

  const showErrorNotification = (message: string) => {
    toast.error(message, options);
  };

  const showInfoNotification = (message: string) => {
    toast.info(message, options);
  };

  const showWarningNotification = (message: string) => {
    toast.warning(message, options);
  };
 
  return {
    showSuccessNotification,
    showErrorNotification,
    showInfoNotification,
    showWarningNotification,
  };
};
