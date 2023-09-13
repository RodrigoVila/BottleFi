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

export const isAccountConnected = async (): Promise<boolean> => {
  const provider = getProvider();
  if (provider) {
    const accounts: string[] = await provider.send("eth_accounts", []);
    console.log("Connected? ", accounts.length > 0)
    return accounts.length > 0;
  }
  return false;
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
  const provider = getProvider();
  const account = await getCurrentAccount();
  if (provider && account) {
    const rawBalance = await provider.getBalance(account);
    const balance = parseFloat(utils.formatEther(rawBalance)).toFixed(3);
    return balance;
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

// It prompts the wallet to connect with the corresponding network: Hardhat(dev env) or Sepolia(prod env)
export const connectToSupportedNetwork = async (): Promise<Network> => {
  const supportedNetworkId = import.meta.env.DEV ? "0x7a69" : "0xaa36a7";

  const provider = getProvider();
  if (provider) {
    await provider.send("wallet_switchEthereumChain", [
      { chainId: supportedNetworkId },
    ]);
  }
  return undefined;
};
