import { useContext } from "react";

import { DappContext } from "../context/dapp";

export const useDappContext = () => {
    const context = useContext(DappContext);
    if (!context) {
      throw new Error("useDappContext must be used within a DappProvider");
    }
    return context;
  };