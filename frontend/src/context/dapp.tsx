import { DAPP_INITIAL_DATA } from "@constants";
import { UserDataType } from "@types";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type DappProviderProps = {
  children: ReactNode;
};

type DappContextType = {
  dappData: UserDataType;
  setDappData: Dispatch<SetStateAction<UserDataType>>;
};

const initialValue: DappContextType = {
  dappData: DAPP_INITIAL_DATA,
  setDappData: () => {},
};

const DappContext = createContext<DappContextType>(initialValue);

export const DappProvider = ({ children }: DappProviderProps) => {
  const [dappData, setDappData] = useState(initialValue.dappData);

  return (
    <DappContext.Provider value={{ dappData, setDappData }}>
      {children}
    </DappContext.Provider>
  );
};

export const useDappContext = () => {
  const context = useContext(DappContext);
  if (!context) {
    throw new Error("useDappContext must be used within a DappProvider");
  }
  return context;
};
