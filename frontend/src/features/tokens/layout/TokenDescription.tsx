import { ReactNode } from "react";

export const TokenDescription = ({ children }: { children: ReactNode }) => {
  return (
    <p className="mb-4 text-lg font-medium leading-8 text-center text-white md:text-left md:mb-0 font-marcellus">
      {children}
    </p>
  );
};
