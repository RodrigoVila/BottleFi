import { BiCheckCircle } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";

import { Button } from "@components/Buttons";
import { Spinner } from "@components/Spinner";
import { TokenList } from "@types";

type TokensTable = {
  tokens: TokenList | null;
  handleSeeQR: (id: number) => void;
};

export const TokensTable = ({ tokens, handleSeeQR }: TokensTable) => {
  return tokens ? (
    // <div className="flex flex-col">
    <table>
      <thead className="border-b-2 rounded-b-none border-glass font-marcellus">
        <tr>
          <th className="py-3">Image</th>
          <th>Name</th>
          <th className="hidden md:table-cell">Description</th>
          <th>Mint Date</th>
          <th>Validity</th>
          <th>QR</th>
        </tr>
      </thead>
      <tbody>
        {tokens?.map((token) => {
          const { id, image, name, description, mintedAt, isValid } = token;
          return (
            <tr
              key={`${id}-${mintedAt}`}
              className="h-20 text-center border-b-glass border-b-[1px]"
            >
              <td className="w-20 h-20 md:w-24 md:h-24">
                <img
                  src={image}
                  alt="Token"
                  className="w-full h-full bg-center bg-cover"
                />
              </td>
              <td>{name}</td>
              <td className="hidden md:table-cell">{description}</td>
              <td>{mintedAt}</td>
              <td>
                {isValid ? (
                  <BiCheckCircle className="w-5 h-5 mx-auto text-green-400" />
                ) : (
                  <GiCancel className="w-5 h-5 mx-auto text-red-400" />
                )}
              </td>
              <td className="pr-3">
                <Button className="h-10 px-0" onClick={() => handleSeeQR(id)}>
                  <span className="px-2 text-s">See</span>
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <Spinner />
  );
};
