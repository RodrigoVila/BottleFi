import { ChangeEvent, MouseEvent, useState } from "react";

import {
  useDappContext,
  useIPFS,
  useModalContext,
  useNFTContract,
  useToastNotifications,
  useWallet,
} from "@hooks";
import { GradientButton } from "@components/Buttons";
import { FileInput, TextInput } from "@components/Inputs";
import { IPFSStorageData } from "@types";

import {
  Divider,
  TokenColumn,
  TokenDescription,
  TokenLayout,
  TokenTitle,
} from "./Layout";

const initialData = { name: "", description: "" };

export const MintToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<IPFSStorageData>(initialData);

  const { getTokens } = useDappContext();
  const { setChainSwitchModalOpen } = useModalContext();

  const { uploadDataToIPFS } = useIPFS();
  const { isCorrectChainId } = useWallet();
  const { mintToken } = useNFTContract();
  const { showInfoNotification, showSuccessNotification } =
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
      showInfoNotification("Every input is mandatory");
      return;
    }

    if (userData.name.length > 20) {
      showInfoNotification("Max characters for name is 20");
      return;
    }

    if (userData.description.length > 50) {
      showInfoNotification("Max characters for description is 50");
      return;
    }

    const isChainIdCorrect = await isCorrectChainId();

    if (!isChainIdCorrect) {
      setChainSwitchModalOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      // First we upload the token image in order to obtain it's ipfs path
      const path = await uploadDataToIPFS(file);
      if (path) {
        // Then we upload again the metadata with the image included
        const uri = await uploadDataToIPFS({ ...userData, image: path });
        if (uri) {
          const minted = await mintToken(uri);
          if (minted) {
            showSuccessNotification(
              "Token minted successfully. Go to dashboard to see it!"
            );
            // We get tokens after mint so they are loaded at the dashboard when we go back
            getTokens();
          }
        }
      }
    } catch (err) {
      // Errors are handled by the useNFTContract hook. No need to notify here.
      console.error("Mint Token Error: ", err);
    } finally {
      setIsLoading(false);
      setFile(null);
      setUserData(initialData);
    }
  };

  return (
    <TokenLayout>
      <TokenColumn>
        <TokenTitle>Mint: Generates an authentic token</TokenTitle>
        <TokenDescription>
          Involves creating a one-of-a-kind digital certificate on the
          blockchain. You hold the exclusive ability to ensure the token's
          authenticity by transfer or sell it.
        </TokenDescription>
      </TokenColumn>

      <Divider type="horizontal" />

      <TokenColumn className="justify-between">
        <TextInput
          label="Name"
          value={userData.name}
          onChange={handleInputChange}
        />

        <TextInput
          label="Description"
          value={userData.description}
          onChange={handleInputChange}
        />

        <FileInput
          label="Token Image"
          value={file}
          onChange={handleFileSelect}
        />

        <GradientButton loading={isLoading} onClick={handleSubmit}>
          Mint
        </GradientButton>
      </TokenColumn>
    </TokenLayout>
  );
};
