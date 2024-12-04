import { BsArrow90DegRight } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export const QRMessage = ({ isShown }: { isShown: boolean }) => {
  return (
    <div
      className={twMerge(
        "flex items-end justify-center text-center animate-bounce-slow absolute -top-[120px] right-8 transition-all duration-1000 ml-4",
        isShown ? "" : "opacity-0"
      )}
    >
      <p className="p-2 border-2 border-white rounded-xl max-w-[150px]">
        Scan the QR with your phone to see token's authenticity
      </p>
      <BsArrow90DegRight size={28} className="mx-1 rotate-90" />
    </div>
  );
};
