import { useThemeContext } from "@hooks";
import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?:string;
  className?: string;
  type?: string;
};

export const TextInput = ({
  label,
  placeholder,
  className,
  type = "text",
  ...rest
}: TextInputProps) => {
  const { isProfessionalTheme } = useThemeContext()

  const themeStyles = isProfessionalTheme ? "border-gray-800 bg-slate-100 placeholder:text-gray-400 text-slate-800 font-medium py-3" : "bg-transparent border-glass focus:border-white md:placeholder-gray-300"
  const labelThemeStyles = isProfessionalTheme ? "text-slate-100" : "text-white"

  return (
    <div className="flex flex-col w-full mb-4">
      {label && (
        <label htmlFor={label} className={twMerge("font-semibold w-max", labelThemeStyles)}>
          {label}
        </label>
      )}
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        name={label?.toLowerCase()}
        className={twMerge(
          "border-2 flex-1 p-1 pl-3 rounded-md focus:outline-none py-[6px] disabled:bg-gray-700 text-base",
          themeStyles,
          className
        )}
        {...rest}
      />
    </div>
  );
};
