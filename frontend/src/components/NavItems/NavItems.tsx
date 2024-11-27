import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useAuthContext, useDappContext } from "@hooks";

type Link = {
  title: string;
  to: string;
  borderColor: string;
  hoverColor: string;
};

type NavItemProps = { position?: "horizontal" | "vertical" };

const links: Link[] = [
  {
    title: "Dashboard",
    to: "/dashboard",
    borderColor: "border-b-red-400",
    hoverColor: "hover:border-b-red-400",
  },
  {
    title: "Mint",
    to: "/mint",
    borderColor: "border-b-yellow-400",
    hoverColor: "hover:border-b-yellow-400",
  },
  {
    title: "Transfer",
    to: "/transfer",
    borderColor: "border-b-green-400",
    hoverColor: "hover:border-b-green-400",
  },
  {
    title: "Sell",
    to: "/sell",
    borderColor: "border-b-blue-400",
    hoverColor: "hover:border-b-blue-400",
  },
  {
    title: "Verify",
    to: "/verify",
    borderColor: "border-b-purple-400",
    hoverColor: "hover:border-b-purple-400",
  },
];

export const NavItems = ({ position = "horizontal" }: NavItemProps) => {
  const { pathname } = useLocation();
  const { user } = useAuthContext();
  const { isProfessionalTheme } = useDappContext()

    const positionStyles =
    position === "horizontal"
      ? "hidden flex-1 lg:flex flex-row w-full mx-2"
      : "flex-col px-2";

  const RoleLinks: Record<string, string[]> = {
    supplier: ["Dashboard", "Mint", "Transfer", "Sell", "Verify"],
    vendor: ["Dashboard", "Sell", "Verify"],
    default: ["Dashboard", "Verify"],
  };

  const allowedLinksPerRole = RoleLinks[user?.role || "default"];

  return (
    <ul
      className={twMerge("justify-center gap-6 m-0 list-none", positionStyles)}
    >
      {links
        .filter((link) => allowedLinksPerRole.includes(link.title))
        .map((link) => (
          <li
            key={link.title}
            className={twMerge(
              "text-base text-white text-center cursor-pointer transition-colors duration-200 h-full py-4 border-b-2 border-b-transparent font-marcellus",
              position === "horizontal" ? "py-4" : "px-6",
              isProfessionalTheme ? "hover:border-b-white" : link.hoverColor,
              pathname.includes(link.to) ? isProfessionalTheme ? "border-b-white" : link.borderColor : ""
            )}
          >
            <Link to={link.to}>{link.title}</Link>
          </li>
        ))}
    </ul>
  );
};
