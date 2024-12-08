import { Button } from "@/components/ui/button";
import { shareToTwitter } from "@/lib/sharing/twitter";
import { shareToWarpcast } from "@/lib/sharing/warpcast";
import Link from "next/link";

const botText = `
  @bot Launch a new token!
  Name: memename
  Symbol: SYMBOL

  Here’s the meme that represents it.
  Let’s make it the next big thing! 🚀

  [Attach Meme Image]
`;
export function CreateMemeWithWarpcast() {
  return (
    <>
      <Button
        variant={"link"}
        className="p-0 m-0 w-[48px] h-[48px]"
        onClick={(e) => {
          e.preventDefault();
          shareToWarpcast([], "", botText);
        }}
      >
        <img
          src="/images/warpcast.png"
          className="w-full h-full rounded-[10px]"
        />
      </Button>
    </>
  );
}

export function CreateMemeWithTwitter() {
  return (
    <Button
      variant={"link"}
      className="p-0 m-0 w-[48px] h-[48px]"
      onClick={(e) => {
        e.preventDefault();
        shareToTwitter("", botText);
      }}
    >
      <img src="/images/x.png" className="w-full h-full rounded-[10px]" />
    </Button>
  );
}
