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

export const SellToken = () => {
  const [tokenId, setTokenId] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { tokens, getTokens } = useDappContext();
  const { setChainSwitchModalOpen } = useModalContext();
  const { sellToken } = useNFTContract();
  const { isCorrectChainId } = useWallet();
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

    if (!isCorrectChainId) {
      setChainSwitchModalOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      const sold = await sellToken(destinationAddress, parseInt(tokenId));
      if (sold) {
        showSuccessNotification(
          "Token sold successfully. Try checking token authenticity at receivers dashboard!"
        );
        // Update token list after sell
        getTokens();
      }
    } catch (error) {
      // Errors are handled by the useNFTContract hook. No need to notify here.
      console.error("Err at Transfer component", error);
    } finally {
      setIsLoading(false);
      clearInputs();
    }
  };

  return (
    <TokenLayout>
      <TokenColumn>
        <TokenTitle>Sell: Transfers token and invalidates it</TokenTitle>
        <TokenDescription>
          The only way to remove authenticity. If the user attempts to verify
          the bottle after a selling, they will encounter a clear indicator
          advising them to reconsider their purchase due to its questionable
          status.
        </TokenDescription>
      </TokenColumn>

      <Divider type="vertical" />

      <TokenColumn className="gap-8">
        <SelectInput
          label="Token to sell"
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
          Sell
        </GradientButton>
      </TokenColumn>
    </TokenLayout>
  );
};
