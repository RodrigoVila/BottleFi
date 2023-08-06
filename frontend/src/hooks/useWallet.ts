import { useEffect } from "react";

import { allowedNetworkIds } from "@constants";
import { getCurrentAccount, getNetwork } from "@utils/ethers";
import { WalletType, UserStorageType } from "@types";

import { useLocalStorage } from "./useLocalStorage";
import { useModalContext } from "@context/modals";

const initialState: UserStorageType = {
  account: null,
  chainId: null,
  chainName: null,
};

export const useWallet = () => {
  const [localStorage, setLocalStorage, clearLocalStorage] = useLocalStorage(
    "@BF_DATA",
    initialState
  );

  const { setChainSwitchOpen } = useModalContext();

  const openChainSwitchModal = () => setChainSwitchOpen(true);

  const connectWithBrowserWallet = async (wallet: WalletType) => {
    const address = await getCurrentAccount();
    const network = await getNetwork();

    const chainId = network?.chainId.toString();
    const chainName = network?.name;

    setLocalStorage({
      account: {
        address,
        name: "",
        type: "",
      },
      chainId,
      chainName,
    });

    chainId && !allowedNetworkIds.includes(chainId) && openChainSwitchModal();

    console.log("Object stored: ", {
      account: {
        address,
        name: "",
        type: "",
      },
      chainId: network?.chainId,
      chainName: network?.name,
    });
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      setLocalStorage({
        ...localStorage,
        account: {
          ...localStorage.account,
          address: accounts[0],
        },
      });
    } else {
      clearLocalStorage();
    }
  };

  const handleChainChanged = (chainId: string) => {
    if (allowedNetworkIds.includes(chainId)) {
      setLocalStorage({
        ...localStorage,
        chainId,
      });
      window.location.reload();
    } else {
      console.log(chainId)
      openChainSwitchModal();
    }
  };

  // Events Listener
  useEffect(() => {
    const isEthereumObjectPresent =
      typeof window !== "undefined" && window.ethereum;

    if (isEthereumObjectPresent) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("connect", () => console.log("connect!!!"));
      window.ethereum.on("disconnect", () => console.log("disconnect!!!"));
      // !ethereum.isConnected() && clearLocalStorage();
    }

    return () => {
      if (isEthereumObjectPresent) {
        window.ethereum.off("accountsChanged", handleAccountsChanged);
        window.ethereum.off("chainChanged", handleChainChanged);
        window.ethereum.off("connect", () => console.log("connect!!!"));
        window.ethereum.off("disconnect", () => console.log("disconnect!!!"));
      }
    };
    //eslint-disable-next-line
  }, []);

  return { connectWithBrowserWallet };
};
