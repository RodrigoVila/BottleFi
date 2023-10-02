import { useAuthContext, useWallet } from "@hooks";
import { AnimatedButton } from "@components/Buttons";
import { Logo } from "@components/Logo";
import { NavItems } from "@components/NavItems";

import { DrawerMenuButton, UserMenu } from "./";

export const Navbar = () => {
  const { user } = useAuthContext();
  const { handleConnect } = useWallet();
  return (
    <header className="relative flex items-center justify-between w-full text-xl font-semibold text-white z-1 glass-alt h-[55px] border-b-2 border-b-transparent">
      <DrawerMenuButton />
      <Logo type="navbar" />
      <NavItems />
      <div className="flex justify-end flex-1 md:mr-2">
        {user?.address ? (
          <UserMenu address={user.address} />
        ) : (
          <AnimatedButton
            className="!text-base md:px-4"
            onClick={handleConnect}
          >
            Login
          </AnimatedButton>
        )}
      </div>
    </header>
  );
};

export default Navbar;
