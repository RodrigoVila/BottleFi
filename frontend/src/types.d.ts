import { ethers } from "ethers";

export type WalletType = "coinbase" | "metamask";

export type WalletProviders = {
  [key in WalletType]: any;
};

export type UserDataType = {
  account: Account;
  chainId: number | null;
  signer: Signer
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

type Account = {
  address: string | null;
  name: string | null;
  type: string | null;
};
type Provider = ethers.providers.Web3Provider | null;
type Signer = ethers.Signer | null;
type Network = ethers.providers.Network | null;

type Roles = "Supplier" | "Vendor";
