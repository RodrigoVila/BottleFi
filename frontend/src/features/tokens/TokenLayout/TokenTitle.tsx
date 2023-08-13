import { ReactNode } from "react";

export const TokenTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="flex items-center justify-center px-0 text-xl font-semibold text-center text-white">
      {children}
    </h2>
  );
};
