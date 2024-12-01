import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

type Theme = 'professional' | 'futuristic'

type ThemeContextType = {
  isProfessionalTheme: boolean;
  setTheme: Dispatch<SetStateAction<Theme>>
};

const initialValue: ThemeContextType = {
  isProfessionalTheme: true,
  setTheme: () => {}
};

export const ThemeContext = createContext<ThemeContextType>(initialValue);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('professional');

  const isProfessionalTheme = useMemo(()=> theme === "professional", [theme])

  const value = {
    isProfessionalTheme,
    setTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
