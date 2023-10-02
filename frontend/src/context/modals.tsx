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
  isDrawerModalOpen: boolean;
  setDrawerModalOpen: Dispatch<SetStateAction<boolean>>;
  isRolesModalOpen: boolean;
  setRolesModalOpen: Dispatch<SetStateAction<boolean>>;
  isUserModalOpen: boolean;
  setUserModalOpen: Dispatch<SetStateAction<boolean>>;
  closeAllModals: () => void;
};

type ModalProviderProps = {
  children: ReactNode;
};

const initialValue = {
  isChainSwitchModalOpen: false,
  setChainSwitchModalOpen: () => {},
  isDrawerModalOpen: false,
  setDrawerModalOpen: () => {},
  isRolesModalOpen: false,
  setRolesModalOpen: () => {},
  isUserModalOpen: false,
  setUserModalOpen: () => {},
  closeAllModals: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialValue);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isChainSwitchModalOpen, setChainSwitchModalOpen] = useState(
    initialValue.isChainSwitchModalOpen
  );

  const [isDrawerModalOpen, setDrawerModalOpen] = useState(
    initialValue.isDrawerModalOpen
  );

  const [isRolesModalOpen, setRolesModalOpen] = useState(
    initialValue.isRolesModalOpen
  );

  const [isUserModalOpen, setUserModalOpen] = useState(
    initialValue.isUserModalOpen
  );

  const closeAllModals = () => {
    setChainSwitchModalOpen(false);
    setDrawerModalOpen(false);
    setRolesModalOpen(false);
    setUserModalOpen(false);
  };

  const value = {
    isChainSwitchModalOpen,
    setChainSwitchModalOpen,
    isDrawerModalOpen,
    setDrawerModalOpen,
    isRolesModalOpen,
    setRolesModalOpen,
    isUserModalOpen,
    setUserModalOpen,
    closeAllModals,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
