import { ReactNode } from "react";

export const TokenTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="flex items-center justify-center px-0 text-2xl font-semibold text-white">
      {children}
    </h2>
  );
};
