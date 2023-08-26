import { useState, MouseEvent, ChangeEvent } from "react";

import { useIPFS } from "@hooks";

import { GradientButton } from "@components/Buttons";
import { TextInput, FileInput } from "@components/Inputs";

import { TokenTitle, TokenLayout, Divider } from "./Layout";
import { useToastNotifications } from "@hooks";
import { UPLOAD_FILE_MESSAGES, UPLOAD_METADATA_MESSAGES } from "@constants";
import { TokenDescription } from "./Layout/TokenDescription";
import { TokenColumn } from "./Layout/TokenColumn";

const initialState = { name: "", description: "" };

export const MintToken = () => {
  const [userData, setUserData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { name, description } = userData;

  const {
    handleFileInput,
    fileBuffer,
    uploadFileToIPFS,
    uploadMetadataToIPFS,
  } = useIPFS();

  const { showErrorNotification, showSuccessNotification, notifyPromise } =
    useToastNotifications();

  const mintToken = async (tokenURI: string) => {
    await mint(tokenURI)
      .then(() => {
        setSuccessMessage("Success!");
        setIsLoading(false);
        clearInputs();
      })
      .catch((e) => {
        setErrorMessage(`Error: ${e}`);
        setIsLoading(false);
      });
  };

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
      const image = (await notifyPromise(
        uploadFileToIPFS(),
        UPLOAD_FILE_MESSAGES
      )) as string;

      if (image) {
        console.log("SUCCESS UPLOAD image. FileURI: ", image);
        const tokenURI = (await notifyPromise(
          uploadMetadataToIPFS(name, description, image),
          UPLOAD_METADATA_MESSAGES
        )) as string;

        if (tokenURI) {
          console.log("SUCCESS UPLOAD METADATA. TokenURI: ", tokenURI);
          // mintToken(tokenURI);
          showSuccessNotification(
            "Token minted successfully. Go to dashboard to see it!"
          );
        }
      }
    } catch (err) {
      //Error messages are being handled by the "notifyPromise" fn
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TokenLayout>
      <TokenColumn>
        <TokenTitle>Mint: Generates an authentic Token</TokenTitle>
        <TokenDescription>
          Minting involves creating a one-of-a-kind digital certificate on the
          blockchain. As the initiator, you hold the exclusive ability to ensure
          the token's authenticity whether you decide to sell it or transfer it
          to a new owner.
        </TokenDescription>
      </TokenColumn>

      <Divider />

      <TokenColumn>
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

        <FileInput label="Select token image" onChange={handleFileInput} />

        <GradientButton loading={isLoading} onClick={handleSubmit}>
          Add
        </GradientButton>
      </TokenColumn>
    </TokenLayout>
  );
};
