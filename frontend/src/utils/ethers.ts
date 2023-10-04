import { ethers, utils } from "ethers";

import { Network, Provider, Signer, Web3ProviderType } from "@types";

export const getProvider = (): Provider => {
  if (typeof window !== "undefined" && window.ethereum) {
    // Reference about "any" as a 2nd arg: https://github.com/ethers-io/ethers.js/issues/866
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    return provider;
  } else {
    const rpcProvider = new ethers.providers.JsonRpcProvider(
      "https://rpc.sepolia.dev"
    );
    console.log({ rpcProvider });
    return rpcProvider;
  }
};

export const getSigner = (): Signer => {
  const provider = getProvider();
  if (provider) {
    // if (provider as Web3ProviderType) {
    const signer = provider.getSigner();
    console.log({signer})
    return signer;
    // } else {
    //   const signer = new ethers.Wallet(
    //     process.env.SIGNER_PRIVATE_KEY,
    //     provider
    //   );
    //   return signer;
    // }
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
