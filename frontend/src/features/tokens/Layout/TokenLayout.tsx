import { ReactNode } from "react";

type TokenLayoutProps = {
  children: ReactNode;
};

export const TokenLayout = ({ children }: TokenLayoutProps) => {
  return (
    <div className="flex items-stretch justify-center max-w-2xl p-6 text-white glass-alt border-glass">
      {children}
    </div>
  );
};
