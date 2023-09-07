import { useState } from "react";

import { useDappContext } from "@context/dapp";
import { useNFTContract, useToastNotifications } from "@hooks";
import { GradientButton } from "@components/Buttons";
import { SelectInput, TextInput } from "@components/Inputs";

import {
  Divider,
  TokenColumn,
  TokenDescription,
  TokenLayout,
  TokenTitle,
} from "./layout";

export const SellToken = () => {
  const [tokenId, setTokenId] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { tokens } = useDappContext();
  const { sellToken } = useNFTContract();
  const { showWarningNotification, showSuccessNotification } =
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
      const success = await sellToken(destinationAddress, parseInt(tokenId));
      if (success) {
        showSuccessNotification(
          "Token sold successfully. Try checking token authenticity at receivers dashboard!"
        );
      }
    } catch (error) {
      //Todo: Intercept errors
      console.error("Err at Transfer component", error);
    } finally {
      setIsLoading(false);
      clearInputs();
    }
  };

  return (
    <TokenLayout>
      <TokenColumn>
        <TokenTitle>Sell: Passes ownership, invalidating token</TokenTitle>
        <TokenDescription>
          Selling works like transfer but the token becomes invalidated. If the
          user attempts to verify the bottle's authenticity after a selling,
          they will encounter a clear indicator advising them to reconsider
          their purchase due to its questionable status.
        </TokenDescription>
      </TokenColumn>

      <Divider type="vertical" />

      <TokenColumn className="gap-8">
        <SelectInput
          label="Token to sell"
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
          Sell
        </GradientButton>
      </TokenColumn>
    </TokenLayout>
  );
};
