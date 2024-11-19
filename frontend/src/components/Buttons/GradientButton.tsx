import { ButtonHTMLAttributes, ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Spinner } from "@components/Spinner";

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
  bodyClassName?: string;
};

export const GradientButton = ({
  children,
  icon,
  loading,
  className,
  bodyClassName,
  ...rest
}: GradientButtonProps) => {
  const [isLongWait, setLongWait] = useState(false);

  const loadingStyles = loading
    ? "bg-slate-500 pointer-events-none px-4"
    : "bg-black px-16";
  const iconStyles = icon ? "justify-start" : "justify-center";

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLongWait(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <button
      className={twMerge(
        "w-full rounded-full",
        className,
        loading || rest.disabled ? "bg-slate-500" : "bg-gradient"
      )}
      disabled={rest.disabled || loading}
      {...rest}
    >
      <div
        className={twMerge(
          "flex items-center gap-6 bg-black m-px font-semibold h-12 hover:bg-transparent transition-all duration-300 rounded-full",
          iconStyles,
          bodyClassName,
          loadingStyles
        )}
      >
        {!loading && icon && <span>{icon}</span>}
        {loading ? (
          <div className="flex items-center gap-2">
            <Spinner />
            {isLongWait ? (
              <span className="w-full mr-2 text-sm">
                Please wait...
              </span>
            ) : null}
          </div>
        ) : (
          <span>{children}</span>
        )}
      </div>
    </button>
  );
};
