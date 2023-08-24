export const parseAccount = (account: string) => {
  // TODO: Makes this regex extensible. Not every wallet is eip155
  const cleanedStr = account.replace(/eip155:\d{1,3}:/, "");
  const first5 = cleanedStr.slice(0, 5);
  const last3 = cleanedStr.slice(-3);

  return `${first5}...${last3}`;
};

export const parseWalletError = (errorMessage: string) => {
  if (errorMessage.includes("user rejected action")) {
    alert("User rejected wallet request, please try again.");
  } else if (errorMessage.includes("already pending for origin")) {
    alert(
      "Already sent a login permission to wallet. Please go to your selected wallet and accept the request."
    );
  } else {
    alert("Error trying to connect to wallet.");
  }
};

export const parseCatchError = (error: unknown): string => {
  return error instanceof Error ? error.message : (error as string);
};

//TODO: Test this in different cases
export const parseRevertErrorMessage = (error: unknown) => {
  try {
    const errorMessage = error.message;
    const startIndex = errorMessage.indexOf("reverted with reason string '");
    if (startIndex !== -1) {
      const searchStringLength = "reverted with reason string '".length;
      const endIndex = errorMessage.indexOf("'", startIndex + searchStringLength);
      if (endIndex !== -1) {
        const revertReason = errorMessage.substring(startIndex + searchStringLength, endIndex);
        return revertReason;
      }
    }
  } catch (e) {
    console.error("Error extracting revert reason:", e);
  }
  
  return null;

};
