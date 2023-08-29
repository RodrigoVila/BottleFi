import { ChangeEvent, MouseEvent, useState } from "react";

import { useIPFS, useNFTContract, useToastNotifications } from "@hooks";
import { GradientButton } from "@components/Buttons";
import { FileInput, TextInput } from "@components/Inputs";
import { IPFSStorageData } from "@types";

import {
  Divider,
  TokenColumn,
  TokenDescription,
  TokenLayout,
  TokenTitle,
} from "./layout";

export const MintToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<IPFSStorageData>({
    name: "",
    description: "",
  });

  const { uploadFileToIPFS, uploadMetadataToIPFS } = useIPFS();

  const { mintToken } = useNFTContract();

  const { showErrorNotification, showSuccessNotification } =
    useToastNotifications();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e?.target.name;
    const value = e?.target?.value;

    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userData.name || !userData.description || !file) {
      showErrorNotification("Every input is mandatory");
      return;
    }

    setIsLoading(true);

    try {
      // First we upload the token image in order to obtain it's ipfs path
      const path = await uploadFileToIPFS(file);
      if (path) {
        // Then we upload again the metadata with the image included
        const uri = await uploadMetadataToIPFS({ ...userData, image: path });
        if (uri) {
          const success = await mintToken(uri);
          if (success) {
            showSuccessNotification(
              "Token minted successfully. Go to dashboard to see it!"
            );
          }
        }
      }
    } catch (err) {
      // Error messages are being handled by the "notifyPromise" fn
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
          value={userData.name}
          onChange={handleInputChange}
          required
        />

        <TextInput
          label="Description"
          value={userData.description}
          onChange={handleInputChange}
          required
        />

        <FileInput onChange={handleFileSelect} />

        <GradientButton loading={isLoading} onClick={handleSubmit}>
          Add
        </GradientButton>
      </TokenColumn>
    </TokenLayout>
  );
};
