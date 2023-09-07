import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TokenLayoutProps = {
  children: ReactNode;
  className?: string;
};

export const TokenLayout = ({ children, className }: TokenLayoutProps) => {
  return (
    <div
      className={twMerge(
        "w-full h-full md:h-fit flex flex-col md:flex-row md:rounded-xl items-stretch justify-center max-w-2xl p-6 text-white glass-alt border-glass overflow-y-scroll",
        className
      )}
    >
      {children}
    </div>
  );
};
