import { ReactNode } from "react";

type TokenLayoutProps = {
  children: ReactNode;
};

export const TokenLayout = ({  children }: TokenLayoutProps) => {
  return (
    <div className="flex items-center justify-center w-full h-full text-white flex-col">
      <div className="bg-gradient min-w-[260px] flex flex-col p-px rounded-lg">
        <div className="bg-black w-full h-full p-5 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};
