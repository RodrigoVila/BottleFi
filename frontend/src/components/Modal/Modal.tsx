import { useEffect, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { AiOutlineClose } from "react-icons/ai";
import { Portal } from "@utils/Portal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  disableOutsideClick?: boolean;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  bodyClassName,
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
        className={twMerge("absolute inset-0 z-0 flex items-center justify-center text-center bg-darkOverlay", className)}
        onClick={disableOutsideClick ? undefined : onClose}
      >
        <div
          className={twMerge("z-[1] relative center flex-col w-full py-5 px-2 rounded-xl gap-5 mx-2", bodyClassName)}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="absolute top-2 right-2" onClick={onClose}>
            <AiOutlineClose size={24} />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};
