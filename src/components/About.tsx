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
          <DialogTitle>How castcoin.fun works?</DialogTitle>
        </DialogHeader>
        <div className="flex-col justify-start items-start gap-8 inline-flex max-sm:flex-1 max-sm:overflow-y-auto">
          <div className="flex flex-col gap-8">
            <div className="flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-secondary text-2xl font-bold">
                {" "}
                1. Create & Share Meme Coins
              </div>
              <div className="self-stretch text-2xl">
                You can create your own meme token in two ways:
              </div>
              <div className="self-stretch">
                <span className="text-2xl font-bold">
                  {" "}
                  • On Warpcast:
                  <br />
                </span>
                <span className="text-2xl">Post a cast, tag </span>
                <span className="text-2xl font-bold">@bot</span>
                <span className="text-2xl">
                  , and include token name, symbol, and image. The bot will
                  handle the rest.
                </span>
              </div>
              <div className="self-stretch">
                <span className="text-2xl"> • </span>
                <span className="text-2xl font-bold">
                  On Website:
                  <br />
                </span>
                <span className="text-2xl">
                  Fill in token details (name, symbol, image, description) and
                  hit Create.
                </span>
              </div>
              <div className="self-stretch">
                <span className="text-2xl">
                  💡 Once submitted, we’ll create two versions of your token:
                  <br />
                </span>
                <span className="text-2xl font-bold">• On Base Chain: </span>
                <span className="text-2xl">Deployed on </span>
                <span className="text-2xl font-bold">Uniswap v3</span>
                <span className="text-2xl">
                  {" "}
                  for trading.
                  <br />
                </span>
                <span className="text-2xl font-bold">• On Solana Chain: </span>
                <span className="text-2xl">Deployed on </span>
                <span className="text-2xl font-bold">Jupiter</span>
                <span className="text-2xl"> for trading.</span>
              </div>
            </div>

            <div className=" flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-secondary text-2xl font-bold">
                2. Trade Your Token
              </div>
              <div className="text-2xl">
                Your token is now live and ready for trading:
              </div>
              <div className="self-stretch text-2xl">
                {" "}
                • On Uniswap v3: Trade your Base chain token.
              </div>
              <div className="self-stretch text-2xl">
                {" "}
                • On Jupiter: Trade your Solana chain token.
              </div>
              <div className="self-stretch text-2xl">
                {" "}
                • A 1% transaction fee supports team development and ecosystem
                growth.
              </div>
              <div className="self-stretch text-2xl">
                {" "}
                Share your token’s links with your community and start growing
                your meme economy!
              </div>
            </div>

            <div className=" flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-secondary text-2xl font-bold">
                3. Upcoming Feature
              </div>
              <div className="self-stretch text-2xl">
                We’re working on enabling cross-chain trading, so you’ll be able
                to seamlessly swap tokens between Base and Solana. Stay tuned
                for updates!
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
