import { useEffect, useState } from "react";

import { getBalance } from "@utils/ethers";

export const UserBalance = () => {
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getBalance();
        if (balance) setBalance(balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return balance ? (
    <div className="overflow-hidden text-xs border-2 rounded-xl border-glass center">
      <div className="flex py-[6px] px-3 text-center bg-glass">Balance</div>
      <div className="px-2">
        <span className="text-[10px]">{balance}</span>
      </div>
    </div>
  ) : null;
};
