import { useThemeContext } from "@hooks";
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
  const { isProfessionalTheme } = useThemeContext()

  const themeStyles = isProfessionalTheme ? "p-0" : "p-[2px]"
  const themeSpanStyles = isProfessionalTheme ? "bg-slate-900" : "bg-black"

  return (
    <button
      className={twMerge("inline-block bg-gradient-to-r from-purple-700 via-fuchsia-900 to-red-700 bg-[length:400%_400%]", themeStyles)}
      {...rest}
    >
      <span
        className={twMerge(
          "block px-4 py-2 text-base font-bold text-white bg-black md:px-6 hover:bg-transparent md:text-xl",
          themeSpanStyles,
          className
        )}
      >
        {children}
      </span>
    </button>
  );
};
