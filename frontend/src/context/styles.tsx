import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";

type StylesContextType = {
  sectionID: string;
  setSectionID: Dispatch<SetStateAction<string>>;
};

type StylesProviderProps = {
  children: ReactNode;
};

const initialValue = {
  sectionID: "",
  setSectionID: () => {},
};

const StylesContext = createContext<StylesContextType>(initialValue);

export const StylesProvider = ({ children }: StylesProviderProps) => {
  const [sectionID, setSectionID] = useState(initialValue.sectionID);

  return (
    <StylesContext.Provider value={{ sectionID, setSectionID }}>
      {children}
    </StylesContext.Provider>
  );
};

export const useContextStyles = () => {
  const context = useContext(StylesContext);
  if (!context) {
    throw new Error("useContextStyles must be used within a StylesProvider");
  }
  return context;
};
