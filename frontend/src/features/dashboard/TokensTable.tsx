import { BiCheckCircle } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";

import { useDappContext, useModalContext } from "@hooks";
import { Button } from "@components/Buttons";
import { Spinner } from "@components/Spinner";

export const TokensTable = () => {
  const { isLoading, tokens, setTokenUrlAddress } = useDappContext();
  const { setQRModalOpen } = useModalContext();

  const handleClick = (id: number) => {
    const url = `${window.location.origin}/verify/${id.toString()}`;

    setTokenUrlAddress(url);
    setQRModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen center">
        <Spinner>Loading tokens...</Spinner>
      </div>
    );
  }
  return tokens.length > 0 ? (
    // <div className="flex flex-col">
    <table className="border-collapse">
      <thead className="sticky top-0 bg-black border-b-2 rounded-b-none border-glass font-marcellus">
        <tr>
          <th className="py-3">Image</th>
          <th className="px-1">Name</th>
          <th className="hidden px-1 md:table-cell">Description</th>
          <th className="px-1">Mint Date</th>
          <th className="px-1">Validity</th>
          <th className="pl-1 pr-3">QR</th>
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
              <td className="px-1">{name}</td>
              <td className="hidden px-1 md:table-cell">{description}</td>
              <td className="px-1">{mintedAt}</td>
              <td className="px-1">
                {isValid ? (
                  <BiCheckCircle className="w-5 h-5 mx-auto text-green-400" />
                ) : (
                  <GiCancel className="w-5 h-5 mx-auto text-red-400" />
                )}
              </td>
              <td className="pl-1 pr-3">
                <Button className="h-10 px-0" onClick={() => handleClick(id)}>
                  <span className="px-2 text-s">See</span>
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <div className="w-full h-screen px-8 text-xl text-center center">
      You don't have tokens yet. If you have a Supplier role, then you can mint one. Otherwise you can transfer to this address from an account with that role.
    </div>
  );
};
