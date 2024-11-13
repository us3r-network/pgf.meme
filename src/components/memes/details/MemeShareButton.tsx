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
      <DialogContent className="gap-8">
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
    <div className="w-full flex flex-col justify-start items-center gap-6">
      <div className="w-full flex-col justify-start items-start gap-4 flex text-foreground text-2xl font-normal max-sm:text-base">
        Your share link has been generated! Share it with friends, and if they
        complete a transaction through this link, both of you will receive 5% of
        the transaction amount as a reward.
      </div>
      <div className="w-full shrink-0 justify-center items-start flex sm:gap-12 max-sm:justify-evenly">
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
      <div
        className="w-full box-border cursor-pointer py-3 px-6 rounded-xl border-4 border-secondary justify-start items-center gap-6 flex flex-row "
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Link copied",
            description: shareLink,
          });
        }}
      >
        <div className="w-0 flex-1 ">
          <span className="line-clamp-1 text-foreground text-xl max-sm:text-xs">
            {shareLink}
          </span>
        </div>
        <Copy className=" stroke-secondary size-6" />
      </div>
      <div className="w-full text-foreground/60 font-normal max-sm:text-xs">
        The link reward only applies to the first transaction completed through
        your link. Share more to generate new links and earn additional rewards.
      </div>
      <div className="w-full text-foreground/60 font-normal max-sm:text-xs">
        All rewards will be available for claim after token launch. Thank you
        for your patience!
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
