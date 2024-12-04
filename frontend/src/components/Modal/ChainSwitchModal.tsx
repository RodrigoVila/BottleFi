import { useModalContext } from "@hooks";
import { supportedNetworkName } from "@constants";
import { GradientButton } from "@components/Buttons";
import { connectToSupportedNetwork } from "@utils/ethers";

import { Modal } from "./";

export const ChainSwitchModal = () => {
  const { isChainSwitchModalOpen, setChainSwitchModalOpen } = useModalContext();

  const closeModal = () => setChainSwitchModalOpen(false);

  return (
    <Modal
      isOpen={isChainSwitchModalOpen}
      onClose={closeModal}
      className="p-0 border-2 border-red-500 z-[2]"
      bodyClassName="p-8"
      disableOutsideClick
      withoutCloseButton
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
      <GradientButton
        className="bg-red-500"
        bodyClassName="bg-slate-900"
        onClick={connectToSupportedNetwork}
      >
        {`Connect to ${supportedNetworkName}`}
      </GradientButton>
    </Modal>
  );
};
