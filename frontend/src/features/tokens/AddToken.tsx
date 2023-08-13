import { useState } from "react";

import { useIPFS } from "@hooks";

import { Button, GradientButton } from "@components/Buttons";
import { Input } from "@components/Inputs";
import { FileInput } from "@components/Inputs/FileInput/FileInput";
import { TokenTitle } from "./Layout/TokenTitle";
import { TokenLayout } from "./Layout/TokenLayout";

export const AddToken = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    fileBuffer,
    handleFileInput,
    uploadFileToIPFS,
    uploadMetadataToIPFS,
  } = useIPFS();

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const clearInputs = () => {
    setName("");
    setDescription("");
  };

  const handleSubmit = async (tokenURI: string) => {
    // await mint(tokenURI)
    //   .then(() => {
    //     setSuccessMessage("Success!");
    //     setIsLoading(false);
    //     clearInputs();
    //   })
    //   .catch((e) => {
    //     setErrorMessage(`Error: ${e}`);
    //     setIsLoading(false);
    //   });
  };

  const uploadData = async (e) => {
    e.preventDefault();
    if (!name || !description || !fileBuffer) {
      alert("Every input is mandatory");
      return;
    }
    setIsLoading(true);

    clearMessages();

    await uploadFileToIPFS().then((fileURI) => {
      fileURI !== undefined &&
        uploadMetadataToIPFS(name, description, fileURI.toString()).then(
          (tokenURI) => {
            tokenURI && handleSubmit(tokenURI);
          }
        );
    });
  };

  return (
    <TokenLayout>
      <TokenTitle>Add Token</TokenTitle>
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <FileInput
        label="Select token image"
        onChange={(e) => handleFileInput(e)}
      />

      <GradientButton loading={isLoading} onClick={uploadData}>
        Add
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
