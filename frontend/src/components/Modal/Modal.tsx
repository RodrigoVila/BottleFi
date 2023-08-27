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
        className="absolute inset-0 z-0 flex items-center justify-center text-center bg-darkOverlay"
        onClick={disableOutsideClick ? undefined : onClose}
      >
        <AnimatedContainer
          className={twMerge("max-w-xl h-fit", className)}
          bodyClassName={twMerge("relative flex-col gap-6", bodyClassName)}
          onClick={(e)=>e.preventDefault()}
        >
          <button className="absolute top-2 right-2 z-[1]" onClick={onClose}>
            <AiOutlineClose size={28} />
          </button>
          {children}
        </AnimatedContainer>
      </div>
    </Portal>
  ) : null;
};
