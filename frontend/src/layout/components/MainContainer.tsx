import { AnimatedContainer } from "@components/AnimatedContainer/AnimatedContainer";
import { ReactNode } from "react";

export const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatedContainer className="rounded-2xl" bodyClassName="rounded-2xl">
      {children}
    </AnimatedContainer>
  );
};
