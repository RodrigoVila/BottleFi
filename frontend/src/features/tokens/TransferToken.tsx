import { useState } from "react";

import { GradientButton } from "@components/Buttons";
import { TextInput, SelectInput } from "@components/Inputs";

import {
  Divider,
  TokenColumn,
  TokenDescription,
  TokenLayout,
  TokenTitle,
} from "./Layout";

export const TransferToken = () => {
  const [tokenID, setTokenID] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clearInputs = () => {
    setSuccessMessage("");
    setErrorMessage("");
    setDestinationAddress("");
    setTokenID("");
  };

  const handleSubmit = async () => {
    if (!tokenID) {
      alert("Please select token");
      return;
    }
    if (!destinationAddress) {
      alert("Please write a destination address");
      return;
    }
    setIsLoading(true);
    // await transfer(tokenID, destinationAddress)
    //   .then(() => {
    //     setIsLoading(false);
    //     setSuccessMessage("Success!");
    //     clearInputs();
    //   })
    //   .catch((e) => {
    //     setErrorMessage(`Error: ${e}`);
    //     setIsLoading(false);
    //     clearInputs();
    //   });
  };

  const tokens = [{ id: "1", name: "asf" }];

  return (
    <TokenLayout>
      <TokenColumn>
        <TokenTitle>
          Transfer: Passing Ownership, Preserving Authenticity
        </TokenTitle>
        <TokenDescription>
          Transfer enables you to easily exchange ownership of a token, while
          keeping it's validity. For example, a cellar transfering products to a
          vendor who later will sell (invalidate) the token for the final
          consumer.
        </TokenDescription>
      </TokenColumn>

      <Divider />

      <TokenColumn>
        <SelectInput
          label="Token to transfer"
          options={tokens}
          onChange={(e) => setTokenID(e.target.value)}
          required
        />
        <TextInput
          label="Address"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
          required
        />
        <GradientButton loading={isLoading} onClick={() => {}}>
          Transfer
        </GradientButton>
      </TokenColumn>
    </TokenLayout>
  );
};
