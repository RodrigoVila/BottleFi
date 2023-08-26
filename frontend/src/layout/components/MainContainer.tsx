import { ReactNode } from "react";

export const MainContainer = ({ children }: { children: ReactNode }) => {
  return <div className="w-full h-full center">{children}</div>;
};
