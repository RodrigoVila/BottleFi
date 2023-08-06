export type WalletType = "coinbase" | "metamask";

export type WalletProviders = {
  [key in WalletType]: any;
};

export type UserStorageType = {
  account: {
    address: string;
    name: string;
    type: string;
  } | null;
  chainId: string | null;
  chainName: string | null;
};
