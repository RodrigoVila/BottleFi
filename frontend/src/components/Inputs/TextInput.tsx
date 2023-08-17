import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
  type?: string;
};

export const TextInput = ({
  label,
  className,
  type = "text",
  ...rest
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={label} className="font-semibold text-white">
          {label}
        </label>
      )}
      <input
        id={label}
        type={type}
        name={label?.toLowerCase()}
        className={twMerge(
          "border-slate-500 border-2 bg-slate-900 w-full p-1 rounded-md",
          className
        )}
        {...rest}
      />
    </div>
  );
};
