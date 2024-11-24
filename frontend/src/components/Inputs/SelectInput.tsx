import { ChangeEventHandler, SelectHTMLAttributes } from "react";

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
        className="w-full p-1 py-2 pr-0 bg-transparent border-2 rounded-md border-glass"
        placeholder="Select a token"
        value={value || "default"}
        onChange={onChange}
        // defaultValue="default"
        {...rest}
      >
        <option value="default" disabled className="bg-slate-950">
          Select a token from the list
        </option>
        {options &&
          options.length > 0 &&
          options.map((option) => (
            <option key={option.id} value={option.id} className="bg-slate-950">
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
};
