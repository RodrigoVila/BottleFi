import { useState } from "react";

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
  const [, setTokenID] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [isLoading] = useState(false);

  // const clearInputs = () => {
  //   setDestinationAddress("");
  //   setTokenID("");
  // };

  // const handleSubmit = async () => {
  //   if (!tokenID) {
  //     alert("Please select token");
  //     return;
  //   }
  //   if (!destinationAddress) {
  //     alert("Please write a destination address");
  //     return;
  //   }
  //   setIsLoading(true);
  //   // await transfer(tokenID, destinationAddress)
  //   //   .then(() => {
  //   //     setIsLoading(false);
  //   //     setSuccessMessage("Success!");
  //   //     clearInputs();
  //   //   })
  //   //   .catch((e) => {
  //   //     setErrorMessage(`Error: ${e}`);
  //   //     setIsLoading(false);
  //   //     clearInputs();
  //   //   });
  // };

  const tokens = [{ id: "1", name: "asf" }];

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

      <Divider />

      <TokenColumn className="gap-8">
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
