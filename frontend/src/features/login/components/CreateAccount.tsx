 
import { useState, ChangeEvent } from "react";

import { Button } from "@components/Buttons";

type CreateAccountProps = {
  currentAccount: string | object;
  createSupplierAccount: (name: string, description: string) => void;
  createVendorAccount: (name: string, description: string) => void;
};

export const CreateAccount = ({
  currentAccount,
  createSupplierAccount,
  createVendorAccount,
}: CreateAccountProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("none");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) =>
    setSelectedAccountType(event.target.value);

  const createAccount = async () => {
    setIsLoading(true);
    setErrorMessage("");
    if (!currentAccount) {
      alert("Connect to Metamask First");
      return;
    }

    if (!name || !description || selectedAccountType === "none") {
      setErrorMessage("All inputs required");
      return;
    }

    selectedAccountType === "supplier"
      ? createSupplierAccount(name, description)
      : createVendorAccount(name, description);
  };

  return (
    <div className="flex items-center justify-center w-full text-white">
      <div className="bg-[rgba(0,0,0,0.9)] w-1/4 min-w-[260px] flex flex-col border2 border-white p-5 pt-0 rounded-lg">
        <label className="py-3 text-center">Create Account</label>
        <label className="mb-1 text-sm text-white">Account Type</label>
        <select
          value={selectedAccountType}
          className="w-full py-1 mb-3"
          onChange={handleSelect}
          placeholder="Select an option"
          defaultValue="none"
        >
          <option disabled value="none">
            Select an option
          </option>
          <option value="supplier">Supplier</option>
          <option value="vendor">Vendor</option>
        </select>
        <label className="mb-1 text-sm text-white">Name</label>
        <input
          type="text"
          className="p-1 pr-0 mb-4 border-2 border-white rounded-sm"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="mb-1 text-sm text-white">Description</label>
        <input
          type="text"
          className="p-1 pr-0 mb-4 border-2 border-white rounded-sm"
          onChange={(e) => setDescription(e.target.value)}
        />
        {isLoading ? (
          <Button onClick={() => {}} disabled>
            Loading...
          </Button>
        ) : (
          <Button onClick={createAccount}>
            Create account
          </Button>
        )}
      </div>
      <p className="m-0 mt-1 font-semibold text-center text-red-400">
        {errorMessage}
      </p>
    </div>
  );
};
