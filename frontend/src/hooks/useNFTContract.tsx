import { Contract } from "ethers";

import nftContractArtifact from "@artifacts/contracts/NFT.sol/NFT.json";
import { getCurrentAccount, getSigner } from "@utils/ethers";
import { parseBigInt, parseTokenResponse } from "@utils/parse";
import { NFT } from "@typechain-types/contracts/NFT";

import { useErrors } from "./useErrors";

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

  const getTokens = async () => {
    const address = await getCurrentAccount();
    if (!address) return null;

    const tokensOfOwner = await nft.tokensOfOwner();
    const parsedTokens = tokensOfOwner.map((t) => parseBigInt(t));

    const getTokenById = async (tokenId: number) => {
      return await nft.getTokenById(tokenId);
    };

    const parsedTokenResponses = await Promise.all(
      parsedTokens.map(getTokenById)
    );
    const parsedTokensInfo = parsedTokenResponses.map(parseTokenResponse);
    console.log({ parsedTokensInfo });
    return parsedTokensInfo;
  };

  return { mintToken, getTokens };
};
