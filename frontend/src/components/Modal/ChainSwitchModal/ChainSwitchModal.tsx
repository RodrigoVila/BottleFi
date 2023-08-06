import React from "react";
import { Modal } from "..";
import { GOERLI_NETWORK_ID, SEPOLIA_NETWORK_ID } from "@constants";
import { useModalContext } from "@context/modals";
import { switchToChain } from "@utils/ethers";
import { Button } from "@components/Button";

export const ChainSwitchModal = () => {
  const { isChainSwitchOpen, setChainSwitchOpen } = useModalContext();

  const closeModal = () => setChainSwitchOpen(false);

  return (
    <Modal isOpen={isChainSwitchOpen} onClose={closeModal} disableOutsideClick>
      <div className="center border-2 border-white">
        <h3>Invalid Chain Detected</h3>
        <h5>To access all app features, please connect to either Sepolia or Goerli network.</h5>
        <Button onClick={() => switchToChain(SEPOLIA_NETWORK_ID)}>
          Connect to Sepolia Network
        </Button>
        <Button onClick={() => switchToChain(GOERLI_NETWORK_ID)}>
          Connect to Goerli Network
        </Button>
      </div>
    </Modal>
  );
};
