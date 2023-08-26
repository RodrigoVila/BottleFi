import { ReactNode } from "react";

export const TokenColumn = ({ children }: { children: ReactNode }) => {
  return (
    <article className="flex flex-col flex-1 gap-4 px-2">
      {children}
    </article>
  );
};
