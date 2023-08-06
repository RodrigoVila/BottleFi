import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type ModalContextType = {
  isChainSwitchOpen: boolean;
  setChainSwitchOpen: Dispatch<SetStateAction<boolean>>;
};

type ModalProviderProps = {
  children: ReactNode;
};

const initialValue = {
  isChainSwitchOpen: false,
  setChainSwitchOpen: () => {},
};

const ModalContext = createContext<ModalContextType>(initialValue);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isChainSwitchOpen, setChainSwitchOpen] = useState(
    initialValue.isChainSwitchOpen
  );

  const value = {
    isChainSwitchOpen,
    setChainSwitchOpen,
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
