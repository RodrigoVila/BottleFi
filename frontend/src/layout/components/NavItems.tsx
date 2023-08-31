import { useEffect } from "react";
import { Link, use, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Link = {
  title: string;
  to: string;
  borderColor: string;
  hoverColor: string;
};

const links: Link[] = [
  {
    title: "Dasboard",
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
    title: "Invalidate",
    to: "/invalidate",
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

export const NavItems = () => {
  const { pathname } = useLocation();

  const itemStyle =
    "text-base text-white cursor-pointer transition-colors duration-200 h-full py-4 border-b-2 border-b-transparent font-marcellus";

  return (
    <ul className="flex justify-center flex-1 w-full gap-6 m-0 list-none">
      {links.map((link) => (
        <li
          key={link.title}
          className={twMerge(
            itemStyle,
            link.hoverColor,
            pathname.includes(link.to) && link.borderColor
          )}
        >
          <Link to={link.to}>{link.title}</Link>
        </li>
      ))}
    </ul>
  );
};
