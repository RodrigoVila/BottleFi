import { useNavigate } from "react-router-dom";

import { GoVerified } from "react-icons/go";
import { IoMdArrowBack } from "react-icons/io";
import { ImSad2 } from "react-icons/im";
import styles from "./SuccessErrorScreen.module.css";

type SuccesErrorProps = {
  tokenID: string | undefined;
  isErrorModal?: boolean;
};

export const SuccessError = ({
  tokenID,
  isErrorModal = false,
}: SuccesErrorProps) => {
  const navigate = useNavigate();
  const onClick = () => navigate("/dashboard");
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isErrorModal ? <ImSad2 size={100} /> : <GoVerified size={100} />}
        <div className={styles.backIcon} onClick={onClick}>
          <IoMdArrowBack size={35} />
        </div>
        <div className={styles.title}>
          {isErrorModal ? "Oh dear!" : "Success!"}
        </div>
        <div className={styles.description}>
          {isErrorModal
            ? "We can't verify this item authenticity. Please report this bottle to the shop  manager."
            : "We can verify that this bottle is authentic!"}
        </div>
        <div className={styles.item}>Token ID: {tokenID}</div>
      </div>
    </div>
  );
};

export default SuccessErrorScreen;
