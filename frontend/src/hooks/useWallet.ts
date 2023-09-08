import { useEffect } from "react";

import {
  useAuthContext,
  useErrors,
  useLocalStorage,
  useModalContext,
  useRolesContract,
} from "@hooks";
import { getCurrentAccount, getNetwork } from "@utils/ethers";
import { LOCAL_STORAGE_KEY, SEPOLIA_NETWORK_ID } from "@constants";

export const useWallet = () => {
  const { setChainSwitchModalOpen } = useModalContext();

  const { getRoleData } = useRolesContract();
  const { setUser } = useAuthContext();

  const [, setLocalStorage] = useLocalStorage(LOCAL_STORAGE_KEY);
  const { notifyMetamaskErrors } = useErrors();

  const isWalletConnected = async (): Promise<boolean> => {
    if (window.ethereum) {
      const isConnected = await window.ethereum.isConnected();
      return isConnected;
    }
    return false;
  };

  const handleConnect = async () => {
    try {
      const address = await getCurrentAccount();
      const network = await getNetwork();
      const chainId = network?.chainId;
      const { name, role } = await getRoleData();

      if (chainId === SEPOLIA_NETWORK_ID) {
        const chainName = "Sepolia";
        const user = {
          chainId,
          chainName,
          address,
          name,
          role,
        };
        setUser(user);
        setLocalStorage(user);
      } else {
        setChainSwitchModalOpen(true);
      }
    } catch (err) {
      notifyMetamaskErrors(err);
    }
  };

  const handleDisconnect = () => {
    setUser(null);
    setLocalStorage(null);
    console.log("Disconnect!");
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      const address = accounts[0];
      setUser((prev) => {
        const currentUser = { ...prev, address };
        setLocalStorage(currentUser);
        console.log(
          "handleAccountsChanged Storage/context data: ",
          currentUser
        );
        return currentUser;
      });
    } else {
      handleDisconnect();
    }
  };

  const handleChainChanged = (hexChainId: string) => {
    const chainId = parseInt(hexChainId);
    if (chainId === SEPOLIA_NETWORK_ID) {
      setUser((prev) => {
        const currentUser = { ...prev, chainId };
        setLocalStorage(currentUser);
        console.log("handleChainChanged Storage/context data: ", currentUser);
        return currentUser;
      });
      // TODO Reloading the page after chain change is recommended. Test if data is being updated and persisted without reloading
      // window.location.reload();
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
      window.ethereum.on("disconnect", () => handleDisconnect);
    }

    return () => {
      if (isEthereumObjectPresent) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener("disconnect", () => handleDisconnect);
      }
    };
    //eslint-disable-next-line
  }, []);

  return { isWalletConnected, handleConnect, handleDisconnect };
};
