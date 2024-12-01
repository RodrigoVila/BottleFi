import { ReactNode } from "react";

export const TokenTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-3xl font-marcellus">
      {children}
    </h2>
  );
};
