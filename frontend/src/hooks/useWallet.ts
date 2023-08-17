import { useEffect } from "react";

import { LOCAL_STORAGE_KEY, SEPOLIA_NETWORK_ID } from "@constants";
import { getCurrentAccount, getNetwork, getSigner } from "@utils/ethers";
import { Account } from "@types";

import { useLocalStorage } from "./useLocalStorage";
import { useModalContext } from "@context/modals";
import { useAuthContext } from "@context/auth";

export const useWallet = () => {
  const [localStorage, setLocalStorage, clearLocalStorage] =
    useLocalStorage(LOCAL_STORAGE_KEY);

  const { setUser } = useAuthContext();
  const { setChainSwitchModalOpen } = useModalContext();

  const handleConnect = async () => {
    const signer = getSigner();
    const address = await getCurrentAccount();
    const account: Account = {
      address,
      name: "",
      type: "",
    };
    const network = await getNetwork();
    const chainId = network?.chainId || null;

    if (chainId === SEPOLIA_NETWORK_ID) {
      setLocalStorage({ account, chainId });
      setUser({ account, chainId, signer });

      console.log("handleConnect OK", {
        account,
        chainId,
        signer,
      });
    } else {
      console.log("ChainID !== sepolia");
      setChainSwitchModalOpen(true);
    }
  };

  const handleDisconnect = () => {
    console.log("Disconnect!");
    setUser(null);
    clearLocalStorage();
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      const address = accounts[0];

      // console.log("AccountChanged: ", data);

      setUser((prevData) => ({
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
      handleDisconnect();
    }
  };

  const handleChainChanged = (hexChainId: string) => {
    const chainId = parseInt(hexChainId);
    console.log("ChainChanged: ", chainId, "hex: ", hexChainId);
    if (chainId === SEPOLIA_NETWORK_ID) {
      setUser((prevData) => ({
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

  return { localStorage, handleConnect };
};
