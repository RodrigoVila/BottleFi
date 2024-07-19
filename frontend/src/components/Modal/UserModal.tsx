import { useEffect, useState } from "react";

import { useAuthContext, useModalContext, useWallet } from "@hooks";
import { UserBalance } from "@layout/components/UserBalance";
import { getBalance } from "@utils/ethers";
import { parseAccount } from "@utils/parse";

import { Modal } from "./";
import { Button } from "@components/Buttons";

export const UserModal = () => {
  const [balance, setBalance] = useState<string | null>(null);

  const { isUserModalOpen, setUserModalOpen } = useModalContext();
  const { handleDisconnect } = useWallet();

  const { user } = useAuthContext();

  const closeModal = () => setUserModalOpen(false);

  useEffect(() => {
    if (!user) return;

    const fetchBalance = async () => {
      try {
        const balance = await getBalance();
        if (balance) setBalance(balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [user]);

  return user?.address ? (
    <Modal
      isOpen={isUserModalOpen}
      onClose={closeModal}
      bodyClassName="w-fit px-8"
      className="w-fit"
    >
      <div className="flex-col gap-3 p-3 center glass-alt">
        <p className="px-3 py-1 ml-3 text-base bg-transparent md:hidden sm:ml-0 font-marcellus w-max">
          Acc: {parseAccount(user.address)}
        </p>
        <UserBalance balance={balance} />
        <Button
          className="w-full p-1 text-base text-center cursor-pointer"
          onClick={handleDisconnect}
        >
          Logout
        </Button>
      </div>
    </Modal>
  ) : null;
};
