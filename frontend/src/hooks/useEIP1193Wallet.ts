 
import { useDappContext } from "@context/dapp";
import { getProvider, getAccounts, getChainID } from "@utils/ethers";

type SupportedEIP1193Wallets = "brave" | "coinbase" | "metamask";

type WalletProviders = {
  [key: string]: any;
  brave: number;
  coinbase: number;
  metamask: number;
};

export const useEIP1193Wallet = () => {
  const { setAccount, setChainId, setProvider, setError } = useDappContext();

  const setProviderData = async (provider: any) => {
    const p = getProvider(provider);
    setProvider(p);

    const accounts = await getAccounts(provider);
    setAccount(accounts[0]);

    const chId = await getChainID(provider);
    setChainId(chId);
  };

  const connectWithBrowserWallet = (wallet: SupportedEIP1193Wallets) => {
    if (typeof window !== "undefined" && window.ethereum) {
      const { providers }: any = window.ethereum;

      const supportedWallets: WalletProviders = {
        brave: providers.find((p) => p.isMetaMask && p.isBraveWallet),
        coinbase: providers.find((p) => p.isCoinbaseWallet),
        metamask: providers.find((p) => p.isMetaMask && !p.isBraveWallet),
      };

      const selectedProvider = supportedWallets[wallet];

      selectedProvider
        ? setProviderData(selectedProvider)
        : setError(
            `${wallet.toUpperCase()} wallet not installed. Please install or choose another wallet`
          );
    }
  };

  const onChainChange = () => {};
  const onAccountChange = () => {};

  return {
    connectWithBrowserWallet,
    onChainChange,
    onAccountChange,
  };
};
