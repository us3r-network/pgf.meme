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
          <DialogTitle>How pgf.meme works?</DialogTitle>
        </DialogHeader>
        <div className="flex-col justify-start items-start gap-8 inline-flex max-sm:flex-1 max-sm:overflow-y-auto">
          <div className="hidden max-sm:block">
            <GuideText
              guides={[
                {
                  title: `Create & Share Meme Coins`,
                  description: `Meme coins can be bought across multiple blockchains. After create, 20% tokens will be allocated to Vitalik(15%) and charity pool(5%) for charity.`,
                },
                {
                  title: `Trade with Impact`,
                  description: `Purchases are made using a step-based price curve, and once the total reaches $69k, the meme coin is launched on Uniswap V3, enabling full buy/sell trading on the Ethereum mainnet.`,
                },
                {
                  title: `Earn by Sharing`,
                  description: `Share your meme coin link and earn 4% commission on every transaction made through your referral.`,
                  guides: [
                    {
                      title: `Buy memes`,
                      description: `hold a few tokens to unlock the Share to Earn feature! Once you’ve got them, you’re all set to start sharing and earning rewards!`,
                    },
                    {
                      title: `Share memes`,
                      description: `Click the “Share2Earn” button to generate your unique link and share it with friends. Once your friend completes a transaction through this link, both of you will receive a 5% token reward!`,
                    },
                    {
                      title: `Claim memes`,
                      description: `Go to the “Held” list in your profile to view your earned reward tokens. Once the token launches, the Claim button will be active, and you can collect your rewards!`,
                    },
                  ],
                },
              ]}
            />
          </div>
          <div className="max-sm:hidden">
            <GuideText
              guides={[
                {
                  title: `Create & Share Meme Coins`,
                  description: `Meme coins can be bought across multiple blockchains. After create, 20% tokens will be allocated to Vitalik(15%) and charity pool(5%) for charity.`,
                },
                {
                  title: `Trade with Impact`,
                  description: `Purchases are made using a step-based price curve, and once the total reaches $69k, the meme coin is launched on Uniswap V3, enabling full buy/sell trading on the Ethereum mainnet.`,
                },
                {
                  title: `Earn by Sharing`,
                  description: `Share your meme coin link and earn 4% commission on every transaction made through your referral.`,
                },
              ]}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
