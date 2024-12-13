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
import { TokenData } from "@/services/meme/types";

export default function MemeSwapDialogWithUniswap({
  token,
}: {
  token: TokenData;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Swap</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] gap-8 max-sm:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Trade on Uniswap</DialogTitle>
        </DialogHeader>
        <div className="h-[560px] rounded-md overflow-hidden">
          <MemeSwapWithUniswap token={token} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
