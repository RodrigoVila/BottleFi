import { ReactNode } from "react";

export const TokenDescription = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-lg font-medium leading-8 text-white font-marcellus">
      {children}
    </p>
  );
};
