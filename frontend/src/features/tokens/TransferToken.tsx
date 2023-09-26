import { useState } from "react";

import {
  useDappContext,
  useModalContext,
  useNFTContract,
  useToastNotifications,
  useWallet,
} from "@hooks";
import { GradientButton } from "@components/Buttons";
import { SelectInput, TextInput } from "@components/Inputs";

import {
  Divider,
  TokenColumn,
  TokenDescription,
  TokenLayout,
  TokenTitle,
} from "./layout";

export const TransferToken = () => {
  const [tokenId, setTokenId] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { tokens, getTokens } = useDappContext();
  const { setChainSwitchModalOpen } = useModalContext();
  const { isCorrectChainId } = useWallet();
  const { transferToken } = useNFTContract();
  const { showSuccessNotification, showWarningNotification } =
    useToastNotifications();

  const clearInputs = () => {
    setDestinationAddress("");
    setTokenId("");
  };

  const handleSubmit = async () => {
    if (!tokenId) {
      showWarningNotification("Please select token");
      return;
    }
    if (!destinationAddress) {
      showWarningNotification("Please write a destination address");
      return;
    }

    if (!isCorrectChainId) {
      setChainSwitchModalOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      const transferred = await transferToken(
        destinationAddress,
        parseInt(tokenId)
      );
      if (transferred) {
        showSuccessNotification(
          "Token transfered successfully. Try checking sender/receiver dashboards!"
        );
        // Update token list after transfer
        getTokens();
      }
    } catch (err) {
      // Errors are handled by the useNFTContract hook. No need to notify here.
      console.error("Transfer error: ", err);
    } finally {
      clearInputs();
      setIsLoading(false);
    }
  };

  return (
    <TokenLayout>
      <TokenColumn>
        <TokenTitle>Transfer: Passes token ownership</TokenTitle>
        <TokenDescription>
          It enables you to replace ownership of a token while keeping it's
          validity. For example, a supplier transfering products to a vendor who
          later will sell (invalidate) the token for the final consumer.
        </TokenDescription>
      </TokenColumn>

      <Divider type="vertical" />

      <TokenColumn className="gap-8">
        <SelectInput
          label="Token to transfer"
          options={tokens}
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <TextInput
          label="Address"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
        />
        <GradientButton loading={isLoading} onClick={handleSubmit}>
          Transfer
        </GradientButton>
      </TokenColumn>
    </TokenLayout>
  );
};
