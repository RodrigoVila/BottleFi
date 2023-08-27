import {
  ButtonHTMLAttributes,
  useState,
} from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

import { Modal } from "@components/Modal";

import img0 from "../../../assets/bottle 0.jpeg";
import img1 from "../../../assets/bottle 1.jpeg";
import img2 from "../../../assets/bottle 2.jpeg";
import img3 from "../../../assets/bottle 3.jpeg";

const Images = [img0, img1, img2, img3];

const blob0 = new Blob([img0], { type: "image/jpeg" });
const blob1 = new Blob([img1], { type: "image/jpeg" });
const blob2 = new Blob([img2], { type: "image/jpeg" });
const blob3 = new Blob([img3], { type: "image/jpeg" });

const file0 = new File([blob0], "bottle_1.jpeg", {
  type: "image/jpeg",
});

const file1 = new File([blob1], "bottle_2.jpeg", {
  type: "image/jpeg",
});

const file2 = new File([blob2], "bottle_3.jpeg", {
  type: "image/jpeg",
});

const file3 = new File([blob3], "bottle_4.jpeg", {
  type: "image/jpeg",
});

const Files = [file0, file1, file2, file3];

// Create files for other predefined blobs

type FileInputModalButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  onFileSelect: (file: File) => void;
  className?: string;
};

export const FileInputModalButton = ({
  onFileSelect,
  className,
  ...rest
}: FileInputModalButtonProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [fileSelected, setFileSelected] = useState<string | null>(null)

  const toggleModal = () => setOpenModal((prev) => !prev);

  const handleFileSelect = (file:File) => {
    onFileSelect(file)
    setFileSelected(file.name)
    toggleModal()
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-white">Choose token image</label>
      <button
        className={twMerge("rounded-full-md overflow-hidden", className)}
        onClick={toggleModal}
        {...rest}
      >
        <div className="flex items-center w-full gap-2 px-2 bg-transparent border-2 rounded-md border-glass focus:outline-none focus:border-white py-[6px]">
          <BsFillCloudUploadFill />
          {fileSelected ?? "Select File"}
        </div>
      </button>
      <Modal
        isOpen={openModal}
        onClose={toggleModal}
        className="bg-overlay"
        bodyClassName="p-8"
        disableOutsideClick
      >
        <h3 className="text-3xl font-semibold">Please select an image</h3>
        <div className="flex flex-wrap items-center justify-center gap-5">
          {Images.map((img, index) => (
            <button
              key={`bottleimg-${index}`}
              onClick={() => handleFileSelect(Files[index])}
              className="w-32 h-32 border-2 rounded-md border-glass hover:border-red-400"
            >
              <img
                src={img}
                alt="Bottle 1"
                className="w-full h-full bg-cover rounded-md"
              />
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};
