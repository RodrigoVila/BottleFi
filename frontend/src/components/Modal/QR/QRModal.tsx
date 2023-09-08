import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

import { useDappContext,useModalContext } from "@hooks";

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
        <div className="flex flex-col items-center gap-4 px-4 pt-8 pb-6 md:gap-8">
          <h3 className="md:text-3xl">
            Scan this QR from your phone to verify token authenticity
          </h3>
          <QRCode value={tokenUrlAddress} className="w-24 h-24 md:h-48 md:w-48" />
          <span>or</span>
          <Link to={tokenUrlAddress} className="text-sm underline md:text-base">
            Verify from this website
          </Link>
        </div>
      ) : null}
    </Modal>
  );
};
