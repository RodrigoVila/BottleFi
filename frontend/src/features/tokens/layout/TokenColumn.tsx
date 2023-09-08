import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TokenColumnProps = { 
  children: ReactNode; 
  className?: string 
};

export const TokenColumn = ({ children, className }: TokenColumnProps) => {
  return (
    <article className={twMerge("flex flex-col md:flex-1 gap-6 md:gap-4 md:px-2", className)}>{children}</article>
  );
};
