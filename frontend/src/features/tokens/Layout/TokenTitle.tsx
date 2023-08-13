import { ReactNode } from "react";

export const TokenTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="px-0 text-center gradient-text text-xl font-semibold">
      {children}
    </h2>
  );
};
