import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Spinner } from "@components/Spinner";

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
};

export const GradientButton = ({
  children,
  icon,
  loading,
  className,
  ...rest
}: GradientButtonProps) => {
  const loadingStyles = loading
    ? "bg-slate-500 pointer-events-none"
    : "bg-black";
  const iconStyles = icon ? "justify-start" : "justify-center";
  return (
    <button
      className={twMerge("w-full", loading || rest.disabled ? "bg-slate-500" : "bg-gradient")}
      disabled={rest.disabled || loading}
      {...rest}
    >
      <div
        className={twMerge(
          "flex items-center gap-6 bg-black m-px font-semibold h-12 px-16 hover:bg-transparent transition-all duration-300",
          iconStyles,
          className,
          loadingStyles
        )}
      >
        {!loading && icon && <span>{icon}</span>}
        {loading ? <Spinner /> : <span>{children}</span>}
      </div>
    </button>
  );
};
