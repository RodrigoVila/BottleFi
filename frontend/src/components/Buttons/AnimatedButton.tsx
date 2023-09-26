import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type AnimatedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export const AnimatedButton = ({
  children,
  className,
  ...rest
}: AnimatedButtonProps) => {
  return (
    <button
      className="animate-background inline-block  bg-gradient-to-r from-purple-700 via-fuchsia-900 to-red-700 bg-[length:400%_400%] p-[2px]"
      {...rest}
    >
      <span
        className={twMerge(
          "block px-4 py-2 text-base font-bold text-white bg-black md:px-16 hover:bg-transparent md:text-xl",
          className
        )}
      >
        {children}
      </span>
    </button>
  );
};
