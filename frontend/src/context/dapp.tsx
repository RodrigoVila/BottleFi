import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { useLocalStorage } from "@hooks";

type DappContext = {
  account: string | null;
  chainId: string | null;
  provider: string | null;
  walletConnectProvider: any;
  error: string | null;
  setAccount: Dispatch<SetStateAction<any>>;
  setChainId: Dispatch<SetStateAction<any>>;
  setProvider: Dispatch<SetStateAction<any>>;
  setWalletConnectProvider: Dispatch<SetStateAction<any>>;
  setError: Dispatch<SetStateAction<any>>;
};

const initialValue = {
  account: null,
  chainId: null,
  provider: null,
  walletConnectProvider: null,
  error: null,
  setAccount: () => {},
  setChainId: () => {},
  setProvider: () => {},
  setWalletConnectProvider: () => {},
  setError: () => {},
};

const DappContext = createContext<DappContext>(initialValue);

export const DappProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [walletConnectProvider, setWalletConnectProvider] = useState(null);
  const [error, setError] = useState(null);
  
  const value = {
    account,
    setAccount,
    chainId,
    setChainId,
    provider,
    setProvider,
    walletConnectProvider,
    setWalletConnectProvider,
    error,
    setError,
  };

  // const key = process.env.REACT_APP_LOCAL_STORAGE_KEY || "@WF_STG";

  // const [localStorageValue, setLocalStorageValue] = useLocalStorage(key, "");

  // useEffect(() => {
  //   if (localStorageValue) {
  //   }
  // }, [localStorageValue]);

  return <DappContext.Provider value={value}>{children}</DappContext.Provider>;
};

export const useDappContext = () => {
  const context = useContext(DappContext);
  if (!context) {
    throw new Error("useDappContext must be used within a DappProvider");
  }
  return context;
};
