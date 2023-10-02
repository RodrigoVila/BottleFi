import { FaUserAstronaut } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import { useModalContext } from "@hooks";
import { Button } from "@components/Buttons";
import { parseAccount } from "@utils/parse";

export const UserMenu = ({ address }: { address: string }) => {
  const { isUserModalOpen, setUserModalOpen } = useModalContext();

  const toggleMenu = () => setUserModalOpen((open) => !open);

  return (
    <div className="flex justify-end flex-1 mr-2">
      {/* Mobile: User Icon as a Menu button */}
      <FaUserAstronaut
        className="w-6 h-6 cursor-pointer md:hidden hover:text-white"
        onClick={toggleMenu}
      />
      {/* Tablet onwards: User Address as a Menu button */}
      <Button
        className={twMerge(
          "hidden md:block py-1 px-3 ml-3 sm:ml-0 text-base font-marcellus w-max text-glass-3 bg-transparent",
          isUserModalOpen && "text-black bg-white"
        )}
        onClick={toggleMenu}
      >
        {parseAccount(address)}
      </Button>
    </div>
  );
};
