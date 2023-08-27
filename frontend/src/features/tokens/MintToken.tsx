import { ChangeEvent,MouseEvent, useState } from "react";

import { useIPFS,useNFTContract, useToastNotifications } from "@hooks";
import { FileInputModalButton, GradientButton } from "@components/Buttons";
import { TextInput } from "@components/Inputs";

import {
  Divider,
  TokenColumn,
  TokenDescription,
  TokenLayout,
  TokenTitle,
} from "./layout";

const initialState = { name: "", description: "" };

export const MintToken = () => {
  const [userData, setUserData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { name, description } = userData;

  const {
    handleFileSelect,
    fileBuffer,
    uploadFileToIPFS,
    uploadMetadataToIPFS,
  } = useIPFS();

  const { mintToken, getTokens } = useNFTContract();

  const { showErrorNotification, showSuccessNotification } =
    useToastNotifications();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e?.target.name;
    const value = e?.target?.value;

    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!name || !description || !fileBuffer) {
      showErrorNotification("Every input is mandatory");
      return;
    }

    setIsLoading(true);

    try {
      const image = await uploadFileToIPFS();
      if (image) {
        const tokenURI = await uploadMetadataToIPFS(name, description, image);
        if (tokenURI) {
          const minted = await mintToken(tokenURI);
          if (minted) {
            showSuccessNotification(
              "Token minted successfully. Go to dashboard to see it!"
            );
          }
        }
      }
    } catch (err) {
      //Error messages are being handled by the "notifyPromise" fn
      console.error("Err at MintToken component", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TokenLayout>
      <TokenColumn>
        <TokenTitle>Mint: Generates an authentic token</TokenTitle>
        <TokenDescription>
          Minting involves creating a one-of-a-kind digital certificate on the
          blockchain. As the initiator, you hold the exclusive ability to ensure
          the token's authenticity whether you decide to sell it or transfer it
          to a new owner.
        </TokenDescription>
      </TokenColumn>

      <Divider />

      <TokenColumn className="justify-between">
        <TextInput
          label="Name"
          value={name}
          onChange={handleInputChange}
          required
        />

        <TextInput
          label="Description"
          value={description}
          onChange={handleInputChange}
          required
        />

        <FileInputModalButton onFileSelect={handleFileSelect} />

        <GradientButton loading={isLoading} onClick={handleSubmit}>
          Add
        </GradientButton>
        <GradientButton onClick={getTokens}>
          Get
        </GradientButton>
      </TokenColumn>
    </TokenLayout>
  );
};
