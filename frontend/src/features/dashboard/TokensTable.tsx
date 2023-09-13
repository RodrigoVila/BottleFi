import { useEffect, useState } from "react";
import { BiDownArrowAlt } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { useDappContext } from "@hooks";
import { Spinner } from "@components/Spinner";

import { Token } from "./Token";
import { Link } from "react-router-dom";

export const TokensTable = () => {
  const [isFirstTime, setFirstTime] = useState(false);
  const [showQRMessage, setShowQRMessage] = useState(false);
  const [selectedQRShown, setSelectedQRShown] = useState<number | null>(null);

  const { isLoading, tokens } = useDappContext();

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

  return tokens.length > 0 ? (
    <div className="relative w-full">
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
      <table
        id="dashboard"
        className="text-white border-glass border-[2px] w-full rounded-xl border-collapse overflow-hidden max-h-[75vh]"
      >
        <thead className="sticky top-0 bg-black border-b-2 rounded-b-none border-glass font-marcellus">
          <tr>
            <th className="py-3">Image</th>
            <th className="px-1">Name</th>
            <th className="hidden px-1 md:table-cell">Description</th>
            <th className="px-1">Mint Date</th>
            <th className="px-1">Validity</th>
            <th className="pl-1 pr-3">QR</th>
          </tr>
        </thead>
        <tbody className="glass-alt">
          {tokens?.map((token) => (
            <Token
              token={token}
              isShown={selectedQRShown === token.id}
              showQR={showQR}
            />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="w-full h-screen px-8 text-xl text-center center">
      {isLoading ? (
        <Spinner>Loading tokens...</Spinner>
      ) : (
        <p>
          You don't have tokens yet. If you have a Supplier role, then you can
          <Link className="mx-1 font-bold underline" to="/mint">
            mint
          </Link>
          one. Otherwise you can transfer to this address from an account with
          that role.
        </p>
      )}
    </div>
  );
};
