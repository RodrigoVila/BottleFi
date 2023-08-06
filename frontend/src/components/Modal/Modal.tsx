import { useEffect, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { AiOutlineClose } from "react-icons/ai";
import { Portal } from "@utils/Portal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  disableOutsideClick?: boolean;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  disableOutsideClick = false,
}: ModalProps) => {
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isOpen]);

  return isOpen ? (
    <Portal>
      <div
        className="absolute inset-0 z-0 flex items-center justify-center text-center bg-darkOverlay"
        onClick={disableOutsideClick ? undefined : onClose}
      >
        <div
          className={twMerge("z-[1] relative", className)}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="absolute top-3 right-3" onClick={onClose}>
            <AiOutlineClose size={24} />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};
