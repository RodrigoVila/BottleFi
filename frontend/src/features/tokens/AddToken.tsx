import { useState } from "react";

import { useIPFS } from "@hooks";

import { Button } from "@components/Buttons";

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
    <>
      ADD TOKEN
      {/* <Navbar />
            {!chainError && (
                <div className="flex items-center justify-center w-full h-full text-white flec-col">
                    <div className="bg-[rgba(0,0,0,0.9)] w-1/5 min-w-[260px] flex flex-col border-2 border-white p-5 pt-0 rounded-lg">
                        <label className="px-0 py-2 text-center text-white">Add Bottle</label>
                        <label className="mb-1 text-white">Name</label>
                        <input
                            required
                            type="text"
                            className="p-1 pr-0 mb-4 border-2 border-white rounded-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label className="mb-1 text-white">Description</label>
                        <input
                            required
                            type="text"
                            className="p-1 pr-0 mb-4 border-2 border-white rounded-sm"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label className="mb-1 text-white">Select NFT Image</label>
                        <input
                            required
                            type="file"
                            className="p-1 pr-0 mb-4 border-2 border-white rounded-sm"
                            onChange={(e) => handleFileInput(e)}
                        />

                        {isLoading ? (
                            <Button label="Loading..." onClick={() => { }} />
                        ) : (
                            <Button label="Add" onClick={uploadData} />
                        )}
                    </div>
                    {errorMessage && (
                        <p
                            className="m-0 mt-1 font-semibold text-center text-red-300"
                        >
                            {errorMessage}
                        </p>
                    )}
                    {successMessage && (
                        <p
                            className="m-0 mt-1 font-semibold text-center text-green-300"
                        >
                            {successMessage}
                        </p>
                    )}
                </div>
            )} */}
    </>
  );
};
