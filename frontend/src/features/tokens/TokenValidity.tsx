import { useEffect, useState } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { TfiFaceSad } from "react-icons/tfi";
import { useParams } from "react-router-dom";

import { useNFTContract } from "@hooks";
import { Spinner } from "@components/Spinner";
import { Token } from "@types";

import { Divider, TokenColumn, TokenLayout } from "./layout";

export const TokenValidity = () => {
  const [tokenData, setTokenData] = useState<Token | null>(null);
  const { tokenId } = useParams();
  const { getTokenById } = useNFTContract();

  const itemRowStyle = "flex items-center justify-between";

  useEffect(() => {
    if (!tokenId) return;
    const getToken = async () => {
      const token = await getTokenById(parseInt(tokenId));
      setTokenData(token);
    };

    getToken();
    //eslint-disable-next-line
  }, [tokenId]);

  useEffect(() => {
    console.log(tokenData);
  }, [tokenData]);

  if (tokenData === null)
    return (
      <div className="w-full h-screen center">
        <Spinner />
      </div>
    );

  return (
    <TokenLayout className="flex-col p-6">
      <TokenColumn className="max-w-md center">
        {/* <img src={tokenData.image} className="h-auto max-w-full" /> */}
        {tokenData.isValid ? (
          <div className="flex-col gap-4 text-center center">
            <BsPatchCheck size={96} className="text-green-400" />
            <h3 className="text-5xl font-semibold font-marcellus">Verified!</h3>
            <p className="font-marcellus">
              Great news! This token has been successfully validated for
              authenticity. You can confidently consider purchasing this item,
              assured that it meets our rigorous verification standards.
            </p>
          </div>
        ) : (
          <div className="flex-col gap-4 text-center center">
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
      </TokenColumn>
      <Divider type="horizontal" />
      <TokenColumn className="text-xl">
        <div className={itemRowStyle}>
          <p>Token ID</p>
          <p>{tokenData.id}</p>
        </div>
        <div className={itemRowStyle}>
          <p>Minted at</p>
          <p>{tokenData.mintedAt}</p>
        </div>
        <div className={itemRowStyle}>
          <p>Owner</p>
          <p>{tokenData.name}</p>
        </div>
        <div className={itemRowStyle}>
          <p>Token Description</p>
          <p>{tokenData.description}</p>
        </div>
      </TokenColumn>
    </TokenLayout>
  );
};
