import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { TokenList } from "@types";

type DappProviderProps = {
  children: ReactNode;
};

type DappContextType = {
  tokens: TokenList;
  setTokens: Dispatch<SetStateAction<TokenList>>;
  tokenUrlAddress: string | null;
  setTokenUrlAddress: Dispatch<SetStateAction<string | null>>;
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const initialValue: DappContextType = {
  tokens: [],
  setTokens: () => {},
  tokenUrlAddress: null,
  setTokenUrlAddress: () => {},
  isLoading: false,
  setLoading: () => {},
};

export const DappContext = createContext<DappContextType>(initialValue);

export const DappProvider = ({ children }: DappProviderProps) => {
  const [tokens, setTokens] = useState(initialValue.tokens);
  const [isLoading, setLoading] = useState(initialValue.isLoading);

  //Address that will be shared with the QR Modal
  const [tokenUrlAddress, setTokenUrlAddress] = useState(
    initialValue.tokenUrlAddress
  );

  const value = {
    tokens,
    setTokens,
    tokenUrlAddress,
    setTokenUrlAddress,
    isLoading,
    setLoading,
  };

  return <DappContext.Provider value={value}>{children}</DappContext.Provider>;
};
