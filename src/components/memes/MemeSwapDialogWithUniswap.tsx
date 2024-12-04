import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PGFToken } from "@/services/contract/types";
import { Button } from "../ui/button";
import MemeSwapWithUniswap from "./MemeSwapWithUniswap";
import { base } from "viem/chains";
import { Address } from "viem";

export default function MemeSwapDialogWithUniswap({
  token,
}: {
  token: PGFToken;
}) {
  const t = {
    contractAddress: "0x0Db510e79909666d6dEc7f5e49370838c16D950f" as Address,
    chainId: base.id,
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Swap</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] gap-8 max-sm:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Trade on Uniswap</DialogTitle>
        </DialogHeader>
        <MemeSwapWithUniswap token={t} />
      </DialogContent>
    </Dialog>
  );
}
