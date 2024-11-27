import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";

import { useNFTContract } from "@hooks";
import { TokenList } from "@types";

type DappProviderProps = {
  children: ReactNode;
};

type Theme = 'professional' | 'futuristic'

type DappContextType = {
  tokens: TokenList;
  isLoading: boolean;
  getTokens: () => Promise<void>;
  isProfessionalTheme: boolean;
  setTheme: Dispatch<SetStateAction<Theme>>
};

const initialValue: DappContextType = {
  tokens: [],
  isLoading: false,
  getTokens: async () => { },
  isProfessionalTheme: true,
  setTheme: () => {}
};

export const DappContext = createContext<DappContextType>(initialValue);

export const DappProvider = ({ children }: DappProviderProps) => {
  const [tokens, setTokens] = useState(initialValue.tokens);
  const [isLoading, setLoading] = useState(initialValue.isLoading);
  const [theme, setTheme] = useState<Theme>('professional');

  const isProfessionalTheme = useMemo(()=> theme === "professional", [theme])

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
    isProfessionalTheme,
    setTheme
  };

  return <DappContext.Provider value={value}>{children}</DappContext.Provider>;
};
