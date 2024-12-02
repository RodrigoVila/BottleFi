import { MouseEvent } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

import { Token as TokenType } from "@types";

type TokenProps = {
  token: TokenType;
  isShown: boolean;
  showQR: (id: number | null) => void;
};

export const Token = ({ token, isShown, showQR }: TokenProps) => {
  const navigate = useNavigate();

  const { id, image, name, description, mintedAt, isValid } = token;
  const desktopURL = `/verify/${id.toString()}`;
  const mobileURL = `${window.location.origin}/mobileVerify/${id.toString()}`;

  const toggleShowQR = (e: MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    isShown ? showQR(null) : showQR(id);
  };

  const onClick = () => navigate(desktopURL);

  return (
    <tr
      key={`${id}-${mintedAt}`}
      className="h-20 text-center border-b-glass border-b-[1px] hover:bg-glass ease-in duration-200 cursor-pointer"
      onClick={onClick}
    >
      <td className="w-20 h-20 md:w-24 md:h-24">
        <img
          src={image}
          alt="Token"
          className="w-full h-full bg-center bg-cover"
        />
      </td>
      <td className="px-1">{name}</td>
      <td className="hidden px-1 md:table-cell">{description}</td>
      <td className="px-1">{mintedAt}</td>
      <td className="px-1">
        {isValid ? (
          <BiCheckCircle className="w-8 h-8 mx-auto text-green-400" />
        ) : (
          <GiCancel className="w-8 h-8 mx-auto text-red-400" />
        )}
      </td>
      <td className="relative w-20 h-20 md:w-24 md:h-24" onClick={toggleShowQR}>
        {!isShown ? (
          <span className="absolute inset-0 text-white bg-darkestOverlay center">
            Show
          </span>
        ) : null}
        <QRCode type="" value={mobileURL} className="w-full h-full" />
      </td>
    </tr>
  );
};
