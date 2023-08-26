import { ReactNode } from "react";

export const TokenDescription = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-lg font-medium leading-relaxed text-white">
      {children}
    </p>
  );
};
