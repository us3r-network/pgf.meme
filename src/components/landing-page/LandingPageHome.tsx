import Image from "next/image";
import { Button } from "../ui/button";
import AirdropRules from "./AirdropRules";
import Tokenomics from "./Tokenomics";
import Footer from "./Footer";
import Link from "next/link";
import { getCreateCastWebUrl } from "@/lib/sharing/warpcast";
import Roadmap from "./Roadmap";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function LandingPageHome() {
  return (
    <div className="min-h-screen">
      <section
        className={cn(
          "flex flex-row items-center justify-between gap-10 mt-[128px] ",
          "max-md:flex-col-reverse max-md:gap-4 max-md:mt-0"
        )}
      >
        <div className="flex-1 flex-col justify-start items-start gap-8 inline-flex max-md:gap-4">
          <h1
            className=" text-white text-[64px] font-bold leading-[120%] max-md:text-[36px]"
            style={{ textShadow: "4px 4px 0px #FF1393" }}
          >
            Build, Trade, Earn – All in DegenCast
          </h1>
          <span className="text-white text-[36px] font-bold leading-[120%] max-md:text-[24px]">
            Claim $CAST and Unlock Web3 Opportunities
          </span>
          <span className="self-stretch text-white text-2xl font-normal max-md:text-[20px]">
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
              <div className="text-white text-4xl font-bold max-md:text-3xl">
                Claim $CAST
              </div>
            </Button>
          </Link>
        </div>
        <div className="w-[505px] h-[496px] relative max-md:hidden">
          <Image
            src="/landing-page/images/claim-banner.png"
            alt="landing-page-home"
            fill
          />
        </div>
        <div className="hidden w-full max-md:block">
          <img
            className="w-full"
            src="/landing-page/images/claim-banner.png"
            alt="landing-page-home"
          />
        </div>
      </section>
      <section className=" " id="rules">
        <SectionTitle>✨ Airdrop Rules ✨</SectionTitle>
        <AirdropRules />
      </section>
      <section className=" " id="tokenomics">
        <SectionTitle>📊 TOKENOMICS 📊</SectionTitle>
        <Tokenomics />
      </section>
      <section className=" " id="roadmap">
        <SectionTitle>🗺️ Roadmap 🗺️</SectionTitle>
        <Roadmap />
      </section>
      <section className=" mt-[128px] max-md:hidden">
        <Footer />
      </section>
    </div>
  );
}

function SectionTitle({ children }: PropsWithChildren) {
  return (
    <h1
      className={cn(
        " text-white text-[64px] font-bold leading-[120%] text-center mt-[128px] mb-12 ",
        "max-md:mt-[48px] max-md:mb-4 max-md:text-[32px]"
      )}
      style={{ textShadow: "4px 4px 0px #FF1393" }}
    >
      {children}
    </h1>
  );
}
