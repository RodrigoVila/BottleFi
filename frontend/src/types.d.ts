import { ethers } from "ethers";

export type WalletType = "coinbase" | "metamask";

export type WalletProviders = {
  [key in WalletType]: string;
};

export type UserDataType = {
  address?: string;
  name?: string;
  role?: string | null;
  chainId?: number;
  chainName?: string;
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

type Web3ProviderType = ethers.providers.Web3ProviderType
export type InfuraProvider = ethers.providers.InfuraProvider
type Provider = Web3ProviderType | InfuraProvider | undefined;
type Signer = ethers.Signer | undefined;
type Network = ethers.providers.Network | undefined;

type Roles = "supplier" | "vendor";

type BigNumber = { _hex: string; _isBigNumber: boolean };

type TokenResponse = [bigint, string, bigint, boolean];

type Token = {
  id: number;
  name?: string;
  description?: string;
  image: string;
  mintedAt: string;
  isValid: boolean;
  owner?:string
};

type TokenList = Token[];

type IPFSStorageData = {
  name: string;
  description: string;
  image?: string;
};
