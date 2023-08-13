import { AnimatedContainer } from "@components/AnimatedContainer/AnimatedContainer";
import { ReactNode } from "react";

export const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatedContainer className="pb-0 pr-0 rounded-none rounded-tl-2xl" bodyClassName="rounded-none rounded-tl-2xl">
      {children}
    </AnimatedContainer>
  );
};
