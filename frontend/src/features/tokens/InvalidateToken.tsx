import { useState } from "react";

import { GradientButton } from "@components/Buttons";
import { TextInput, SelectInput } from "@components/Inputs";
import {
  Divider,
  TokenColumn,
  TokenDescription,
  TokenLayout,
  TokenTitle,
} from "./layout";

export const InvalidateToken = () => {
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
      <TokenColumn>
        <TokenTitle>
          Sell: Passes ownership, invalidating token
        </TokenTitle>
        <TokenDescription>
          Selling works like transfer but the token becomes invalidated. If the
          user attempts to verify the bottle's authenticity after a selling,
          they will encounter a clear indicator advising them to reconsider
          their purchase due to its questionable status.
        </TokenDescription>
      </TokenColumn>

      <Divider />

      <TokenColumn className="gap-8">
        <SelectInput
          label="Token to sell"
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
          Sell
        </GradientButton>
      </TokenColumn>
    </TokenLayout>
  );
};
