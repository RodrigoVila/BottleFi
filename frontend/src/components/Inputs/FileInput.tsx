import { InputHTMLAttributes } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

import { useThemeContext } from "@hooks";

type FileInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value"> & {
  value: File | null;
  label?: string;
};

export const FileInput = ({ value, label, ...rest }: FileInputProps) => {
  const { isProfessionalTheme } = useThemeContext();

  const themeStyles = isProfessionalTheme
    ? "bg-slate-100 text-slate-800"
    : "border-glass focus:outline-none focus:border-white bg-transparent";

  return (
    <div className="flex flex-col gap-2">
      <p className="hidden font-semibold md:block">{label}</p>
      <label htmlFor="file-upload" className="custom-file-upload">
        <div
          className={twMerge(
            "flex items-center w-full gap-2 px-2 border-2 rounded-md py-2 -mt-1",
            themeStyles
          )}
        >
          <BsFillCloudUploadFill />
          {value?.name || "Upload File"}
        </div>
      </label>
      <input id="file-upload" type="file" aria-label="file-input" {...rest} />
    </div>
  );
};
