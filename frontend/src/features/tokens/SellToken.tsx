import { useState } from "react";

import { Button } from "@components/Button";

export const SellToken = () => {
  const [tokenID, setTokenID] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!tokenID) {
      alert("Please select token");
      return;
    }
    if (!destinationAddress) {
      alert("Please write a destination address");
      return;
    }
    await sell(tokenID, destinationAddress)
      .then(() => {
        setIsLoading(false);
        setSuccessMessage("Success!");
      })
      .catch((e) => {
        setIsLoading(false);
        setErrorMessage(`Error: ${e}`);
      });
  };

  const handleData = (data) => {};
  const handleError = (error) => {
    error && alert(`Error pulling data: ${error}`);
  };

  return (
    !chainError && (
      <div className="flex flex-col items-center justify-center w-full h-full text-white">
        <div className="flex items-center justify-center w-full">
          <div className="bg-[rgba(0,0,0,0.9)], w-1/5 min-w-[260px] flex flex-col border-2 border-white p-5 pt-0">
            <label className="px-0 py-2 text-center text-white">
              Sell Bottle
            </label>
            <label className="mx-0 my-1 text-sm text-white">Select Token</label>
            <select
              // value={destinationAddress}
              className="p-1 pr-0"
              onChange={(e) => setTokenID(e.target.value)}
              placeholder="Select an option"
            >
              <option selected={true} disabled={true}>
                Select an option
              </option>
              {tokens.length > 0 &&
                tokens.map((token, index) => (
                  <option key={index} value={token.id}>
                    {token.name}
                  </option>
                ))}
            </select>
            <label className="mx-0 my-1 text-sm text-white">Address</label>
            <input
              required
              type="text"
              className="p-1 pr-0"
              onChange={(e) => setDestinationAddress(e.target.value)}
            />
            <p className="m-0 mt-1 font-semibold text-center text-red-300">
              {errorMessage}
            </p>
            <p className="m-0 mt-1 font-semibold text-center text-green-300">
              {successMessage}
            </p>
            {isLoading ? (
              <Button onClick={() => {}} disabled>Loading...</Button>
            ) : (
              <Button onClick={handleSubmit}>Sell</Button>
            )}
          </div>
        </div>
      </div>
    )
  );
};