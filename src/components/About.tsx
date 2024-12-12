import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";
import GuideText from "./GuideText";
import { ScrollArea } from "./ui/scroll-area";

export default function AboutDialogButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CircleHelp className="fill-primary-foreground stroke-primary size-16 -mx-2 cursor-pointer hover:scale-105 transition-transform" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] max-h-[90vh] gap-8 max-sm:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>How degencast.wtf works?</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-col justify-start items-start gap-8 inline-flex flex-1 overflow-y-auto">
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
                <span className="div text-2xl -ml-2">
                  💡 Once submitted, we’ll create two versions of your token:
                  <br />
                </span>
                <span className="text-2xl font-bold  pl-2">
                  {" "}
                  • On Base Chain:{" "}
                </span>
                <span className="text-2xl">Deployed on </span>
                <span className="text-2xl font-bold">Uniswap v3</span>
                <span className="text-2xl">
                  {" "}
                  for trading.
                  <br />
                </span>
                <span className="text-2xl font-bold  pl-2">
                  {" "}
                  • On Solana Chain:{" "}
                </span>
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
              <div className="self-stretch text-2xl pl-1">
                • On Uniswap v3: Trade your Base chain token.
              </div>
              <div className="self-stretch text-2xl  pl-1">
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
