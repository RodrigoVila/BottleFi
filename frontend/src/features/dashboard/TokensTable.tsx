import "./TokensTable.css";
import { useEffect, useState } from "react";
import { BiDownArrowAlt } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { TokenList } from "@types";

import { Token } from "./Token";

type TokensTableType = {
  tokens: TokenList;
};

export const TokensTable = ({ tokens }: TokensTableType) => {
  const [isFirstTime, setFirstTime] = useState(false);
  const [showQRMessage, setShowQRMessage] = useState(false);
  const [selectedQRShown, setSelectedQRShown] = useState<number | null>(null);

  const showQR = (id: number | null) => {
    if (!isFirstTime) {
      setFirstTime(true);
      setShowQRMessage(true);
    }

    setSelectedQRShown(id);
  };

  useEffect(() => {
    if (!showQRMessage) return;
    const timer = setTimeout(() => {
      setShowQRMessage(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [showQRMessage]);

  return (
    // TODO: Can't use max-h on table unless is a block. Using it here for now, but sticky doesnt work on header. See next comment
    <div id="table" className="relative w-full max-h-[50vh] overflow-scroll">
      <div
        className={twMerge(
          "flex flex-col items-center text-center max-w-[150px] animate-bounce-slow absolute -top-36 -right-5 transition-all duration-1000",
          showQRMessage ? "" : "opacity-0"
        )}
      >
        <p className="p-2 border-2 border-white rounded-xl">
          Scan the QR with your phone to see token's authenticity
        </p>
        <BiDownArrowAlt size={28} />
      </div>
      <table className="text-white border-glass border-[2px] w-full rounded-xl border-collapse overflow-hidden">
        {/* TODO: Thead doesn't stick on top. See previous comment  */}
        <thead className="sticky top-0 bg-black border-b-2 rounded-b-none border-glass font-marcellus">
          <tr>
            <th className="py-3">Image</th>
            <th className="px-1">Name</th>
            <th className="hidden px-1 md:table-cell">Description</th>
            <th className="px-1">Mint Date</th>
            <th className="px-1">Validity</th>
            <th className="pl-1 pr-3">QR Code</th>
          </tr>
        </thead>
        <tbody className="glass-alt">
          {tokens?.map((token) => (
            <Token
              key={token.image}
              token={token}
              isShown={selectedQRShown === token.id}
              showQR={showQR}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
