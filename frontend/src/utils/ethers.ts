import { ethers } from "ethers";

export const getProvider = (provider) => new ethers.providers.Web3Provider(provider);
export const getAccounts = async (provider) => await provider.request({ method: "eth_requestAccounts" });
export const getChainID = async (provider) => await provider.request({ method: "eth_chainId" });