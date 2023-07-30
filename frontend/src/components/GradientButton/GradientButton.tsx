import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  children: ReactNode;
};

export const GradientButton = ({
  children,
  icon,
  ...rest
}: GradientButtonProps) => {
  return (
    <button
      className="w-full bg-gradient-to-r from-purple-700 via-fuchsia-700 to-red-700 rounded-full"
      {...rest}
    >
      <div
        className={twMerge(
          "flex items-center gap-6 bg-black m-px font-semibold py-2 px-16 rounded-full hover:bg-gradient-to-r hover:from-purple-700 hover:via-fuchsia-500 hover:to-red-600 transition-all duration-300",
          rest.className,
          icon ? "justify-start" : "justify-center"
        )}
      >
        <span>{icon}</span>
        <span>{children}</span>
      </div>
    </button>
  );
};
