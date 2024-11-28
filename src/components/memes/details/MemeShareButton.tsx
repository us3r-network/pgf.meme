import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useValidateBuyingMeme from "@/hooks/meme/useValidateBuyingMeme";
import { useToast } from "@/hooks/use-toast";
import { shareToFacebook } from "@/lib/sharing/facebook";
import { shareToTelegramWeb } from "@/lib/sharing/telegram";
import { shareToTwitter } from "@/lib/sharing/twitter";
import { shareToWarpcast } from "@/lib/sharing/warpcast";
import { shareToWhatsApp } from "@/lib/sharing/whatsapp";
import { MemeData } from "@/services/meme/types";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount, useEnsAddress } from "wagmi";
import { BuyMemeForm } from "../trade/BuyMemeForm";
import { Address } from "viem";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { useConnectModal } from "@rainbow-me/rainbowkit";

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

function ValidateBuyingMeme({ meme }: { meme: MemeData }) {
  const { valid, idle, pending, validate } = useValidateBuyingMeme({
    address: meme.address,
  });
  const [buying, setBuying] = useState(false);
  useEffect(() => {
    validate();
  }, []);

  if (idle || pending) {
    return (
      <div className="w-full flex flex-row items-center justify-center h-[400px]">
        <Loading className="w-[30%] h-20 max-sm:w-[60%]" />
      </div>
    );
  }
  if (!valid && !buying) {
    return (
      <>
        {" "}
        <BuyMemeForm
          buyBtnText="Buy & Share2Earn"
          token={{
            contractAddress: meme.address as Address,
            chainId: PGF_CONTRACT_CHAIN_ID,
          }}
          onSuccess={() => {
            setBuying(true);
          }}
        />
        <div className="text-center">
          Buy tokens to get started and unlock Share2Earn feature! Share your
          unique link, once your friend completes a transaction, both of you
          will receive a 5% token reward!
        </div>
      </>
    );
  }
  return <MemeShareContent meme={meme} />;
}

function MemeShareContent({
  meme,
  className,
}: {
  meme: MemeData;
  className?: string;
}) {
  const { toast } = useToast();
  const isGraduation = !!meme.graduation?.poolAddress;
  const shareLink = `${window.location.origin}/memes/${meme.address}`;
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
