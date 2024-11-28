import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";
import GuideText from "./GuideText";

export default function AboutDialogButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CircleHelp className="fill-primary-foreground stroke-primary size-10 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] gap-8 max-sm:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>How eths.fun works?</DialogTitle>
        </DialogHeader>
        <div className="flex-col justify-start items-start gap-8 inline-flex max-sm:flex-1 max-sm:overflow-y-auto">
          <div className="flex flex-col gap-8">
            <div className="h-[420px] flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-secondary text-2xl font-bold">
                {" "}
                1. Create & Share Meme Coins
              </div>
              <div className="self-stretch text-2xl font-normal">
                You can create your own meme token in two ways:
              </div>
              <div className="self-stretch">
                <span className="text-2xl font-bold">
                  {" "}
                  • On Warpcast:
                  <br />
                </span>
                <span className="text-2xl font-normal">Post a cast, tag </span>
                <span className="text-2xl font-bold">@bot</span>
                <span className="text-2xl font-normal">
                  , and include token name, symbol, and an image. The bot will
                  handle the rest.
                </span>
              </div>
              <div className="self-stretch">
                <span className="text-2xl font-normal"> • </span>
                <span className="text-2xl font-bold">
                  On Website:
                  <br />
                </span>
                <span className="text-2xl font-normal">
                  Fill in token details (name, symbol, image, description) and
                  hit Create.
                </span>
              </div>
              <div className="self-stretch text-2xl font-normal">
                💡 Tokens are instantly deployed on Uniswap v3 for trading.
              </div>
              <div className="self-stretch text-2xl font-normal">
                After create, 20% tokens will be allocated to Vitalik(15%) and
                charity pool(5%) for charity.
              </div>
            </div>

            <div className="h-[134px] flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-secondary text-2xl font-bold">
                2. Trade with Impact
              </div>
              <div className="self-stretch text-2xl font-normal">
                {" "}
                • Trade your token on Uniswap v3.
              </div>
              <div className="self-stretch text-2xl font-normal">
                {" "}
                • A 1% transaction fee supports team development and ecosystem
                growth.
              </div>
            </div>

            <div className="h-[118px] flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-secondary text-2xl font-bold">
                3. Buy from L2s, trade on Ethereum Mainnet
              </div>
              <div className="self-stretch text-2xl font-normal">
                {" "}
                • Use the website for seamless trades across Ethereum Mainnet
                and Layer 2 networks (Optimism, Base, Arbitrum).
              </div>
            </div>

            <div className="text-primary text-2xl font-bold">
              Start creating and trading today! 🚀
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
