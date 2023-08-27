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
    <div className="flex items-center justify-end flex-1 w-1/3 pr-2">
      {parseAccount(address)}
    </div>
  ) : null;
};
