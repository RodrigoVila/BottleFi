import { useState } from "react";

import { GradientButton } from "@components/Buttons";
import { TextInput, SelectInput } from "@components/Inputs";

import { TokenLayout, TokenTitle } from "./TokenLayout";

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
      <TokenTitle>Transfer Token</TokenTitle>
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
      {errorMessage && (
        <p className="m-0 mt-1 font-semibold text-center text-red-300">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="m-0 mt-1 font-semibold text-center text-green-300">
          {successMessage}
        </p>
      )}
    </TokenLayout>
  );
};
