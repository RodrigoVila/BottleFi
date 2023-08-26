import { ReactNode } from "react";

type TokenLayoutProps = {
  children: ReactNode;
};

export const TokenLayout = ({ children }: TokenLayoutProps) => {
  return (
    <div className="flex justify-center max-w-xl p-6 text-white glass-alt border-glass">
      {children}
    </div>
  );
};
