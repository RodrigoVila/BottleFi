import { SelectHTMLAttributes } from "react";

type SelectOption = {
  id: string;
  name: string;
};
type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  label?: string;
};
export const SelectInput = ({ options, label }: SelectInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={label} className="m-0 font-semibold text-white">
          {label}
        </label>
      )}
        <select
          className="w-full p-1 py-2 pr-0 bg-transparent border-2 rounded-md border-glass"
          placeholder="Select an option"
        >
          <option selected disabled>
            Select an option
          </option>
          {options.length > 0 &&
            options.map((option) => (
              <option key={option.name} value={option.id}>
                {option.name}
              </option>
            ))}
        </select>
    </div>
  );
};
