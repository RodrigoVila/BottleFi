import { ButtonHTMLAttributes, ReactNode } from "react";

type AnimatedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const AnimatedButton = ({
  children,
  ...rest
}: AnimatedButtonProps) => {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <button
        className="animate-background inline-block rounded-full bg-gradient-to-r from-purple-700 via-fuchsia-900 to-red-700 bg-[length:400%_400%] p-[2px]"
        {...rest}
      >
        <span className="block px-4 py-2 text-base font-bold text-white rounded-full md:px-16 bg-slate-900 hover:bg-transparent md:text-xl">
          {children}
        </span>
      </button>
    </div>
  );
};
