import { useEffect, ReactNode } from "react";
import styles from "./Modal.module.css";

import { Portal } from "@utils/Portal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isOpen]);

  return isOpen ? (
    <Portal>
      <div className={styles.container} onClick={onClose}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};
