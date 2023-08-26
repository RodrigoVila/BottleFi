import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TokenColumnProps = { 
  children: ReactNode; 
  className?: string 
};

export const TokenColumn = ({ children, className }: TokenColumnProps) => {
  return (
    <article className={twMerge("flex flex-col flex-1 gap-4 px-2", className)}>{children}</article>
  );
};
