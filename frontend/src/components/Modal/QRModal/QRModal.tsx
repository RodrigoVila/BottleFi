import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

import { useDappContext } from "@context/dapp";
import { useModalContext } from "@context/modals";

import { Modal } from "..";

export const QRModal = () => {
  const { isQRModalOpen, setQRModalOpen } = useModalContext();
  const { tokenUrlAddress, setTokenUrlAddress } = useDappContext();

  const closeModal = () => {
    setQRModalOpen(false);
    setTokenUrlAddress(null);
  };

  return (
    <Modal isOpen={isQRModalOpen} onClose={closeModal}>
      {tokenUrlAddress ? (
        <div className="flex flex-col items-center gap-8 px-4 pt-8 pb-6">
          <h3 className="text-3xl">
            Scan this QR from your phone to verify token authenticity
          </h3>
          <QRCode value={tokenUrlAddress} />
          <span>or</span>
          <Link to={tokenUrlAddress} className="underline">
            Verify from this website
          </Link>
        </div>
      ) : null}
    </Modal>
  );
};
