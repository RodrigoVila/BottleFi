import { WalletType, WalletProviders } from "@types";
import { ethers } from "ethers";
import { parseWalletError } from "./parse";

type Provider = ethers.providers.Web3Provider | null;
type Signer = ethers.Signer | null;
type Account = string | null;
type Network = ethers.providers.Network | null;

export const getProvider = (/*wallet: WalletType*/): Provider => {
  if (typeof window !== "undefined" && window.ethereum) {
    // TODO: Implement this when its working
    // const { providers } = window.ethereum;

    // const supportedProviders: WalletProviders = {
    //   coinbase: providers.find((p) => p.isCoinbaseWallet),
    //   metamask: providers.find((p) => p.isMetaMask),
    // };

    // const selectedProvider = supportedProviders[wallet];
    // const provider = new ethers.providers.Web3Provider(selectedProvider);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
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

export const getCurrentAccount = async (): Promise<Account> => {
  const provider = getProvider();
  if (provider) {
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

export const switchToChain = async (chainId:string): Promise<Network> => {
  const provider = getProvider();
  if (provider) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ethers.utils.hexValue(chainId) }],
    });
  }
  return null;
};
