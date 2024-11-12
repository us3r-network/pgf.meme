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
import Link from "next/link";
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
        <Button size={"lg"} className="w-full max-sm:text-base">
          Share2Earn
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] gap-8 ">
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
    <div className="flex flex-col justify-start items-center gap-8">
      <div className=" flex-col justify-start items-start gap-4 flex text-[#16181d] text-2xl max-sm:xs">
        Share the link with friends, and receive a 20% discount coupon on
        transactions when they complete a successful trade!
      </div>
      <div className="shrink-0 justify-center items-start gap-12 flex max-sm:gap-3">
        <ShareItem
          icon="/images/warpcast.png"
          name="Warpcast"
          onClick={() => {
            shareToWarpcast([shareLink], "");
          }}
        />
        <ShareItem
          icon="/images/telegram.png"
          name="Telegram"
          onClick={() => {
            shareToTelegramWeb(shareLink);
          }}
        />
        <ShareItem
          icon="/images/twitter.png"
          name="Twitter"
          onClick={() => {
            shareToTwitter(shareLink);
          }}
        />
        <ShareItem
          icon="/images/whatsapp.png"
          name="WhatsApp"
          onClick={() => {
            shareToWhatsApp(shareLink);
          }}
        />
        <ShareItem
          icon="/images/facebook.png"
          name="Facebook"
          onClick={() => {
            shareToFacebook(shareLink);
          }}
        />
      </div>
      <div className="text-center text-[#16181d] text-2xl leading-[15px] max-sm:text-xs">
        or share with link
      </div>
      <div
        className="box-border cursor-pointer  p-3 rounded-xl border border-[#16181d] justify-start items-center gap-6 flex max-sm:w-[calc(100vw-48px)]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Link copied",
            description: shareLink,
          });
        }}
      >
        <span className="flex-1 line-clamp-1 text-[#626976] text-xl">
          {shareLink}
        </span>
        <Copy />
      </div>
    </div>
  );
}

function ShareItem({
  icon,
  name,
  onClick,
}: {
  icon: string;
  name: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex-col justify-start items-center gap-2.5 flex cursor-pointer"
      onClick={onClick}
    >
      <img
        src={icon}
        alt="telegram"
        className="w-[80px] h-[80px] max-sm:w-[48px] max-sm:h-[48px]"
      />
      <div className=" text-center text-[#16181d] max-sm:text-xs">{name}</div>
    </div>
  );
}
