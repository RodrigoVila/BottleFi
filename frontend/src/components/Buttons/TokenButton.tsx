import { MouseEventHandler, ReactNode } from "react";

import { useThemeContext } from "@hooks";

import { Button } from "./Button";
import { GradientButton } from "./GradientButton";

type TokenButtonProps = {
  children?: ReactNode;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const TokenButton = ({
  children,
  isLoading,
  onClick,
}: TokenButtonProps) => {
  const { isProfessionalTheme } = useThemeContext();
  return isProfessionalTheme ? (
    <Button
      className="w-full py-[10px] font-semibold rounded-full text-lg border-0 hover:text-white bg-indigo-600 hover:bg-indigo-700"
      loading={isLoading}
      onClick={onClick}
    >
      {children}
    </Button>
  ) : (
    <GradientButton loading={isLoading} onClick={onClick}>
      {children}
    </GradientButton>
  );
};
