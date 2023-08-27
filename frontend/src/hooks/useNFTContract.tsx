import { Contract } from "ethers";

import nftContractArtifact from "@artifacts/contracts/NFT.sol/NFT.json";
import { getCurrentAccount, getSigner } from "@utils/ethers";
import { NFT } from "@typechain-types/contracts/NFT";

import { useErrors } from "./useErrors";

// type useNFTContractReturn = {
//   register: (
//     role: RolesType,
//     name: string,
//     description: string
//   ) => Promise<void>;
//   getSupplier: () => Promise<
//     ([string, string] & { name: string; description: string }) | undefined
//   >;
//   getVendor: () => Promise<
//     ([string, string] & { name: string; description: string }) | undefined
//   >; // Define the return type for getVendor
//   // Define other functions as needed
// };

export const useNFTContract = () => {
  const { notifyCatchErrors } = useErrors();

  const address = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
  const abi = nftContractArtifact["abi"];
  const signer = getSigner();

  const nft = new Contract(address, abi, signer!) as Contract & NFT; //Is there another way to type this? Looks a bit odd.

  const mintToken = async (uri: string): Promise<boolean> => {
    try {
      const response = await nft.mint(uri);
      const receipt = await response.wait();
      return !!receipt;
    } catch (err) {
      notifyCatchErrors(err);
      return false;
    }
  };

  const getTokens = async (): Promise<boolean | null> => {
    const address = await getCurrentAccount();
    if (!address) return null;
    
    const isValid = await nft.isValidToken(0);
    console.log("Is valid token 0: ", isValid);
    return isValid;
  };

  return { mintToken, getTokens };
};
