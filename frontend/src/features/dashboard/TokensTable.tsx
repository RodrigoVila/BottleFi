import "./TokensTable.css";
import { useEffect, useState } from "react";

import { TokenList } from "@types";

import { QRMessage } from "./QRMessage";
import { Token } from "./Token";

type TokensTableType = {
  tokens: TokenList;
};

export const TokensTable = ({ tokens }: TokensTableType) => {
  const [isFirstTime, setFirstTime] = useState(false);
  const [isQRMessageShown, setShowQRMessage] = useState(false);
  const [selectedQRShown, setSelectedQRShown] = useState<number | null>(null);

  const showQR = (id: number | null) => {
    if (!isFirstTime) {
      setFirstTime(true);
      setShowQRMessage(true);
    }

    setSelectedQRShown(id);
  };

  useEffect(() => {
    if (!isQRMessageShown) return;
    const timer = setTimeout(() => {
      setShowQRMessage(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [isQRMessageShown]);

  const thStyle =
    "sticky top-0 z-[1] bg-black border-b-2 rounded-b-none border-glass font-marcellus py-1";

  return (
    // TODO: Can't use max-h on table unless is a block. Using it here for now, but sticky doesnt work on header. See next comment
    <div className="relative w-full">
      <QRMessage isShown={isQRMessageShown} />
      <div id="table" className="w-full overflow-scroll max-h-96">
        <table className="relative text-white border-glass border-[2px] w-full rounded-xl border-collapse overflow-scroll h-full">
          {/* TODO: Thead doesn't stick on top. See previous comment  */}
          <thead>
            <tr>
              <th className={`${thStyle} py-3`}>Image</th>
              <th className={`${thStyle} px-1`}>Name</th>
              <th className={`${thStyle} hidden px-1 md:table-cell`}>
                Description
              </th>
              <th className={`${thStyle} px-1`}>Mint Date</th>
              <th className={`${thStyle} px-1`}>Validity</th>
              <th className={`${thStyle} pl-1 pr-3`}>QR Code</th>
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
    </div>
  );
};
