import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToastNotifications } from "@hooks";
import { GradientButton } from "@components/Buttons";
import { TextInput } from "@components/Inputs";

import {
  Divider,
  TokenColumn,
  TokenDescription,
  TokenLayout,
  TokenTitle,
} from "./layout";

export const VerifyToken = () => {
  const [tokenId, setTokenId] = useState<string>();

  const { showInfoNotification } = useToastNotifications();
  const navigate = useNavigate();

  const handleTokenSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setTokenId(e.target.value);
  };

  const handleClick = () => {
    if (!tokenId) {
      showInfoNotification("Please introduce a valid token ID");
      return;
    }

    navigate(`/verify/${tokenId}`);
  };

  return (
    <TokenLayout>
        <TokenTitle>Verify: Checks token authenticity</TokenTitle>
        <TokenDescription>
          Verification provides assurance of a token's legitimacy. By verifying,
          you ensure its genuine origin and uncompromised value. Trust the
          verified status for secure transactions and confident actions.
        </TokenDescription>

      <Divider type="horizontal" />

        <TextInput
          type="number"
          min={0}
          label="Token ID"
          placeholder="Token address to verify"
          value={tokenId}
          onChange={handleTokenSelect}
          required
        />
        <GradientButton onClick={handleClick}>Verify</GradientButton>
    </TokenLayout>
  );
};
