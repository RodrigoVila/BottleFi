import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  useAuthContext,
  useErrors,
  useLocalStorage,
  useModalContext,
  useRolesContract,
  useToastNotifications,
} from "@hooks";
import { LOCAL_STORAGE_KEY, supportedNetworkId } from "@constants";
import { getCurrentAccount, getNetwork } from "@utils/ethers";

export const useWallet = () => {
  const { closeAllModals, setChainSwitchModalOpen } = useModalContext();
  const { setUser } = useAuthContext();

  const navigate = useNavigate();

  const [, setLocalStorage] = useLocalStorage(LOCAL_STORAGE_KEY);
  const { getRoleData } = useRolesContract();
  const { notifyMetamaskErrors } = useErrors();
  const { showSuccessNotification } = useToastNotifications();

  const isCorrectChainId = async () => {
    const network = await getNetwork();
    const chainId = network?.chainId;
    if (!chainId) return;

    if (chainId === supportedNetworkId) {
      return true;
    }
    return false;
  };

  const handleConnect = async () => {
    const network = await getNetwork();
    const chainId = network?.chainId;

    try {
      const address = await getCurrentAccount();
      const role = await getRoleData();
      const newUser = {
        chainId,
        address,
        role,
      };
      setUser(newUser);
      setLocalStorage({ isWalletConnected: true });
      navigate("/dashboard");
      showSuccessNotification("Wallet connected!");
    } catch (err) {
      console.error(err);
      notifyMetamaskErrors(err);
    }
  };

  const handleDisconnect = () => {
    setUser(null);
    setLocalStorage(null);
    closeAllModals();
    navigate("/login");
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length > 0) {
      const address = accounts[0];
      try {
        const role = await getRoleData();
        setUser((prev) => ({ ...prev, address, role }));
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
      const role = await getRoleData();
      setUser((prev) => ({ ...prev, chainId, role }));
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

  return { isCorrectChainId, handleConnect, handleDisconnect };
};
