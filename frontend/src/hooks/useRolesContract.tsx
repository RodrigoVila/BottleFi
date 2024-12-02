import { Contract } from "ethers";

import rolesContractArtifact from "@artifacts/contracts/Roles.sol/Roles.json";
import { getCurrentAccount, getSigner } from "@utils/ethers";
import { Roles as RolesType } from "@types";
import { Roles } from "@typechain-types/contracts/Roles";

import { useErrors } from "./useErrors";

export const useRolesContract = () => {
  const { notifyMetamaskErrors } = useErrors();

  const address = import.meta.env.VITE_ROLES_CONTRACT_ADDRESS;
  const abi = rolesContractArtifact["abi"];
  const signer = getSigner();

  const roles = new Contract(address, abi, signer!) as Contract & Roles; //TODO: Is there another way to type this?

  const register = async (
    role: RolesType,
    name: string,
    description: string
  ): Promise<RolesType | undefined> => {
    try {
      const response = await roles.register(name, description, role);
      const receipt = await response.wait();
      if (receipt) return role;
    } catch (err) {
      notifyMetamaskErrors(err);
      return undefined;
    }
  };

  const getRoleData = async (): Promise<RolesType | null> => {
    const address = await getCurrentAccount();
    if (!address) return null;

    try {
      // Check if user is a supplier
      const isSupplier = await roles.isSupplier(address);
      if (isSupplier) return "supplier";

      // Check if user is a vendor
      const isVendor = await roles.isVendor(address);
      if (isVendor) return "vendor";
      // No role asigned
      return null;
    } catch (error) {
      return null;
    }
  };

  return { register, getRoleData };
};
