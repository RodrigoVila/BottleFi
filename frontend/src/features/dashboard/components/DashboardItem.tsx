import { twMerge } from "tailwind-merge";
import { ReactNode, HTMLAttributes, MouseEvent } from "react";

import { useContextStyles } from "@context/styles";

type DashboardItemProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
};

export const DashboardItem = ({
  children,
  className,
  ...rest
}: DashboardItemProps) => {
  const { setSectionID } = useContextStyles();

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    setSectionID(target.id);
  };

  const handleMouseLeave = () => setSectionID("");

  return (
    <article
      className={twMerge(
        "flex cursor-pointer items-center w-full h-full rounded-2xl p-5 mb-8 glass border-2 border-transparent",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </article>
  );
};
