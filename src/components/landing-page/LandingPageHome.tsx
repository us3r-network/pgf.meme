import Image from "next/image";
import { Button } from "../ui/button";
import AirdropRules from "./AirdropRules";
import Tokenomics from "./Tokenomics";
import Footer from "./Footer";
import Link from "next/link";
import { getCreateCastWebUrl } from "@/lib/sharing/warpcast";
import Roadmap from "./Roadmap";

export default function LandingPageHome() {
  return (
    <div className="min-h-screen">
      <section className="flex flex-row items-center justify-between gap-10 mt-[128px]">
        <div className="flex-1 flex-col justify-start items-start gap-8 inline-flex">
          <h1
            className=" text-white text-[64px] font-bold leading-[120%]"
            style={{ textShadow: "4px 4px 0px #FF1393" }}
          >
            Build, Trade, Earn – All in DegenCast
          </h1>
          <span className="text-white text-[36px] font-bold leading-[120%]">
            Claim $CAST and Unlock Web3 Opportunities
          </span>
          <span className="self-stretch text-white text-2xl font-normal">
            $CAST connects Solana and Base with seamless cross-chain utility.
            Powering the future of Web3, $CAST unlocks endless
            possibilities—start your journey today!
          </span>
          <Link
            href={getCreateCastWebUrl(
              [],
              "",
              `@degencast.eth claim $CAST airdrop!`
            )}
            target="_blank"
            className="w-full"
          >
            <Button className="w-full h-[65px] px-6 py-3 rounded-full gap-6 flex">
              <div className="text-white text-4xl font-bold">Claim $CAST</div>
            </Button>
          </Link>
        </div>
        <div className="w-[505px] h-[496px] relative">
          <Image
            src="/landing-page/images/claim-banner.png"
            alt="landing-page-home"
            fill
          />
        </div>
      </section>
      <section className=" " id="rules">
        <h1
          className=" text-white text-[64px] font-bold leading-[120%] text-center pt-[128px] mb-12"
          style={{ textShadow: "4px 4px 0px #FF1393" }}
        >
          ✨ Airdrop Rules ✨
        </h1>
        <AirdropRules />
      </section>
      <section className=" " id="tokenomics">
        <h1
          className=" text-white text-[64px] font-bold leading-[120%] text-center pt-[128px] mb-12"
          style={{ textShadow: "4px 4px 0px #FF1393" }}
        >
          📊 TOKENOMICS 📊
        </h1>
        <Tokenomics />
      </section>
      <section className=" " id="roadmap">
        <h1
          className=" text-white text-[64px] font-bold leading-[120%] text-center pt-[128px] mb-12"
          style={{ textShadow: "4px 4px 0px #FF1393" }}
        >
          🗺️ Roadmap 🗺️
        </h1>
        <Roadmap />
      </section>
      <section className=" mt-[128px]">
        <Footer />
      </section>
    </div>
  );
}
