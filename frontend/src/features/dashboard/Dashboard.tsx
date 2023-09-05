import { useEffect } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { twMerge } from "tailwind-merge";

import { useDappContext } from "@context/dapp";
import { useModalContext } from "@context/modals";
import { useNFTContract } from "@hooks";
import { Button } from "@components/Buttons";

export const Dashboard = () => {
  const { tokens, setTokens, setTokenUrlAddress } = useDappContext();
  const { setQRModalOpen } = useModalContext();

  const { getTokens } = useNFTContract();

  const handleClick = (id: number) => {
    const url = `${window.location.origin}/verify/${id.toString()}`;

    setTokenUrlAddress(url);
    setQRModalOpen(true);
  };

  useEffect(() => {
    const fetchTokens = async () => {
      const tokenList = await getTokens();
      if (tokenList) setTokens(tokenList);
    };

    fetchTokens();
  }, []);

  return (
    <div className="flex-col w-full max-w-2xl gap-2 center">
      <h3 className="text-4xl font-medium font-marcellus">Dashboard</h3>
      <div
        className={twMerge(
          "flex flex-col w-full text-white glass-alt border-glass border-[2px] rounded-xl min-h-[24rem]"
        )}
      >
        <div className="flex flex-col">
          <table>
            <thead className="border-b-2 rounded-b-none border-glass font-marcellus">
              <tr>
                <th className="py-3">Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Mint Date</th>
                <th>Validity</th>
                <th>QR</th>
              </tr>
            </thead>
            <tbody>
              {tokens?.map((token, index) => {
                const isLastItem = index === tokens.length - 1;
                const { id, image, name, description, mintedAt, isValid } =
                  token;
                return (
                  <tr
                    key={`${id}-${mintedAt}`}
                    className={twMerge(
                      "h-20 text-center border-b-glass",
                      !isLastItem && "border-b-[1px]"
                    )}
                  >
                    <td className="w-24 h-24">
                      <img
                        src={image}
                        alt="Token"
                        className="w-full h-full bg-center bg-cover"
                      />
                    </td>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{mintedAt}</td>
                    <td>
                      {isValid ? (
                        <BiCheckCircle className="w-5 h-5 mx-auto text-green-400" />
                      ) : (
                        <GiCancel className="w-5 h-5 mx-auto text-red-400" />
                      )}
                    </td>
                    <td className="pr-3">
                      <Button
                        className="h-10 px-0"
                        onClick={() => handleClick(id)}
                      >
                        <span className="text-s">See</span>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
