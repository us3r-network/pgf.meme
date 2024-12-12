import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { shareToFacebook } from "@/lib/sharing/facebook";
import { shareToTelegramWeb } from "@/lib/sharing/telegram";
import { shareToTwitter } from "@/lib/sharing/twitter";
import { shareToWarpcast } from "@/lib/sharing/warpcast";
import { shareToWhatsApp } from "@/lib/sharing/whatsapp";
import { MemeData } from "@/services/meme/types";
import { Copy } from "lucide-react";

export default function MemeShareButton({
  meme,
  className,
}: {
  meme: MemeData;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"} className="w-full max-sm:text-base">
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
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
  const baseTokenAddress = meme?.baseToken?.tokenAddress;
  const solTokenAddress = meme?.solToken?.tokenAddress;
  const shareLink = `${window.location.origin}/memes/${meme.id}`;
  const baseLink = baseTokenAddress
    ? `${window.location.origin}/memes/${baseTokenAddress}`
    : "";
  const solLink = baseTokenAddress
    ? `${window.location.origin}/memes/${solTokenAddress}`
    : "";
  return (
    <div className="w-full flex flex-col justify-start items-center gap-6">
      <span className="text-2xl font-normal max-sm:text-base self-start">
        Share the Token with Friends! 🎉
      </span>
      <span className="text-2xl font-normal max-sm:text-base self-start">
        Let your friends know about this awesome token! Simply copy the link
        below and share it via your favorite platform.
      </span>

      <div className="w-full shrink-0 justify-center items-start flex sm:gap-12 max-sm:justify-evenly">
        <ShareItem
          icon="/images/farcaster.png"
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
          icon="/images/x.png"
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
      <CopyLink link={shareLink} />
      {baseLink && <CopyLink link={baseLink} />}
      {solLink && <CopyLink link={solLink} />}
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
        alt={name}
        className="w-[80px] h-[80px] max-sm:w-[48px] max-sm:h-[48px] rounded-full"
      />
      <div className=" text-center text-[#16181d] max-sm:text-xs">{name}</div>
    </div>
  );
}

function CopyLink({ link }: { link: string }) {
  return (
    <div
      className="w-full box-border cursor-pointer py-3 px-6 rounded-xl border-4 border-secondary justify-start items-center gap-6 flex flex-row "
      onClick={() => {
        navigator.clipboard.writeText(link);
        toast({
          title: "Link copied",
          description: link,
        });
      }}
    >
      <div className="w-0 flex-1 ">
        <span className="line-clamp-1 text-foreground text-xl max-sm:text-xs">
          {link}
        </span>
      </div>
      <Copy className=" stroke-secondary size-6" />
    </div>
  );
}
