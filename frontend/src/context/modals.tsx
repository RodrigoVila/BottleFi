import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type ModalContextType = {
  isChainSwitchModalOpen: boolean;
  setChainSwitchModalOpen: Dispatch<SetStateAction<boolean>>;
  isRolesModalOpen: boolean;
  setRolesModalOpen: Dispatch<SetStateAction<boolean>>;
  closeAllModals: () => void;
};

type ModalProviderProps = {
  children: ReactNode;
};

const initialValue = {
  isChainSwitchModalOpen: false,
  setChainSwitchModalOpen: () => {},
  isRolesModalOpen: false,
  setRolesModalOpen: () => {},
  closeAllModals: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialValue);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isChainSwitchModalOpen, setChainSwitchModalOpen] = useState(
    initialValue.isChainSwitchModalOpen
  );

  const [isRolesModalOpen, setRolesModalOpen] = useState(
    initialValue.isRolesModalOpen
  );

  const closeAllModals = () => {
    setChainSwitchModalOpen(false);
    setRolesModalOpen(false);
  };

  const value = {
    isChainSwitchModalOpen,
    setChainSwitchModalOpen,
    isRolesModalOpen,
    setRolesModalOpen,
    closeAllModals,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
