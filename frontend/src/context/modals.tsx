import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ModalContextType = {
  isChainSwitchModalOpen: boolean;
  setChainSwitchModalOpen: Dispatch<SetStateAction<boolean>>;
  isDrawerModalOpen: boolean;
  setDrawerModalOpen: Dispatch<SetStateAction<boolean>>;
  isQRModalOpen: boolean;
  setQRModalOpen: Dispatch<SetStateAction<boolean>>;
  isRolesModalOpen: boolean;
  setRolesModalOpen: Dispatch<SetStateAction<boolean>>;
};

type ModalProviderProps = {
  children: ReactNode;
};

const initialValue = {
  isChainSwitchModalOpen: false,
  setChainSwitchModalOpen: () => {},
  isDrawerModalOpen: false,
  setDrawerModalOpen: () => {},
  isQRModalOpen: false,
  setQRModalOpen: () => {},
  isRolesModalOpen: false,
  setRolesModalOpen: () => {},
};

const ModalContext = createContext<ModalContextType>(initialValue);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isChainSwitchModalOpen, setChainSwitchModalOpen] = useState(
    initialValue.isChainSwitchModalOpen
  );

  const [isDrawerModalOpen, setDrawerModalOpen] = useState(
    initialValue.isDrawerModalOpen
  );

  const [isQRModalOpen, setQRModalOpen] = useState(initialValue.isQRModalOpen);

  const [isRolesModalOpen, setRolesModalOpen] = useState(
    initialValue.isRolesModalOpen
  );

  const value = {
    isChainSwitchModalOpen,
    setChainSwitchModalOpen,
    isDrawerModalOpen,
    setDrawerModalOpen,
    isQRModalOpen,
    setQRModalOpen,
    isRolesModalOpen,
    setRolesModalOpen,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
