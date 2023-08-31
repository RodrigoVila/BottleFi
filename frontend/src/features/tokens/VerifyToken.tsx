import { useState } from "react";
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
  const [tokenId, setTokenId] = useState<number>();

  const { showInfoNotification } = useToastNotifications();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!tokenId) {
      showInfoNotification("Please introduce a valid token ID");
      return;
    }

    navigate(`/verify/${tokenId}`);
  };

  return (
    <TokenLayout>
      <TokenColumn>
        <TokenTitle>Verify: Checks token authenticity</TokenTitle>
        <TokenDescription>
          Verification provides assurance of a token's legitimacy. By verifying,
          you ensure its genuine origin and uncompromised value. Trust the
          verified status for secure transactions and confident actions.
        </TokenDescription>
      </TokenColumn>

      <Divider />

      <TokenColumn className="gap-8">
        <TextInput
          type="number"
          min={0}
          label="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          required
        />
        <GradientButton onClick={handleClick}>Verify</GradientButton>
      </TokenColumn>
    </TokenLayout>
  );
};
