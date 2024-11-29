import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MemeSwapWithUniswap from "./MemeSwapWithUniswap";
import { PGFToken } from "@/services/contract/types";
import { Button } from "../ui/button";

export default function MemeSwapDialogWithUniswap({
  token,
}: {
  token: PGFToken;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Swap</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] gap-8 max-sm:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Trade on Uniswap</DialogTitle>
        </DialogHeader>
        <MemeSwapWithUniswap token={token} />
      </DialogContent>
    </Dialog>
  );
}
