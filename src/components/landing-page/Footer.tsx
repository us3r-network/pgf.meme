import {
  PARAGRAPH_LINK,
  TG_LINK,
  WARPCAST_LINK,
  X_LINK,
} from "@/constants/landing-page";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full h-14 py-3 justify-between items-center inline-flex">
      <div className="justify-start items-center gap-6 flex">
        {/* <Link
          className="justify-start items-center gap-2 flex"
          href={TG_LINK}
          target="_blank"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/landing-page/images/telegram.png"
              alt="telegram"
              fill
            />
          </div>
          <span className="text-white text-2xl font-normal">Telegram</span>
        </Link> */}
        <Link
          className="justify-start items-center gap-2 flex"
          href={X_LINK}
          target="_blank"
        >
          <div className="w-8 h-8 relative rounded-[10px] overflow-hidden">
            <Image src="/images/x.png" alt="telegram" fill />
          </div>
          <span className="text-white text-2xl font-normal">X</span>
        </Link>
        <Link
          className="justify-start items-center gap-2 flex"
          href={WARPCAST_LINK}
          target="_blank"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/landing-page/images/warpcast.png"
              alt="warpcast"
              fill
            />
          </div>
          <span className="text-white text-2xl font-normal">Warpcast</span>
        </Link>
        <Link
          className="justify-start items-center gap-2 flex"
          href={PARAGRAPH_LINK}
          target="_blank"
        >
          <div className="w-8 h-8 relative">
            <Image src="/landing-page/images/logo.png" alt="paragraph" fill />
          </div>
          <span className="text-white text-2xl font-normal">Paragraph</span>
        </Link>
      </div>
      <div className="text-white text-2xl font-normal">
        Powered by{" "}
        <Link href={"https://degencast.fun"} target="_blank">
          <span>degencast.fun</span>
        </Link>{" "}
        —— Your Gateway to Web3 Freedom.
      </div>
    </div>
  );
}
