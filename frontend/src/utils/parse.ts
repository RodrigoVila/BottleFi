import { TokenResponse } from "@types";

export const parseAccount = (account: string) => {
  // TODO: Makes this regex extensible. Not every wallet is eip155
  const cleanedStr = account.replace(/eip155:\d{1,3}:/, "");
  const first5 = cleanedStr.slice(0, 4);
  const last3 = cleanedStr.slice(-4);

  return `${first5}...${last3}`;
};

export const parseCatchError = (error: unknown): string => {
  return error instanceof Error ? error.message : (error as string);
};

export const parseWalletError = (error: unknown) => {
  const errorMessage = parseCatchError(error);

  if (errorMessage.includes("user rejected action")) {
    return "User rejected wallet request, please try again";
  }

  if (errorMessage.includes("already pending for origin")) {
    return "Already sent a login permission to wallet. Please go to your selected wallet and accept the request";
  }

  return "Unknown wallet error";
};

//TODO: Test this in different cases
export const parseRevertErrorMessage = (error: unknown) => {
  const errorMessage = parseCatchError(error);
  try {
    const startIndex = errorMessage.indexOf("reverted with reason string '");
    if (startIndex !== -1) {
      const searchStringLength = "reverted with reason string '".length;
      const endIndex = errorMessage.indexOf(
        "'",
        startIndex + searchStringLength
      );
      if (endIndex !== -1) {
        const revertReason = errorMessage.substring(
          startIndex + searchStringLength,
          endIndex
        );
        return revertReason;
      }
    }
  } catch (e) {
    console.error("Error extracting revert reason:", e);
  }

  return null;
};

export const parseBigInt = (b: bigint) => parseInt(b.toString(), 16);

export const parseTokenResponse = (token: TokenResponse) => {
  const id = parseBigInt(token[0]);
  const uri = token[1];
  const mintedAt = new Date(parseBigInt(token[2]) * 1000)
    .toLocaleString()
    .slice(0, 9);
  const isValid = token[3];

  return { id, uri, mintedAt, isValid };
};

export const parseBigIntToDate = (token: bigint) => {
  return new Date(parseBigInt(token) * 1000).toLocaleString().slice(0, 8);
};
