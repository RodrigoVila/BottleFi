import { useEffect } from "react";

import { useModalContext } from "@context/modals";
import { getCurrentAccount, getNetwork, getSigner } from "@utils/ethers";
import { HARDHAT_LOCALHOST_ID, SEPOLIA_NETWORK_ID } from "@constants";

import { useDataStorage } from "./useDataStorage";
import { useRolesContract } from "./useRolesContract";

export const useWallet = () => {
  const { setChainSwitchModalOpen } = useModalContext();
  const { setData } = useDataStorage();
  const { getRoleData } = useRolesContract();

  const handleConnect = async () => {
    const signer = getSigner();
    const address = await getCurrentAccount();
    const network = await getNetwork();
    const chainId = network?.chainId;
    const { name, role } = await getRoleData();

    if (chainId === SEPOLIA_NETWORK_ID || chainId === HARDHAT_LOCALHOST_ID) {
      const chainName =
        chainId === SEPOLIA_NETWORK_ID ? "Sepolia" : "Hardhat Localhost";
        console.log("handleConnect");
      setData((prev) => ({
        ...prev,
        signer,
        chainId,
        chainName,
        address,
        name,
        role,
      }));
    } else {
      setChainSwitchModalOpen(true);
    }
  };

  const handleDisconnect = () => {
    console.log("Disconnect!");
    setData(null);
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      const address = accounts[0];
      console.log("handleAccountsChanged", address);
      setData((prev) => ({ ...prev, address }));
    } else {
      handleDisconnect();
    }
  };

  const handleChainChanged = (hexChainId: string) => {
    const chainId = parseInt(hexChainId);
    if (chainId === SEPOLIA_NETWORK_ID) {
      console.log("handleChainChanged");
      setData((prev) => ({ ...prev, chainId }));
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
      window.ethereum.on("connect", () => console.log("connect!!!"));
      window.ethereum.on("disconnect", () => handleDisconnect);
    }

    return () => {
      if (isEthereumObjectPresent) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener("connect", () => console.log("connect!!!"));
        window.ethereum.removeListener("disconnect", () => handleDisconnect);
      }
    };
    //eslint-disable-next-line
  }, []);

  return { handleConnect };
};
