import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { TokenList } from "@types";

type DappProviderProps = {
  children: ReactNode;
};

type DappContextType = {
  tokens: TokenList | null;
  setTokens: Dispatch<SetStateAction<TokenList | null>>;
  tokenUrlAddress: string | null;
  setTokenUrlAddress: Dispatch<SetStateAction<string | null>>;
};

const initialValue: DappContextType = {
  tokens: null,
  setTokens: () => {},
  tokenUrlAddress: null,
  setTokenUrlAddress: () => {},
};

const DappContext = createContext<DappContextType>(initialValue);

export const DappProvider = ({ children }: DappProviderProps) => {
  const [tokens, setTokens] = useState(initialValue.tokens);
  
  //Address that will be shared with the QR Modal
  const [tokenUrlAddress, setTokenUrlAddress] = useState(
    initialValue.tokenUrlAddress
  );

  const value = {
    tokens,
    setTokens,
    tokenUrlAddress,
    setTokenUrlAddress,
  };

  return <DappContext.Provider value={value}>{children}</DappContext.Provider>;
};

export const useDappContext = () => {
  const context = useContext(DappContext);
  if (!context) {
    throw new Error("useDappContext must be used within a DappProvider");
  }
  return context;
};
