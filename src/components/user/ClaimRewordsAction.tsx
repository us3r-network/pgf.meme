import { OwnedMemeData } from "@/services/user/types";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useClaim } from "@/hooks/contract/merkle-distributor/useClaim";
import { useToast } from "@/hooks/use-toast";

export default function ClaimRewordsAction({ data }: { data: OwnedMemeData }) {
  const { referralReward, graduation } = data;
  const [isClaimed, setIsClaimed] = useState(referralReward?.isClaimed);
  const canClaim = referralReward && !isClaimed && !!graduation?.poolAddress;
  const { claim, isSuccess } = useClaim();
  const { toast } = useToast();
  useEffect(() => {
    if (isSuccess) {
      setIsClaimed(true);
      toast({
        title: `Claimed`,
        description: `
          You have successfully claimed ${new Intl.NumberFormat("en-US", {
            notation: "compact",
          }).format(Number(referralReward?.amount))} ${
          data.meme.symbol
        } referral reward.
        `,
      });
    }
  }, [isSuccess]);
  return (
    <Button
      variant={"link"}
      disabled={!canClaim}
      onClick={() => {
        claim({
          token: data.meme.address,
          index: 0,
          account: data.user.walletAddress,
          amount: data.referralReward?.amount as unknown as bigint,
          merkleProof: [],
        });
      }}
    >
      Claim
    </Button>
  );
}
