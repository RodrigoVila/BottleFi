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
        <label htmlFor={label} className="text-white font-semibold m-0">
          {label}
        </label>
      )}
      <div className="bg-gradient p-px rounded-md">
        <select
          className="p-1 pr-0 bg-black rounded-md py-2 w-full"
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
    </div>
  );
};
