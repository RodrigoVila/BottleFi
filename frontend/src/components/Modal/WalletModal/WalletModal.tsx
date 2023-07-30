import { useEffect } from "react";

import { useWalletConnect, useEIP1193Wallet } from "@hooks";
import { useDappContext } from "@context/dapp";
import { Button } from "@components/Button";
import { Icon } from "@components/Icon";
import { Modal } from "@components/Modal";

type WalletModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

export const WalletModal = ({ isOpen, toggleModal }: WalletModalProps) => {
  const { connectWithBrowserWallet } =
  useEIP1193Wallet();

  // const { handleConnectToWC } = useWalletConnect();

  const { account } = useDappContext();

  useEffect(() => {
    console.log("acccc", account);
    account && toggleModal();
    //eslint-disable-next-line
  }, [account]);

  return isOpen ? (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <Button
        icon={<Icon src="/metamaskLogo.png" alt="Metamask Logo" />}
        onClick={()=> connectWithBrowserWallet('metamask')}
      >
        Metamask
      </Button>
      <Button
        icon={<Icon src="/braveLogo.png" alt="Brave Logo" />}
        onClick={()=> connectWithBrowserWallet('brave')}
      >
        Brave
      </Button>
      <Button
        icon={<Icon src="/coinbaseLogo.png" alt="Coinbase Logo" />}
        onClick={()=> connectWithBrowserWallet('coinbase')}
      >
        Coinbase
      </Button>
      {/* <Button
        icon={<Icon src="/walletConnectLogo.png" alt="WalletConnect Logo" />}
        onClick={handleConnectToWC}
      >
        WC
      </Button> */}
    </Modal>
  ) : null;
};
