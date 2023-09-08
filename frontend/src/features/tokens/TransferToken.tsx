import { useState } from "react";

import { useDappContext, useNFTContract, useToastNotifications } from "@hooks";
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

  const { tokens } = useDappContext();
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
    setIsLoading(true);

    try {
      const success = await transferToken(
        destinationAddress,
        parseInt(tokenId)
      );
      if (success) {
        showSuccessNotification(
          "Token transfered successfully. Try checking sender/receiver dashboards!"
        );
      }
    } catch (err) {
      // Errors are handled by the useNFTContract hook. No need to notify here.
      console.error("Transfer error: ", err);
    } finally {
      setIsLoading(false);
      clearInputs();
    }
  };

  return (
    <TokenLayout>
      <TokenColumn>
        <TokenTitle>
          Transfer: Passes ownership, keeping authenticity
        </TokenTitle>
        <TokenDescription>
          Transfer enables you to exchange ownership of a token while keeping
          it's validity. For example, a supplier transfering products to a
          vendor who later will sell (invalidate) the token for the final
          consumer.
        </TokenDescription>
      </TokenColumn>

      <Divider type="vertical" />

      <TokenColumn className="gap-8">
        <SelectInput
          label="Token to transfer"
          options={tokens}
          onChange={(e) => setTokenId(e.target.value)}
          required
        />
        <TextInput
          label="Address"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
          required
        />
        <GradientButton loading={isLoading} onClick={handleSubmit}>
          Transfer
        </GradientButton>
      </TokenColumn>
    </TokenLayout>
  );
};
