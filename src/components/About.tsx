import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";

export default function AboutDialogButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CircleHelp className="fill-black stroke-white size-10 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] gap-8 max-sm:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>How pgf.meme works?</DialogTitle>
        </DialogHeader>
        <div className="flex-col justify-start items-start gap-8 inline-flex max-sm:flex-1 max-sm:overflow-y-auto">
          <div className="self-stretch flex-col justify-start items-start gap-4 flex">
            <div className="text-[#16181d] text-2xl font-normal">
              {" "}
              1. Create & Share Charity Coins
            </div>
            <div className="self-stretch text-[#16181d] text-2xl font-normal">
              Users create meme coins that can be bought across multiple
              blockchains, with each transaction donating a portion to charity.
            </div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-4 flex">
            <div className="text-[#16181d] text-2xl font-normal">
              2. Trade with Impact
            </div>
            <div className="self-stretch text-[#16181d] text-2xl font-normal">
              Purchases are made using a step-based price curve, and once the
              total reaches $69k, the meme coin is launched on Uniswap V3,
              enabling full buy/sell trading on the Ethereum mainnet.
            </div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-4 flex">
            <div className="text-[#16181d] text-2xl font-normal">
              3. Earn by Sharing
            </div>
            <div className="self-stretch text-[#16181d] text-2xl font-normal">
              Share your meme coin link and earn 4% commission on every
              transaction made through your referral.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
