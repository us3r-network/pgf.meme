import { Button } from "@/components/ui/button";
import { getCreateTweetWebUrl, shareToTwitter } from "@/lib/sharing/twitter";
import { getCreateCastWebUrl, shareToWarpcast } from "@/lib/sharing/warpcast";
import Link from "next/link";
import Image from "next/image";

const botText = `
  @degencast.eth Launch a new token!
  Name: memename
  Symbol: SYMBOL

  Here’s the meme that represents it.
  Let’s make it the next big thing! 🚀

  [Attach Meme Image]
`;
export function CreateMemeWithWarpcast() {
  return (
    <Link
      className="block w-full h-full"
      href={getCreateCastWebUrl([], "", botText)}
      target="_blank"
    >
      <div className="w-full h-full rounded-full relative overflow-hidden">
        <Image src="/images/warpcast.png" alt="logo" fill />
      </div>
    </Link>
  );
}

export function CreateMemeWithTwitter() {
  return (
    <Link
      className="block w-full h-full"
      href={getCreateTweetWebUrl("", botText)}
      target="_blank"
    >
      <div className="w-full h-full rounded-full relative overflow-hidden">
        <Image src="/images/x.png" alt="logo" fill />
      </div>
    </Link>
  );
}
