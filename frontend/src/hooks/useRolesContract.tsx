import { Contract, ContractTransaction } from "ethers";

import { getCurrentAccount, getSigner } from "@utils/ethers";
import { Roles as RolesType } from "@types";

import rolesContractArtifact from "../../../artifacts/contracts/Roles.sol/Roles.json";
import { Roles } from "../../../typechain-types/contracts/Roles";
import { useErrors } from "./useErrors";
import { useToastNotifications } from "./useToastNotifications";

type useRolesContractReturn = {
  register: (
    role: RolesType,
    name: string,
    description: string
  ) => Promise<void>;
  getSupplier: () => Promise<
    ([string, string] & { name: string; description: string }) | undefined
  >;
  getVendor: () => Promise<
    ([string, string] & { name: string; description: string }) | undefined
  >; // Define the return type for getVendor
  // Define other functions as needed
};

export const useRolesContract = (): useRolesContractReturn => {
  const { notifyCatchErrors } = useErrors();
  const { showSuccessNotification } = useToastNotifications();

  const address = import.meta.env.VITE_ROLES_CONTRACT_ADDRESS;
  const abi = rolesContractArtifact["abi"];
  const signer = getSigner();

  const roles = new Contract(address, abi, signer!) as Contract & Roles; //Is there another way to type this? Looks a bit odd.

  const register = async (
    role: RolesType,
    name: string,
    description: string
  ): Promise<void> => {
    try {
      let response;
      if (role === "Supplier") {
        response = await roles.registerSupplier(name, description);
      } else {
        response = await roles.registerVendor(name, description);
      }

      const receipt = await response.wait();
      if(receipt) showSuccessNotification(`${role} registered successfully!`)
      console.log({ response, receipt });
    } catch (err) {
      notifyCatchErrors(err);
    }
  };

  const getSupplier = async (): Promise<
    ([string, string] & { name: string; description: string }) | undefined
  > => {
    const address = await getCurrentAccount();
    if (!address) return;
    return await roles.suppliers(address);
  };

  const getVendor = async (): Promise<
    ([string, string] & { name: string; description: string }) | undefined
  > => {
    const address = await getCurrentAccount();
    if (!address) return;
    return await roles.vendors(address);
  };

  return { register, getSupplier, getVendor };
};
