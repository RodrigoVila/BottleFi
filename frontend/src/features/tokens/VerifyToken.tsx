
import { useEffect, useState } from "react";

import { Modal } from "@components/Modal";
import { SuccessError } from "@components/SuccessError";

export const VerifyToken = ({ params }: { params: { id: string } }) => {
  const [isValid, setIsValid] = useState(null);
  const [tokenInfo, setTokenInfo] = useState({});

  const { id } = params;

  // useEffect(() => {
  //   if (id && tokens.length > 0) {
  //     const getTokenValidity = async () => {
  //       const valid = await isValidToken(id);
  //       setIsValid(valid);
  //     };
  //     const getTokenInfo = async () => {
  //       const info = await getTokenByID(id);
  //       setTokenInfo(info);
  //     };
  //     getTokenValidity();
  //     getTokenInfo();
  //   }
  // }, [id, tokens]);

  return (
    <Modal isOpen={false} onClose={() => {}}>
      {isValid !== null && (
        // <SuccessError tokenID={id} isErrorModal={!isValid} />
        <SuccessError tokenID={id} isErrorModal={false} />
      )}
    </Modal>
  );
};
