import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { shareToFacebook } from "@/lib/sharing/facebook";
import { shareToTelegramWeb } from "@/lib/sharing/telegram";
import { shareToTwitter } from "@/lib/sharing/twitter";
import { shareToWarpcast } from "@/lib/sharing/warpcast";
import { shareToWhatsApp } from "@/lib/sharing/whatsapp";
import { MemeData } from "@/services/meme/types";
import { Copy } from "lucide-react";
import { useAccount, useEnsAddress } from "wagmi";

export default function MemeShareButton({
  meme,
  className,
}: {
  meme: MemeData;
  className?: string;
}) {
  const { name, image } = meme;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="grow shrink basis-0 h-12 px-4 py-3 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex">
          <div className="text-[#fefaf6] text-xl font-bold">
            Earn by Sharing
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] gap-8">
        <DialogHeader>
          <DialogTitle>Share2Earn</DialogTitle>
        </DialogHeader>
        <MemeShareContent meme={meme} />
      </DialogContent>
    </Dialog>
  );
}

function MemeShareContent({
  meme,
  className,
}: {
  meme: MemeData;
  className?: string;
}) {
  const { toast } = useToast();
  const { address } = useAccount();

  const shareLink = `${window.location.origin}/memes/${meme.address}?referral=${
    address || ""
  }`;
  return (
    <div className=" flex-col justify-start items-center gap-8 inline-flex">
      <div className="self-stretch h-[68px] flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch text-[#16181d] text-2xl leading-[33.60px]">
          Share to earn 4% commission on every trade made through your referral.
        </div>
      </div>
      <div className="self-stretch justify-center items-start gap-12 inline-flex">
        <div
          className="w-20 flex-col justify-start items-center gap-2.5 inline-flex cursor-pointer"
          onClick={() => {
            shareToWarpcast([shareLink], "");
          }}
        >
          <img src="/images/warpcast.png" alt="warpcast" />
          <div className="self-stretch text-center text-[#16181d] text-[14.93px] tracking-wide">
            Warpcast
          </div>
        </div>
        <div
          className="w-20 flex-col justify-start items-center gap-2.5 inline-flex cursor-pointer"
          onClick={() => {
            shareToTelegramWeb(shareLink);
          }}
        >
          <img src="/images/telegram.png" alt="telegram" />
          <div className="self-stretch text-center text-[#16181d] text-[14.93px] tracking-wide">
            Telegram
          </div>
        </div>
        <div
          className="w-20 flex-col justify-start items-center gap-2.5 inline-flex cursor-pointer"
          onClick={() => {
            shareToTwitter(shareLink);
          }}
        >
          <img src="/images/twitter.png" alt="twitter" />
          <div className="self-stretch text-center text-[#16181d] text-[14.93px] tracking-wide">
            Twitter
          </div>
        </div>
        <div
          className="w-20 flex-col justify-start items-center gap-2.5 inline-flex cursor-pointer"
          onClick={() => {
            shareToWhatsApp(shareLink);
          }}
        >
          <img src="/images/whatsapp.png" alt="whatsapp" />
          <div className="text-center text-[#16181d] text-[14.93px] tracking-wide">
            WhatsApp
          </div>
        </div>
        <div
          className="w-20 flex-col justify-start items-center gap-2.5 inline-flex cursor-pointer"
          onClick={() => {
            shareToFacebook(shareLink);
          }}
        >
          <img src="/images/facebook.png" alt="facebook" />
          <div className="self-stretch text-center text-[#16181d] text-[14.93px] tracking-wide">
            Facebook
          </div>
        </div>
      </div>
      <div className="text-center text-[#16181d] text-2xl leading-[15px]">
        or share with link
      </div>
      <div
        className="cursor-pointer self-stretch p-3 rounded-xl border border-[#16181d] justify-start items-center gap-6 flex"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Link copied",
            description: shareLink,
          });
        }}
      >
        <div className="flex-1 line-clamp-1 grow shrink basis-0 text-[#626976] text-xl leading-[17.50px]">
          {shareLink}
        </div>
        <Copy />
      </div>
    </div>
  );
}
