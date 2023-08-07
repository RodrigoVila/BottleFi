import { useState } from "react";

import { Button } from "@components/Buttons";
import styles from "./TransferToken.module.css";

export const TransferToken = () => {
  const [tokenID, setTokenID] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const tokens = [{id: 1, name: "token"}]

  const clearInputs = () => {
    setSuccessMessage("");
    setErrorMessage("");
    setDestinationAddress("");
    setTokenID("");
  };

  const handleSubmit = async () => {
    if (!tokenID) {
      alert("Please select token");
      return;
    }
    if (!destinationAddress) {
      alert("Please write a destination address");
      return;
    }
    setIsLoading(true);
    // await transfer(tokenID, destinationAddress)
    //   .then(() => {
    //     setIsLoading(false);
    //     setSuccessMessage("Success!");
    //     clearInputs();
    //   })
    //   .catch((e) => {
    //     setErrorMessage(`Error: ${e}`);
    //     setIsLoading(false);
    //     clearInputs();
    //   });
  };

  return (
    true && (
      <div className={styles.container}>
        <div className={styles.form}>
          <label className={styles.title}>Transfer Bottle</label>
          <label className={styles.label}>Select Token</label>
          <select
            // value={destinationAddress}
            className={styles.dropdown}
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
          <label className={styles.label}>Address</label>
          <input
            required
            type="text"
            className={styles.input}
            onChange={(e) => setDestinationAddress(e.target.value)}
          />
          {isLoading ? (
            <Button>Loading...</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </div>
        {errorMessage && (
          <p className={`${styles.message} ${styles.errorMessage}`}>
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className={`${styles.message} ${styles.successMessage}`}>
            {successMessage}
          </p>
        )}
      </div>
    )
  );
};