import { useState } from "react";

import { GradientButton } from "@components/Buttons";
import { TextInput, SelectInput } from "@components/Inputs";
import { TokenLayout, TokenTitle } from "./TokenLayout";

export const SellToken = () => {
  const [tokenID, setTokenID] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    // if (!tokenID) {
    //   alert("Please select token");
    //   return;
    // }
    // if (!destinationAddress) {
    //   alert("Please write a destination address");
    //   return;
    // }
    // await sell(tokenID, destinationAddress)
    //   .then(() => {
    //     setIsLoading(false);
    //     setSuccessMessage("Success!");
    //   })
    //   .catch((e) => {
    //     setIsLoading(false);
    //     setErrorMessage(`Error: ${e}`);
    //   });
  };

  const handleData = (data) => {};
  const handleError = (error) => {
    error && alert(`Error pulling data: ${error}`);
  };

  const tokens = [
    {
      id: "1",
      name: "hi",
    },
  ];

  return (
    <TokenLayout>
      <TokenTitle>Transfer and Invalidate Token</TokenTitle>
      <SelectInput
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
        Transfer and Invalidate
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
