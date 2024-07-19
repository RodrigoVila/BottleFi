import { useEffect, useState } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { TfiFaceSad } from "react-icons/tfi";
import { useParams } from "react-router-dom";

import { useNFTContract } from "@hooks";
import { Spinner } from "@components/Spinner";
import { parseAccount, parseRevertErrorMessage } from "@utils/parse";
import { Token } from "@types";

import { Divider, TokenColumn, TokenLayout } from "./layout";

export const TokenValidity = () => {
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [tokenData, setTokenData] = useState<Token | null>(null);

  const { tokenId } = useParams();

  const { getTokenById, isTokenValid } = useNFTContract();

  const itemRowStyle = "flex items-center justify-between";
  const itemStyleLeft = "mr-2";
  const itemStyleRight = "text-right ml-2";

  const fetchTokenIfValid = async () => {
    if (!tokenId) return;
    try {
      const isValid = await isTokenValid(parseInt(tokenId));
      if (isValid) {
        const token = await getTokenById(parseInt(tokenId));
        setTokenValid(true);
        setTokenData(token);
      } else {
        setTokenValid(false);
      }
    } catch (e) {
      console.info({ e });
      setTokenValid(false);
      parseRevertErrorMessage(e);
    }
  };

  useEffect(() => {
    fetchTokenIfValid();
    //eslint-disable-next-line
  }, [tokenId]);

  if (tokenValid === null)
    return (
      <TokenLayout className="p-32 center">
        <Spinner />
      </TokenLayout>
    );

  return (
    <TokenLayout className="flex-col max-w-3xl p-6 w-max">
      {/* <img src={tokenData.image} className="h-auto max-w-full" /> */}
      {tokenValid && tokenData ? (
        <>
          <TokenColumn className="max-w-md mb-4 md:mb-0 center">
            <div className="flex-col gap-4 text-center center">
              <BsPatchCheck size={62} className="text-green-400" />
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
          <TokenColumn className="justify-between max-w-md py-3 text-xl">
            <div className={itemRowStyle}>
              <p className={itemStyleLeft}>Name</p>
              <p className={itemStyleRight}>{tokenData.name}</p>
            </div>
            <Divider />
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
              <p className={itemStyleLeft}>Current Owner</p>
              <p className={itemStyleRight}>
                {tokenData.owner && parseAccount(tokenData.owner)}
              </p>
            </div>
          </TokenColumn>
        </>
      ) : (
        <div className="flex-col max-w-md gap-4 text-center center">
          <TfiFaceSad size={62} />
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
