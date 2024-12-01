import { useThemeContext } from "@hooks";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type AnimatedContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export const AnimatedContainer = ({
  children,
  className,
  bodyClassName,
  ...rest
}: AnimatedContainerProps) => {
  const { isProfessionalTheme } = useThemeContext()

  const themeStyles = !isProfessionalTheme && "animate-background p-[2px] bg-gradient-to-r from-purple-700 via-fuchsia-900 to-red-700 bg-[length:400%_400%]"
  const innerThemeStyles = isProfessionalTheme ? "bg-slate-900" : "bg-black"

  return (
    <div
      data-testid="animated-container"
      className={twMerge(
        "flex w-full h-full center text-xl font-bold rounded-2xl",
        themeStyles,
        className
      )}
      {...rest}
    >
      <div
        className={twMerge(
          "rounded-2xl center p-2 font-bold text-white h-full w-full",
          innerThemeStyles,
          bodyClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
