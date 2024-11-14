"use client";

import * as React from "react";
import { MagnifyingGlassIcon, BoxIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import MessageMarquee from "../message/MessageMarquee";
import AboutDialogButton from "../About";
import { Button } from "../ui/button";
import { ChevronLeft, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { CreateMemeButton } from "../memes/create/CreateMemeButton";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import Share2EarnDialogButton from "../Share2Earn";

// const navItems = [
//   { title: "Explore", url: "/" },
// ];

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const router = useRouter();
  const account = useAccount();
  const showMessageMarquee = isHomePage || pathname.startsWith("/memes");
  return (
    <SidebarProvider defaultOpen={false}>
      {/* <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center space-x-2">
            <BoxIcon className="h-8 w-8 text-primary" />
            <span className="text-lg font-bold">Logo</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="h-full">
                  <Link
                    href={item.url}
                    className="text-base flex items-center h-full"
                  >
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarRail />
      </Sidebar> */}
      <SidebarInset>
        <header className="w-screen h-[80px]  fixed top-0 left-0 bg-primary z-10 max-sm:h-[70px]">
          <div className="w-full max-w-screen-2xl mx-auto h-full flex shrink-0 items-center px-6 gap-2 box-border max-sm:px-3">
            {/* <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-6" />
          </div> */}
            {isHomePage ? (
              <Link
                className="h-12 justify-start items-center gap-2 inline-flex"
                href="/"
              >
                <span className="text-primary-foreground text-4xl font-bold max-sm:text-2xl">
                  <span className="max-sm:hidden">Welcome to </span> pgf.meme✨
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

            <div className="flex items-center gap-4 z-20 ml-auto max-sm:gap-2">
              <AboutDialogButton />
              <div className="max-sm:hidden">
                <Share2EarnDialogButton />
              </div>

              <div className="max-sm:hidden">
                <CreateMemeButton />
              </div>
              <div className="hidden max-sm:block">
                <ConnectButton
                  showBalance={false}
                  chainStatus={"none"}
                  label="Connect"
                />
              </div>
              <div className="max-sm:hidden">
                <ConnectButton chainStatus={"none"} />
              </div>
            </div>
          </div>
        </header>
        <div
          className={cn(
            "w-screen  fixed  left-0 bg-secondary z-10 h-[58px] top-[80px] max-sm:h-[40px] max-sm:top-[70px]",
            !showMessageMarquee && "hidden"
          )}
        >
          <MessageMarquee />
        </div>

        <main
          className={cn(
            "w-screen  max-w-screen-2xl mx-auto box-border overflow-hidden mt-[80px] max-sm:mt-[70px] p-6 max-sm:p-3",
            showMessageMarquee && "mt-[138px] max-sm:mt-[110px]"
          )}
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
