import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  useAuthContext,
  useErrors,
  useModalContext,
  useRolesContract,
} from "@hooks";
import { supportedNetworkId } from "@constants";
import { getCurrentAccount, getNetwork } from "@utils/ethers";

export const useWallet = () => {
  const { closeAllModals, setChainSwitchModalOpen } = useModalContext();

  const { getRoleData } = useRolesContract();
  const { setUser } = useAuthContext();

  const { notifyMetamaskErrors } = useErrors();

  const navigate = useNavigate();

  const isWalletConnected = async (): Promise<boolean> => {
    if (window.ethereum) {
      const isConnected = await window.ethereum.isConnected();
      return isConnected;
    }
    return false;
  };

  const handleConnect = async () => {
    try {
      const network = await getNetwork();
      const chainId = network?.chainId;
      if (!chainId) return;

      if (chainId !== supportedNetworkId) {
        setChainSwitchModalOpen(true);
        return;
      }
      const address = await getCurrentAccount();
      const role = await getRoleData();
      const newUser = {
        chainId,
        address,
        role,
      };
      setUser(newUser);
      // setLocalStorage(newUser);
      navigate("./dashboard");
    } catch (err) {
      console.error(err);
      notifyMetamaskErrors(err);
    }
  };

  const handleDisconnect = () => {
    setUser(null);
    // setLocalStorage(null);
    closeAllModals();
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length > 0) {
      const address = accounts[0];
      try {
        const role = await getRoleData();

        setUser((prev) => {
          const currentUser = { ...prev, address, role };
          // setLocalStorage(currentUser);
          return currentUser;
        });
      } catch (err) {
        console.error("Handle account change error: ", { err });
      }
    } else {
      handleDisconnect();
    }
  };

  const handleChainChanged = async (hexChainId: string) => {
    const chainId = parseInt(hexChainId);
    if (chainId === supportedNetworkId) {
      setUser((prev) => {
        const currentUser = { ...prev, chainId };
        // setLocalStorage(currentUser);
        return currentUser;
      });
    } else {
      closeAllModals();
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
