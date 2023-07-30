import { useEffect, ReactNode } from "react";

import { Portal } from "@utils/Portal";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isOpen]);

  return isOpen ? (
    <Portal>
      <div
        className="flex justify-center items-center text-center bg-darkOverlay absolute inset-0 z-0"
        onClick={onClose}
      >
        <div
          className={twMerge("z-[1]", className)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};
