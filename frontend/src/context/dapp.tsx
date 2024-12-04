import { createContext, ReactNode, useState } from "react";

import { useNFTContract } from "@hooks";
import { TokenList } from "@types";

type DappProviderProps = {
  children: ReactNode;
};

type DappContextType = {
  tokens: TokenList;
  isLoading: boolean;
  getTokens: () => Promise<void>;
};

const initialValue: DappContextType = {
  tokens: [],
  isLoading: false,
  getTokens: async () => { },
};

export const DappContext = createContext<DappContextType>(initialValue);

export const DappProvider = ({ children }: DappProviderProps) => {
  const [tokens, setTokens] = useState(initialValue.tokens);
  const [isLoading, setLoading] = useState(initialValue.isLoading);

  const { fetchTokens } = useNFTContract();

  const getTokens = async () => {
    setLoading(true);
    const tokenList = await fetchTokens();
    setLoading(false);
    if (tokenList) setTokens(tokenList);
  };

  const value = {
    tokens,
    getTokens,
    isLoading,
  };

  return <DappContext.Provider value={value}>{children}</DappContext.Provider>;
};
