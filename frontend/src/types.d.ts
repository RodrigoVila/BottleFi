import { ethers } from "ethers";

export type WalletType = "coinbase" | "metamask";

export type WalletProviders = {
  [key in WalletType]: any;
};

export type UserDataType = {
  address?: string;
  name?: string;
  role?: string;
  chainId?: number;
  chainName?: string;
  signer?: Signer;
};

export type ChangeNetworkType = {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
};

type Provider = ethers.providers.Web3Provider | undefined;
type Signer = ethers.Signer | undefined;
type Network = ethers.providers.Network | undefined;

type Roles = "Supplier" | "Vendor";

type BigNumber = { _hex: string; _isBigNumber: boolean };

type TokenResponse = [bigint, string, bigint, boolean];

type Token = {
  id: number;
  name: string;
  description: string;
  image: string;
  mintedAt: string;
  isValid: boolean;
};

type IPFSStorageData = {
  name: string;
  description: string;
  image?: string;
};
