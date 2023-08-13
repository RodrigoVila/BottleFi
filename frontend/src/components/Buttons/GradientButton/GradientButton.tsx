import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
  loading?: boolean
};

export const GradientButton = ({
  children,
  icon,
  loading,
  ...rest
}: GradientButtonProps) => {
  return (
    <button
      className="w-full bg-gradient"
      disabled={rest.disabled || loading}
      {...rest}
    >
      <div
        className={twMerge(
          "flex items-center gap-6 bg-black m-px font-semibold py-2 px-16 hover:bg-transparent transition-all duration-300",
          rest.className,
          icon ? "justify-start" : "justify-center"
        )}
      >
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </div>
    </button>
  );
};
