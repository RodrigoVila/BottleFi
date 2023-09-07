import { serializeError } from "eth-rpc-errors";

import { parseRevertErrorMessage } from "@utils/parse";

import { useToastNotifications } from "./useToastNotifications";

export const useErrors = () => {
  const { showErrorNotification } = useToastNotifications();

  // TODO: Improve this hook and how errors are being parsed/read
  const notifyCatchErrors = (err: unknown): string | undefined => {
    const error = serializeError(err);

    if (error.message.includes("user rejected transaction")) {
      showErrorNotification("User rejected transaction");
      return;
    }

    if (error.message.includes("reverted with reason")) {
      const err = parseRevertErrorMessage(error);
      if (err.includes("Invalid tokens can")) {
        const err = "Invalid tokens can't be transferred";
        showErrorNotification(err);
        return;
      }
      showErrorNotification(err);
      return;
    }
  };
  return { notifyCatchErrors };
};
