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

  const roles = new Contract(address, abi, signer!) as Contract & Roles; //Is there another way to type this? Looks a bit odd.

  const register = async (
    role: RolesType,
    name: string,
    description: string
  ): Promise<RolesType | undefined> => {
    try {
      let response;
      if (role === "Supplier") {
        response = await roles.registerSupplier(name, description);
      } else {
        response = await roles.registerVendor(name, description);
      }

      const receipt = await response.wait();
      if (receipt) return role;
    } catch (err) {
      notifyMetamaskErrors(err);
      return undefined;
    }
    return undefined;
  };

  const getRoleData = async (): Promise<RolesType | null> => {
    const address = await getCurrentAccount();
    if (!address) return null;

    try {
      const supplierProfile = await roles.suppliers(address);
      if (supplierProfile?.name) return "Supplier";

      const vendorProfile = await roles.vendors(address);
      if (vendorProfile?.name) return "Vendor";

      return null;
    } catch (error) {
      console.error("Error fetching role:", error);
      return null;
    }
  };

  return { register, getRoleData };
};
