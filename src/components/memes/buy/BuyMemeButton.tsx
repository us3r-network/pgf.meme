import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { BuyMemeForm } from "./BuyMemeForm";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { Address } from "viem";

export function BuyMemeButton() {
  const token = {
    contractAddress: "0xDf975872992F5a65584aCD620F9E41e6C145628C" as Address,
    chainId: PGF_CONTRACT_CHAIN_ID,
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-12 px-4 py-3 rounded-[30px] w-[150px]">Buy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] gap-8">
        <DialogHeader>
          <DialogTitle>Buy Meme</DialogTitle>
        </DialogHeader>
        <BuyMemeForm token={token} />
      </DialogContent>
    </Dialog>
  );
}
