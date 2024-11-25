import { Contract } from "ethers";

import nftContractArtifact from "@artifacts/contracts/NFT.sol/NFT.json";
import { getCurrentAccount, getSigner } from "@utils/ethers";
import { parseBigInt, parseTokenResponse } from "@utils/parse";
import { Token, TokenList } from "@types";
import { NFT } from "@typechain-types/contracts/NFT";

import { useErrors } from "./useErrors";
import { useIPFS } from "./useIPFS";

export const useNFTContract = () => {
  const { notifyMetamaskErrors } = useErrors();
  const { getDataFromIPFS } = useIPFS();

  const address = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
  const abi = nftContractArtifact["abi"];
  const signer = getSigner();

  const nft = new Contract(address, abi, signer!) as Contract & NFT; //TODO: Is there another way to type this?

  const isTokenValid = async (tokenID: number) => {
    return await nft.isValidToken(tokenID);
  };

  const getTokenById = async (tokenId: number): Promise<Token> => {
    const tkn = await nft.getTokenById(tokenId);
    const { id, uri, mintedAt, isValid } = parseTokenResponse(tkn);
    const owner = await nft.ownerOf(id);
    const metadata = await getDataFromIPFS(uri);
    const imageUri = `${import.meta.env.VITE_INFURA_GATEWAY_SUBDOMAIN}/${
      metadata?.image
    }`;

    const token: Token = {
      id,
      mintedAt,
      isValid,
      owner,
      name: metadata?.name,
      description: metadata?.description,
      image: imageUri,
    };
    return token;
  };

  const fetchTokens = async (): Promise<TokenList> => {
    const address = await getCurrentAccount();
    if (!address) return [];

    try {
      const rawTokens = await nft.listMyTokens();
      const tokenIds = rawTokens.map(parseBigInt);

      const tokens = await Promise.all(
        tokenIds.map(async (tokenId) => {
          const token = await getTokenById(tokenId);
          return token;
        })
      );
      return tokens;
    } catch {
      return [];
    }
  };

  const mintToken = async (uri: string): Promise<boolean> => {
    try {
      const response = await nft.mint(uri);
      const receipt = await response.wait();
      return !!receipt;
    } catch (err) {
      notifyMetamaskErrors(err);
      return false;
    }
  };

  const transferToken = async (
    to: string,
    tokenId: number
  ): Promise<boolean> => {
    try {
      const response = await nft.transfer(to, tokenId);
      const receipt = await response.wait();
      return !!receipt;
    } catch (err) {
      notifyMetamaskErrors(err);
      return false;
    }
  };

  const sellToken = async (to: string, tokenId: number): Promise<boolean> => {
    try {
      const response = await nft.sell(to, tokenId);
      const receipt = await response.wait();
      return !!receipt;
    } catch (err) {
      notifyMetamaskErrors(err);
      return false;
    }
  };

  return {
    isTokenValid,
    getTokenById,
    fetchTokens,
    mintToken,
    transferToken,
    sellToken,
  };
};
