import { useEffect, useState } from "react";

import { getCurrentAccount } from "@utils/ethers";
import { parseAccount } from "@utils/parse";

export const AccountData = () => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const getAccount = async () => {
      const account = await getCurrentAccount();
      if (account) setAddress(account);
    };

    getAccount();
  }, []);

  return address ? (
    <div className="justify-end flex-1 gap-3 pr-3 center w-fit">
      {/* <div className="overflow-hidden text-xs border-2 rounded-xl border-glass center">
        <div className="flex py-[6px] px-3 text-center bg-glass">Balance</div>
        <div className="px-2"> 9999 <span className="text-[10px]">ETH</span></div>
      </div> */}
      <span className="text-base font-marcellus">{parseAccount(address)}</span>
    </div>
  ) : null;
};
