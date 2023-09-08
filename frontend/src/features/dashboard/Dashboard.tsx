import "./Dashboard.css";
import { twMerge } from "tailwind-merge";

import { useDappContext, useModalContext } from "@hooks";

import { TokensTable } from "./TokensTable";

export const Dashboard = () => {
  const { tokens, setTokenUrlAddress } = useDappContext();
  const { setQRModalOpen } = useModalContext();

  const handleClick = (id: number) => {
    const url = `${window.location.origin}/verify/${id.toString()}`;

    setTokenUrlAddress(url);
    setQRModalOpen(true);
  };

  return (
    <div className="flex-col w-full max-w-4xl gap-2 mx-2 min-w-xl md:mx-0 center">
      <h3 className="text-4xl font-medium font-marcellus">Dashboard</h3>
      <div
        id="dashboard"
        className={twMerge(
          "flex flex-col w-full text-white glass-alt border-glass border-[2px] rounded-xl h-96 overflow-scroll"
        )}
      >
        <TokensTable tokens={tokens} handleSeeQR={handleClick} />
      </div>
    </div>
  );
};
