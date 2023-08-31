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
        "flex rounded-xl items-stretch justify-center max-w-2xl p-6 text-white glass-alt border-glass",
        className
      )}
    >
      {children}
    </div>
  );
};
