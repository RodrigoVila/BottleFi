import { ReactNode } from "react";

type TokenLayoutProps = {
  children: ReactNode;
};

export const TokenLayout = ({ children }: TokenLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      <div className="relative flex flex-col gap-4 p-5 border-2 rounded-lg bg-slate-900 border-slate-500">
        {children}
      </div>
    </div>
  );
};
