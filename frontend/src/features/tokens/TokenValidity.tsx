import { useEffect, useState } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { TfiFaceSad } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useNFTContract } from "@hooks";
import { Spinner } from "@components/Spinner";
import { Token } from "@types";

import { Divider, TokenColumn, TokenLayout } from "./layout";

export const TokenValidity = () => {
  const [tokenData, setTokenData] = useState<Token | null>(null);

  const { tokenId } = useParams();

  const { getTokenById } = useNFTContract();

  const itemRowStyle = "flex items-center justify-between";
  const itemStyleLeft = "mr-2";
  const itemStyleRight = "text-right ml-2";

  useEffect(() => {
    if (!tokenId) return;
    const getToken = async () => {
      const token = await getTokenById(parseInt(tokenId));
      setTokenData(token);
    };

    getToken();
    //eslint-disable-next-line
  }, [tokenId]);

  if (tokenData === null)
    return (
      <TokenLayout className="p-32 center">
        <Spinner />
      </TokenLayout>
    );

  return (
    <TokenLayout className="flex-col max-w-3xl p-6 w-max">
      {/* <img src={tokenData.image} className="h-auto max-w-full" /> */}
      {tokenData.isValid ? (
        <>
          <TokenColumn className="max-w-md center">
            <div className="flex-col gap-4 text-center center">
              <BsPatchCheck size={96} className="text-green-400" />
              <h3 className="text-5xl font-semibold font-marcellus">
                Verified!
              </h3>
              <p className="font-marcellus">
                Great news! This token has been successfully validated for
                authenticity. You can confidently consider purchasing this item,
                assured that it meets our rigorous verification standards.
              </p>
            </div>
          </TokenColumn>
          <Divider type="horizontal" />
          <TokenColumn className="justify-between max-w-md text-xl">
            <div className={itemRowStyle}>
              <p className={itemStyleLeft}>Token ID</p>
              <p className={itemStyleRight}>{tokenData.id}</p>
            </div>
            <Divider />
            <div className={itemRowStyle}>
              <p className={itemStyleLeft}>Minted at</p>
              <p className={itemStyleRight}>{tokenData.mintedAt}</p>
            </div>
            <Divider />
            <div className={itemRowStyle}>
              <p className={itemStyleLeft}>Owner</p>
              <p className={itemStyleRight}>{tokenData.name}</p>
            </div>
            <Divider />
            <div className={itemRowStyle}>
              <p className={itemStyleLeft}>Description</p>
              <p className={twMerge("truncate", itemStyleRight)}>
                {tokenData.description}
              </p>
            </div>
          </TokenColumn>
        </>
      ) : (
        <div className="flex-col max-w-md gap-4 text-center center">
          <TfiFaceSad size={96} />
          <h3 className="text-5xl font-semibold font-marcellus">Oh dear!</h3>
          <p className="font-marcellus">
            We were unable to verify the authenticity of this token, and
            consequently, we advise against purchasing this item. If you come
            across this token, we kindly request that you report it to the
            seller or reach out to us via our social media channels.
          </p>
        </div>
      )}
    </TokenLayout>
  );
};
