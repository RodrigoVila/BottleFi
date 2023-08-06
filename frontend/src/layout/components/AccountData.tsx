
import { parseAccount } from "@utils/parse";

export const AccountData = () => {
  const account = "lksaekesle3a9a3939sa3"

  return account ? (
    <div className="flex items-center justify-end w-1/3 pr-2">{parseAccount(account)}</div>
  ) : <h3 className="flex items-center justify-end w-1/3 pr-2">0x1a2..ab0a</h3>;
};