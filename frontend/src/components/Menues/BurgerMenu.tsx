import { GiHamburgerMenu } from "react-icons/gi";

import {
  FloatingMenu,
  FloatingMenuContent,
  FloatingMenuTrigger,
} from "@components/Menues/FloatingMenu";
import { NavItems } from "@components/NavItems";

export const BurgerMenu = () => {
  return (
    <div className="flex flex-1 lg:hidden">
      <FloatingMenu>
        <FloatingMenuTrigger>
          <GiHamburgerMenu size={20} />
        </FloatingMenuTrigger>
        <FloatingMenuContent className="z-[1] bg-slate-800">
          <NavItems position="vertical" />
        </FloatingMenuContent>
      </FloatingMenu>
    </div>
  );
};
