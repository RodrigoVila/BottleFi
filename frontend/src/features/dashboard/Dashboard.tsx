import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { useDappContext, useModalContext, useNFTContract } from "@hooks";

import { TokensTable } from "./TokensTable";

export const Dashboard = () => {
  const { tokens, setTokens, setTokenUrlAddress } = useDappContext();
  const { setQRModalOpen } = useModalContext();

  const { getTokens } = useNFTContract();

  const handleClick = (id: number) => {
    const url = `${window.location.origin}/verify/${id.toString()}`;

    setTokenUrlAddress(url);
    setQRModalOpen(true);
  };

  useEffect(() => {
    const fetchTokens = async () => {
      const tokenList = await getTokens();
      if (tokenList) setTokens(tokenList);
    };

    fetchTokens();
  }, []);

  return (
    <div className="flex-col w-full max-w-2xl gap-2 mx-2 md:mx-0 center">
      <h3 className="text-4xl font-medium font-marcellus">Dashboard</h3>
      <div
        className={twMerge(
          "flex flex-col w-full text-white glass-alt border-glass border-[2px] rounded-xl min-h-[24rem]"
        )}
      >
        <TokensTable tokens={tokens} handleSeeQR={handleClick} />
      </div>
    </div>
  );
};
