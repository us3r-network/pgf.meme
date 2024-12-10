"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import MessageMarquee from "../message/MessageMarquee";
import AboutDialogButton from "../About";
import { Button } from "../ui/button";
import { ChevronLeft, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { CreateMemeButton } from "../memes/create/CreateMemeButton";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import Share2EarnDialogButton from "../Share2Earn";
import { CustomConnectButton } from "../CustomConnectButton";
import { SearchInput } from "../ui/search-input";
import useSearchTerms from "@/hooks/app/useSearchTerms";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  CreateMemeWithTwitter,
  CreateMemeWithWarpcast,
} from "../memes/create/CreateMemeWithBot";

export function DefaultHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const router = useRouter();
  const account = useAccount();
  const showMessageMarquee = isHomePage || pathname.startsWith("/memes");
  const { setSearchTerms } = useSearchTerms();
  useEffect(() => {
    setSearchTerms("");
  }, [pathname]);
  return (
    <>
      {" "}
      <header className="w-screen h-[80px]  fixed top-0 left-0 bg-primary z-10 max-sm:h-[70px]">
        <div className="w-full max-w-screen-2xl mx-auto h-full flex shrink-0 items-center px-6 gap-2 box-border max-sm:px-3">
          {isHomePage ? (
            <Link
              className="h-12 justify-start items-center gap-4 inline-flex hover:no-underline"
              href="/"
            >
              <img src="/images/logo.png" className="size-12 max-sm:size-10" />
              <span className="text-primary-foreground text-4xl font-bold max-sm:text-2xl">
                castcoin.fun✨
              </span>
            </Link>
          ) : (
            <div className="flex flex-row items-center gap-4">
              <Button
                className="size-14 rounded-xl bg-primary-foreground hover:bg-primary-foreground max-sm:size-11 p-0"
                onClick={() => {
                  router.push("/");
                }}
              >
                <Home className="stroke-primary hover:stroke-primary  !size-8" />
              </Button>
              <Button
                className="size-14 rounded-xl bg-primary-foreground hover:bg-primary-foreground max-sm:size-11 p-0"
                onClick={() => {
                  router.back();
                }}
              >
                <ChevronLeft className="stroke-primary hover:stroke-primary  !size-8" />
              </Button>
            </div>
          )}

          {isHomePage && (
            <SearchInput
              placeholder="Search meme..."
              className="flex-1 max-sm:hidden"
              onChange={(e) => setSearchTerms(e.target.value)}
            />
          )}

          <div className="flex items-center gap-4 z-20 ml-auto max-sm:gap-2">
            <div className="max-sm:hidden flex items-center gap-4">
              <span className="text-2xl font-bold text-primary-foreground">
                Create Meme From
              </span>
              <CreateMemeWithWarpcast />
              <CreateMemeWithTwitter />
              <CreateMemeButton />
            </div>
            <AboutDialogButton />
            {/* <div className="max-sm:hidden">
              <Share2EarnDialogButton />
            </div> */}
            <div>
              {/* rainbowkit styles */}
              <style jsx global>{`
                [data-testid="rk-connect-button"],
                [data-testid="rk-account-button"] {
                  height: 52px !important;
                  font-size: 24px !important;
                  font-weight: 700 !important;
                  padding: 12px !important;
                  padding-left: 24px !important;
                  padding-right: 24px !important;
                }
                [data-testid="rk-connect-button"] > div,
                [data-testid="rk-account-button"] > div {
                  padding: 0px !important;
                }
              `}</style>
              <ConnectButton
                showBalance={false}
                chainStatus={"none"}
                label="Connect"
              />
            </div>
          </div>
        </div>
      </header>
      <div
        className={cn(
          "w-screen  fixed  left-0 bg-secondary z-10 h-[58px] top-[80px] max-sm:h-[40px] max-sm:top-[70px] border-b-4 border-primary",
          !showMessageMarquee && "hidden"
        )}
      >
        <MessageMarquee />
      </div>
    </>
  );
}

export function DefaultMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const showMessageMarquee = isHomePage || pathname.startsWith("/memes");
  return (
    <main
      className={cn(
        "w-screen  max-w-screen-2xl mx-auto box-border overflow-hidden mt-[80px] max-sm:mt-[70px] p-6 max-sm:p-3",
        showMessageMarquee && "mt-[138px] max-sm:mt-[110px]"
      )}
    >
      {children}
    </main>
  );
}
