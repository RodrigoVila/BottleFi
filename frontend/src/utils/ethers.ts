import { ethers, utils } from "ethers";

import { Network, Provider, Signer } from "@types";

export const getProvider = (): Provider => {
  if (typeof window !== "undefined" && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  }
  return undefined;
};

export const getSigner = (): Signer => {
  const provider = getProvider();
  if (provider) {
    const signer = provider.getSigner();
    return signer;
  }
  return undefined;
};

export const getCurrentAccount = async (): Promise<string | undefined> => {
  const provider = getProvider();
  if (provider) {
    const accounts: string[] = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  }
  return undefined;
};

export const getBalance = async (): Promise<string | undefined> => {
  const provider = getProvider()
  const account = await getCurrentAccount();
  if (provider && account) {
    const balance = await provider.getBalance(account)
    return utils.formatEther(balance);
  }
};

export const getNetwork = async (): Promise<Network> => {
  const provider = getProvider();
  if (provider) {
    const network = await provider.getNetwork();
    return network;
  }
  return undefined;
};

export const connectToSepoliaNetwork = async (): Promise<Network> => {
  const provider = getProvider();
  if (provider) {
    await provider.send("wallet_switchEthereumChain", [
      { chainId: "0xaa36a7" },
    ]);
  }
  return undefined;
};
