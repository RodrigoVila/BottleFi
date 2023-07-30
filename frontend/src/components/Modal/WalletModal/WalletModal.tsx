import { useEffect } from "react";

import { useWalletConnect, useEIP1193Wallet } from "@hooks";
import { useDappContext } from "@context/dapp";
import { Button } from "@components/Button";
import { Icon } from "@components/Icon";
import { Modal } from "@components/Modal";
import { GradientButton } from "@components/GradientButton";

type WalletModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

export const WalletModal = ({ isOpen, toggleModal }: WalletModalProps) => {
  const { connectWithBrowserWallet } = useEIP1193Wallet();

  // const { handleConnectToWC } = useWalletConnect();

  const { account } = useDappContext();

  useEffect(() => {
    console.log("acccc", account);
    account && toggleModal();
    //eslint-disable-next-line
  }, [account]);

  return isOpen ? (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <h3 className="text-4xl text-bold mb-5">Select provider</h3>
      <div className="flex flex-col items-center gap-3">
        <GradientButton
          icon={<Icon src="/src/assets/metamaskLogo.png" alt="Metamask Logo" />}
          onClick={() => connectWithBrowserWallet("metamask")}
        >
          Metamask
        </GradientButton>
        <GradientButton
          icon={<Icon src="./src/assets/braveLogo.png" alt="Brave Logo" />}
          onClick={() => connectWithBrowserWallet("brave")}
        >
          Brave
        </GradientButton>
        <GradientButton
          icon={<Icon src="/src/assets/coinbaseLogo.png" alt="Coinbase Logo" />}
          onClick={() => connectWithBrowserWallet("coinbase")}
        >
          Coinbase
        </GradientButton>
        {/* <Button
        icon={<Icon src="/walletConnectLogo.png" alt="WalletConnect Logo" />}
        onClick={handleConnectToWC}
      >
        WC
      </Button> */}
      </div>
    </Modal>
  ) : null;
};
