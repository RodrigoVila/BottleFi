import { ChangeEventHandler, SelectHTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";

import { useThemeContext } from "@hooks";
import { TokenList } from "@types";

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: TokenList | null;
  label?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};
export const SelectInput = ({
  options,
  label,
  value,
  onChange,
  ...rest
}: SelectInputProps) => {
  const { isProfessionalTheme } = useThemeContext();

  const themeStyles = isProfessionalTheme
    ? "bg-slate-100 text-slate-800"
    : "bg-black text-slate-100";

  const optionThemeStyles = isProfessionalTheme
    ? "bg-slate-100 text-slate-800"
    : "bg-slate-950";
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={label}
          className="hidden m-0 font-semibold text-white md:block"
        >
          {label}
        </label>
      )}
      <select
        className={twJoin(
          "w-full p-1 py-[6px] pr-0 border-2 rounded-md",
          themeStyles
        )}
        placeholder="Select a token"
        value={value || "default"}
        onChange={onChange}
        // defaultValue="default"
        {...rest}
      >
        <option value="default" disabled className={optionThemeStyles}>
          Select a token from the list
        </option>
        {options &&
          options.length > 0 &&
          options.map((option) => (
            <option
              key={option.id}
              value={option.id}
              className={optionThemeStyles}
            >
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
};
