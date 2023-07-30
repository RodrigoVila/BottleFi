import { ButtonHTMLAttributes, ReactNode } from "react";

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const GradientButton = ({ children, ...rest }: GradientButtonProps) => {
  return (
    <button
      className="w-full bg-gradient-to-r from-purple-700 via-fuchsia-500 to-red-600 rounded-full"
      {...rest}
    >
      <div className="bg-black m-px font-semibold py-2 px-16 rounded-full hover:bg-gradient-to-r hover:from-purple-700 hover:via-fuchsia-500 hover:to-red-600 transition-all duration-500">
        {children}
      </div>
    </button>
  );
};
