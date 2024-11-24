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
  return (
    <div
      data-testid="animated-container"
      className={twMerge(
        "flex w-full h-full center text-xl font-bold animate-background rounded-2xl bg-gradient-to-r from-purple-700 via-fuchsia-900 to-red-700 bg-[length:400%_400%] p-[2px]",
        className
      )}
      {...rest}
    >
      <div
        className={twMerge(
          "rounded-2xl bg-black center p-2 font-bold text-white h-full w-full",
          bodyClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
