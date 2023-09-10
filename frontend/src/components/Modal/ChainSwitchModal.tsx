import { useModalContext } from "@hooks";
import { AnimatedButton } from "@components/Buttons";
import { connectToSupportedNetwork } from "@utils/ethers";

import { Modal } from "./";

export const ChainSwitchModal = () => {
  const { isChainSwitchModalOpen, setChainSwitchModalOpen } = useModalContext();

  const supportedNetworkName = import.meta.env.DEV
    ? "Hardhat local network"
    : "Sepolia Test Network";

  const closeModal = () => setChainSwitchModalOpen(false);

  return (
    <Modal
      isOpen={isChainSwitchModalOpen}
      onClose={closeModal}
      className="bg-[rgba(255,0,0,0.5)]"
      bodyClassName="border-2 border-[rgba(255,0,0,0.7)] bg-black p-2 md:p-8"
      disableOutsideClick
    >
      <h3 className="text-2xl font-semibold md:text-3xl">
        Invalid chain detected
      </h3>
      <h5 className="text-base md:text-lg">
        This application only works on the{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://sepolia.dev/"
          className="text-blue-400 underline"
        >
          {supportedNetworkName}
        </a>
        . To utilize its features, please ensure you are connected to this
        network.
      </h5>
      <AnimatedButton onClick={connectToSupportedNetwork}>
        {`Connect to ${supportedNetworkName}`}
      </AnimatedButton>
    </Modal>
  );
};
