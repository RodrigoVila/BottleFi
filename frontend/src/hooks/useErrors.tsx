import { serializeError } from "eth-rpc-errors";

import { METAMASK_POSSIBLE_ERRORS } from "@constants";

import { useToastNotifications } from "./useToastNotifications";

export const useErrors = () => {
  const { showErrorNotification } = useToastNotifications();

  // TODO: Improve this hook and how errors are being parsed/read
  const notifyMetamaskErrors = (err: unknown) => {
    const serErr = serializeError(err);
    const code = serErr.code.toString();
    const error = METAMASK_POSSIBLE_ERRORS[code];

    showErrorNotification(error.message);

    // if (error.message.includes("user rejected transaction")) {
    //   showErrorNotification("User rejected transaction");
    //   return;
    // }

    // if (error.message.includes("reverted with reason")) {
    //   const err = parseRevertErrorMessage(error);
    //   if (err.includes("Invalid tokens can")) {
    //     const err = "Invalid tokens can't be transferred";
    //     showErrorNotification(err);
    //     return;
    //   }
    //   showErrorNotification(err);
    //   return;
    // }
  };
  return { notifyMetamaskErrors };
};
