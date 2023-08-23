import { useContract } from "./useContract";
import rolesContractArtifact from "../../../artifacts/contracts/Roles.sol/Roles.json";
import { getSigner } from "@utils/ethers";

export const useRolesContract = () => {
  const address = import.meta.env.VITE_ROLES_CONTRACT_ADDRESS;
  const abi = rolesContractArtifact["abi"];
  const signer = getSigner();

  const roles = useContract(address, abi, signer);

  return { roles };
};
