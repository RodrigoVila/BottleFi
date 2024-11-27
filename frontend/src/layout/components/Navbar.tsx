import { useAuthContext, useDappContext, useWallet } from "@hooks";
import { AnimatedButton } from "@components/Buttons";
import { Logo } from "@components/Logo";
import { BurgerMenu, UserMenu } from "@components/Menues";
import { NavItems } from "@components/NavItems";
import { twMerge } from "tailwind-merge";

export const Navbar = () => {
  const { user } = useAuthContext();
  const { handleConnect } = useWallet();
  const { isProfessionalTheme } = useDappContext()

  const themeStyles = isProfessionalTheme ? "bg-indigo-700 text-gray-200" : "glass-alt text-white"
  
  return (
    <header className={twMerge("relative flex items-center justify-between w-full text-xl font-semibold text-white h-[55px] border-b-2 border-b-transparent px-2", themeStyles)}>
      <BurgerMenu />
      <Logo type="navbar" />
      <NavItems />
      <div className="flex justify-end flex-1">
        {user?.address ? (
          <UserMenu address={user.address} />
        ) : (
          <AnimatedButton
            className="!text-base lg:px-4"
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
