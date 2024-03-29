import { ReactNode, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

import { AnimatedContainer } from "@components/AnimatedContainer/AnimatedContainer";
import { Portal } from "@utils/Portal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  overlayClassName?: string;
  disableOutsideClick?: boolean;
  withoutCloseButton?: boolean;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  bodyClassName,
  overlayClassName,
  disableOutsideClick = false,
  withoutCloseButton = false,
}: ModalProps) => {
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isOpen]);

  return isOpen ? (
    <Portal>
      <div
        className={twMerge("absolute inset-0 z-[2] flex items-center justify-center text-center bg-darkOverlay",overlayClassName)}
        onClick={disableOutsideClick ? undefined : onClose}
      >
        <AnimatedContainer
          className={twMerge("max-w-xl h-fit m-4", className)}
          bodyClassName={twMerge("relative flex-col gap-6", bodyClassName)}
          onClick={(e) => e.preventDefault()}
        >
          {withoutCloseButton ? null : (
            <button className="absolute top-3 right-3 z-[3]" onClick={onClose}>
              <AiOutlineClose size={28} />
            </button>
          )}
          {children}
        </AnimatedContainer>
      </div>
    </Portal>
  ) : null;
};
