import { useEffect } from "react";

import {
  DAPP_INITIAL_DATA,
  LOCAL_STORAGE_KEY,
  SEPOLIA_NETWORK_ID,
} from "@constants";
import { getCurrentAccount, getNetwork, getSigner } from "@utils/ethers";
import { Account } from "@types";

import { useLocalStorage } from "./useLocalStorage";
import { useModalContext } from "@context/modals";
import { useDappContext } from "@context/dapp";

export const useWallet = () => {
  const [localStorage, setLocalStorage, clearLocalStorage] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    DAPP_INITIAL_DATA
  );

  const { dappData, setDappData } = useDappContext();
  const { setChainSwitchModalOpen } = useModalContext();

  const connectWithBrowserWallet = async () => {
    const signer = getSigner();
    const address = await getCurrentAccount();
    const network = await getNetwork();

    const chainId = network?.chainId || null;
    const account: Account = {
      address,
      name: "",
      type: "",
    };

    console.log("connectWithBrowserWallet", {
      account,
      chainId,
      signer,
    });

    setLocalStorage({ account, chainId });
    setDappData({ account, chainId, signer });
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      const address = accounts[0];

      // console.log("AccountChanged: ", data);

      setDappData((prevData) => ({
        ...prevData,
        account: { ...prevData.account, address },
      }));

      const updatedLocalStorageData = {
        ...localStorage,
        account: {
          ...localStorage.account,
          address,
        },
      };
      setLocalStorage(updatedLocalStorageData);
    } else {
      clearLocalStorage();
    }
  };

  const handleChainChanged = (hexChainId: string) => {
    const chainId = parseInt(hexChainId);
    console.log("ChainChanged: ", chainId, "hex: ", hexChainId);
    if (chainId === SEPOLIA_NETWORK_ID) {
      const data = {
        ...dappData,
        chainId,
      };

      setDappData((prevData) => ({
        ...prevData,
        chainId,
      }));

      const updatedLocalStorageData = {
        ...localStorage,
        chainId,
      };
      setLocalStorage(updatedLocalStorageData);

      window.location.reload();
    } else {
      setChainSwitchModalOpen(true);
    }
  };

  const handleDisconnect = () => {
    console.log("Disconnect!");
    setDappData(DAPP_INITIAL_DATA);
    clearLocalStorage();
  };

  // Events Listener
  useEffect(() => {
    const isEthereumObjectPresent =
      typeof window !== "undefined" && window.ethereum;

    if (isEthereumObjectPresent) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("connect", () => console.log("connect!!!"));
      window.ethereum.on("disconnect", () => handleDisconnect);
      // !ethereum.isConnected() && clearLocalStorage();
    }

    return () => {
      if (isEthereumObjectPresent) {
        window.ethereum.off("accountsChanged", handleAccountsChanged);
        window.ethereum.off("chainChanged", handleChainChanged);
        window.ethereum.off("connect", () => console.log("connect!!!"));
        window.ethereum.off("disconnect", () => handleDisconnect);
      }
    };
    //eslint-disable-next-line
  }, []);

  return { connectWithBrowserWallet };
};
