import { ButtonHTMLAttributes, ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Spinner } from "@components/Spinner";
import { useThemeContext } from "@hooks";

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

  const { isProfessionalTheme } = useThemeContext()

  const themeStyles = isProfessionalTheme ? "bg-purple-800 hover:bg-purple-900" : "bg-black m-px hover:bg-transparent"

  const loadingStyles = loading
    ? "bg-slate-500 pointer-events-none px-4"
    : "px-16";
  const iconStyles = icon ? "justify-start" : "justify-center";

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLongWait(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <button
      className={twMerge(
        "md:w-full rounded-full bg-gradient overflow-hidden",
        className,
        (loading || rest.disabled) && "bg-slate-500"
      )}
      disabled={rest.disabled || loading}
      {...rest}
    >
      <div
        className={twMerge(
          "flex items-center gap-6 font-semibold h-12 transition-all duration-300 rounded-full",
          iconStyles,
          themeStyles,
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
          <span className="text-lg md:text-xl">{children}</span>
        )}
      </div>
    </button>
  );
};
