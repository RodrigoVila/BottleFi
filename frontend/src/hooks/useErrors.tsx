import { parseRevertErrorMessage, parseCatchError } from "@utils/parse";
import { useToastNotifications } from "./useToastNotifications";
import { serializeError } from "eth-rpc-errors";

export const useErrors = () => {
  const { showErrorNotification } = useToastNotifications();

  const notifyCatchErrors = (err: unknown): string | undefined => {
    const error = serializeError(err);

    if (error.message.includes("user rejected transaction")) {
      showErrorNotification("User rejected transaction");
      return;
    }

    if (error.message.includes("reverted with reason")) {
      const err = parseRevertErrorMessage(error);
      if (err) showErrorNotification(err);
      return;
    }
  };
  return { notifyCatchErrors };
};
