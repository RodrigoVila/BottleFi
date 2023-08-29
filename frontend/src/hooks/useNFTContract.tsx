import { Contract } from "ethers";

import nftContractArtifact from "@artifacts/contracts/NFT.sol/NFT.json";
import { getCurrentAccount, getSigner } from "@utils/ethers";
import { parseBigInt, parseTokenResponse } from "@utils/parse";
import { Token } from "@types";
import { NFT } from "@typechain-types/contracts/NFT";

import { useErrors } from "./useErrors";
import { useIPFS } from "./useIPFS";

export const useNFTContract = () => {
  const { notifyCatchErrors } = useErrors();
  const { getDataFromIPFS } = useIPFS();

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

  const getTokens = async (): Promise<Token[] | null> => {
    const address = await getCurrentAccount();
    if (!address) return null;

    // Tokens IDs are obtained as an array of bigint
    const tokensOfOwner = await nft.tokensOfOwner();
    // Then parsed to an array of numbers
    const tokenOwnerIds = tokensOfOwner.map((t) => parseBigInt(t));

    //Each token obtained from the contract is an array of [bigint(id), string(uri), bigint(timestamp), bool(isValid)]
    const getTokenById = async (tokenId: number) => {
      return await nft.getTokenById(tokenId);
    };

    // Then we ask for each token that owner has
    const tokensResponse = await Promise.all(tokenOwnerIds.map(getTokenById));

    // And parse them to something that JS can read
    const parsedTokens = tokensResponse.map(parseTokenResponse);

    // Finally we create an array with the token data + metadata downloaded from IPFS
    const tokens = await Promise.all(
      parsedTokens.map(async (token) => {
        const metadata = await getDataFromIPFS(token.uri);
        const imageUri = `${import.meta.env.VITE_INFURA_GATEWAY_SUBDOMAIN}/${
          metadata?.image
        }`;

        return {
          id: token.id,
          mintedAt: token.mintedAt,
          isValid: token.isValid,
          name: metadata?.name,
          description: metadata?.description,
          image: imageUri,
        };
      })
    );

    return tokens;
  };

  return { mintToken, getTokens };
};
