import { OwnedMemeData } from "@/services/user/types";
import { Button } from "../ui/button";

export default function ClaimRewordsAction({ data }: { data: OwnedMemeData }) {
  const { referralReward, graduation } = data;
  const canClaim =
    referralReward && !referralReward.isClaimed && !!graduation?.poolAddress;
  return (
    <Button variant={"link"} disabled={!canClaim}>
      Claim
    </Button>
  );
}
