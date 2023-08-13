import { InputHTMLAttributes } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const FileInput = ({ label, ...rest }: FileInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-white">{label}</label>
      <label htmlFor="file-upload" className="custom-file-upload">
        <div className="flex items-center w-full gap-2 p-px px-2 py-1 border-2 rounded-md bg-slate-900 border-slate-500">
          <BsFillCloudUploadFill />
          Upload File
        </div>
      </label>
      <input id="file-upload" type="file" {...rest} />
    </div>
  );
};
