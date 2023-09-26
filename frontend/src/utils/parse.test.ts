import { TokenResponse } from "@types";

import {
  parseAccount,
  parseBigInt,
  parseBigNumToDate,
  parseCatchError,
  parseRevertErrorMessage,
  parseTokenResponse,
  parseWalletError,
} from "./parse";

describe("Parse Utils", () => {
  it("should parseAccount", () => {
    const parsed = parseAccount("0ax12fcb4c13x3ab31x3s");
    expect(parsed).toBe("0ax1...1x3s");
  });

  it("Should parseBigInt and parseBigNumToDate", () => {
    const bigNum = 1331300839;
    const parsed = parseBigInt(BigInt(1331300839));
    expect(parsed.toString()).toBe("82429610041");

    const date = parseBigNumToDate(bigNum);
    expect(date).toBe("3/9/2012");
  });

  it("Should parseWalletErrors", () => {
    const error1 = "user rejected action";
    const parsedError1 = parseWalletError(error1);
    expect(parsedError1).toBe("User rejected wallet request, please try again");

    const error2 = "already pending for origin";
    const parsedError2 = parseWalletError(error2);
    expect(parsedError2).toBe(
      "Already sent a login permission to wallet. Please go to your selected wallet and accept the request"
    );

    const defaultError = "Fake error";
    const parsedDefaultErr = parseWalletError(defaultError);
    expect(parsedDefaultErr).toBe("Unknown wallet error");
  });

  it("Should parseCatchError as instanceof Error", () => {
    const error = new Error("User rejected action")
    const parsedError1 = parseCatchError(error);
    expect(parsedError1).toBe("User rejected action");
  });

  it("Should parse revert reason when present", () => {
    const errorMessage = "Transaction reverted with reason string 'Custom reason'";
    const revertReason = parseRevertErrorMessage(errorMessage);
    expect(revertReason).toBe("Custom reason");
  });

  it("Should handle error message without 'reverted with reason string'", () => {
    const errorMessage = "Transaction failed";
    const revertReason = parseRevertErrorMessage(errorMessage);
    expect(revertReason).toBeNull();
  });

  it("Should parse a valid TokenResponse", () => {
    const token: TokenResponse = [BigInt("12345"), "tokenURI", 1632560000n, true];
    const parsedToken = parseTokenResponse(token);

    expect(parsedToken).toEqual({
      id: 12345,
      uri: "tokenURI",
      mintedAt: "9/25/2021", // This date format might vary depending on your locale settings
      isValid: true,
    });
  });
});