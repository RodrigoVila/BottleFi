import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import {
  useAuthContext,
  useDappContext,
  useNFTContract,
  useWallet,
} from "@hooks";
import { Modals } from "@components/Modal";

import { MainContainer, Navbar } from "./components";

export const Layout = () => {
  const { setTokens } = useDappContext();
  const { user } = useAuthContext();
  const { getTokens } = useNFTContract();
  
  //This is being called here for event listeners
  useWallet();

  useEffect(() => {
    const fetchTokens = async () => {
      const tokenList = await getTokens();
      if (tokenList) setTokens(tokenList);
    };

    fetchTokens();
  }, [user?.address]);

  return (
    <>
      <Modals />
      <div className="w-full h-screen bg-center bg-no-repeat bg-cover bg-layout">
        <div className="flex flex-col h-screen overflow-hidden text-white">
          <Navbar />
          <MainContainer>
            <Outlet />
          </MainContainer>
        </div>
      </div>
    </>
  );
};
