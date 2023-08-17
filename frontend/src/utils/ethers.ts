import { ethers } from "ethers";
import { Network, Provider, Signer, WalletProviders } from "@types";

export const getProvider = (/*wallet: WalletType*/): Provider => {
  if (typeof window !== "undefined" && window.ethereum) {
    // TODO: Implement this when its working
    const { providers } = window.ethereum;

    const supportedProviders: WalletProviders = {
      coinbase: providers.find((p) => p.isCoinbaseWallet),
      metamask: providers.find((p) => p.isMetaMask),
    };

    const selectedProvider = supportedProviders["metamask"];
    // const newObj = {...window.ethereum, providers: [selectedProvider]}
    const provider = new ethers.providers.Web3Provider(selectedProvider);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  }
  return null;
};

export const getSigner = (): Signer => {
  const provider = getProvider();
  if (provider) {
    const signer = provider.getSigner();
    return signer;
  }
  return null;
};

export const getCurrentAccount = async (): Promise<string | null> => {
  const provider = getProvider();
  if (provider) {
    console.log("PROVIDER ACCOUNTS", provider)
    const accounts: string[] = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  }
  return null;
};

export const getNetwork = async (): Promise<Network> => {
  const provider = getProvider();
  if (provider) {
    const network = await provider.getNetwork();
    return network;
  }
  return null;
};

export const connectToSepoliaNetwork = async (): Promise<Network> => {
  const provider = getProvider();
  if (provider) {
    await provider.send("wallet_switchEthereumChain", [
      { chainId: "0xaa36a7" },
    ]);
  }
  return null;
};
