import { ReactNode } from "react";

export const TokenTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="flex items-center justify-center px-0 text-3xl text-white font-marcellus">
      {children}
    </h2>
  );
};
