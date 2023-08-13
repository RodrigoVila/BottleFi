import { ReactNode } from "react";

export const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="z-1 relative flex flex-col items-center h-full p-2 md:p-4 lg:p-6">
      {children}
    </main>
  );
};
