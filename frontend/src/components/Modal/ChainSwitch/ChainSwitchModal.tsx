import { useModalContext } from "@hooks";
import { AnimatedButton } from "@components/Buttons";
import { connectToSepoliaNetwork } from "@utils/ethers";

import { Modal } from "..";

export const ChainSwitchModal = () => {
  const { isChainSwitchModalOpen, setChainSwitchModalOpen } = useModalContext();

  const closeModal = () => setChainSwitchModalOpen(false);

  return (
    <Modal
      isOpen={isChainSwitchModalOpen}
      onClose={closeModal}
      className="bg-[rgba(255,0,0,0.5)]"
      bodyClassName="border-2 border-[rgba(255,0,0,0.7)] bg-black"
      disableOutsideClick
    >
      <h3 className="text-3xl font-semibold">Invalid chain detected</h3>
      <h5 className="text-lg">
        This application only works on the{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://sepolia.dev/"
          className="text-blue-400 underline"
        >
          Sepolia Test Network
        </a>
        . To utilize its features, please ensure you are connected to this
        network.
      </h5>
      <AnimatedButton onClick={connectToSepoliaNetwork}>
        Connect to Sepolia Network
      </AnimatedButton>
    </Modal>
  );
};
