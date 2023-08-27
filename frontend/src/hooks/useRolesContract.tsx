import { Contract } from "ethers";

import rolesContractArtifact from "@artifacts/contracts/Roles.sol/Roles.json";
import { getCurrentAccount, getSigner } from "@utils/ethers";
import { Roles as RolesType } from "@types";
import { Roles } from "@typechain-types/contracts/Roles";

import { useErrors } from "./useErrors";

export const useRolesContract = () => {
  const { notifyCatchErrors } = useErrors();

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
      notifyCatchErrors(err);
      return undefined;
    }
    return undefined;
  };

  const getRoleData = async (): Promise<{
    name: string | undefined;
    role: RolesType | undefined;
  }> => {
    const emptyData = { name: undefined, role: undefined };
    const address = await getCurrentAccount();
    if (!address) return emptyData;

    try {
      const supplierProfile = await roles.suppliers(address);
      if (supplierProfile?.name) {
        console.log({ name: supplierProfile.name, role: "Supplier" });
        return { name: supplierProfile.name, role: "Supplier" };
      }

      const vendorProfile = await roles.vendors(address);
      if (vendorProfile?.name) {
        console.log({ name: vendorProfile.name, role: "Vendor" });
        return { name: vendorProfile.name, role: "Vendor" };
      }
      console.log(emptyData);
      return emptyData;
    } catch (error) {
      console.error("Error fetching role:", error);
      return emptyData;
    }
  };

  return { register, getRoleData };
};
