import { serializeError } from "eth-rpc-errors";

import { METAMASK_POSSIBLE_ERRORS } from "@constants";
import { parseWalletError } from "@utils/parse";

import { useToastNotifications } from "./useToastNotifications";

export const useErrors = () => {
  const { showErrorNotification } = useToastNotifications();

  // TODO: Improve this hook and how errors are being parsed/read
  const notifyMetamaskErrors = (err: unknown) => {
    const serError = serializeError(err);
    const code = serError.code.toString();
    const error = METAMASK_POSSIBLE_ERRORS[code];

    if (error.message.includes("Internal JSON-RPC error")) {
      const err = parseWalletError(serError);
      showErrorNotification(err);
    } else {
      showErrorNotification(error.message);
    }
  };
  return { notifyMetamaskErrors };
};
