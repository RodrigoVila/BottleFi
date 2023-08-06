import { AllowedWalletType, WalletProviders } from "@types";
import {
  ethers,
  JsonRpcSigner,
  AbstractProvider,
  BrowserProvider,
} from "ethers";
import { parseWalletError } from "@utils/parse";

const SEPOLIA_CHAIN_ID = "1115511";

type Provider = BrowserProvider | AbstractProvider;
type Signer = JsonRpcSigner | null;

export const getProvider = async (
  wallet: AllowedWalletType
): Promise<Provider | null> => {
  try {
    if (typeof window !== "undefined" && window.ethereum) {
      const { providers } = window.ethereum;

      const supportedProviders: WalletProviders = {
        coinbase: providers.find((p) => p.isCoinbaseWallet),
        metamask: providers.find((p) => p.isMetaMask && !p.isBraveWallet),
      };

      const selectedProvider = supportedProviders[wallet];
      return new ethers.BrowserProvider(selectedProvider);
    } else {
      // Read only provider. Useful for the user end app.
      return ethers.getDefaultProvider({
        chainId: parseInt(SEPOLIA_CHAIN_ID),
      });
    }
  } catch (e) {
    console.info("getProvider error: ", e);
    return null;
  }
};

export const getSigner = async (provider: BrowserProvider): Promise<Signer> => {
  const signer: JsonRpcSigner = await provider.getSigner();
  return signer;
};

export const getCurrentAccount = async (
  provider: BrowserProvider
): Promise<string[] | null> => {
  try {
    if (typeof window !== "undefined" && window.ethereum) {
      const accounts = await provider.send("eth_requestAccounts", []);
      return accounts[0];
    } else {
      return null;
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error.";
    parseWalletError(errorMessage);

    return null;
  }
};
