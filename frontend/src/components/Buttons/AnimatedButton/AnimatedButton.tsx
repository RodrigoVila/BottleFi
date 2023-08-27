import { ButtonHTMLAttributes, ReactNode } from "react";

type AnimatedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const AnimatedButton = ({
  children,
  ...rest
}: AnimatedButtonProps) => {
  return (
    <div className="flex w-full flex-row items-center justify-center">
      <button
        className="animate-background inline-block rounded-full bg-gradient-to-r from-purple-700 via-fuchsia-900 to-red-700 bg-[length:400%_400%] p-[2px]"
        {...rest}
      >
        <span className="block rounded-full bg-slate-900 hover:bg-transparent px-16 py-2 font-bold text-white">
          {children}
        </span>
      </button>
    </div>
  );
};
