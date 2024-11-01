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
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { CreateMemeButton } from "../memes/create/CreateMemeButton";

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
        <header className="w-screen h-24  fixed top-0 left-0 bg-background z-10 max-sm:h-[72px]">
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
                <div className="w-12 h-12 relative bg-[#16181d] rounded-xl" />
                <div className="justify-start items-center flex max-sm:hidden">
                  <div className="text-[#16181d] text-2xl font-bold font-['Inter']">
                    pgf.meme
                  </div>
                </div>
              </Link>
            ) : (
              <Button
                size="icon"
                className="size-12"
                onClick={() => {
                  router.back();
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}

            <div className="flex-1 flex-shrink-0 z-10 overflow-hidden max-sm:hidden">
              <MessageMarquee />
            </div>
            <div className="flex items-center gap-4 z-20 ml-auto">
              <AboutDialogButton />
              <div className="max-sm:hidden">
                <CreateMemeButton />
              </div>
              <ConnectButton showBalance={false} chainStatus={"none"} />
            </div>
          </div>
        </header>

        <main className="w-screen mt-24 p-6 max-w-screen-2xl mx-auto box-border overflow-hidden max-sm:p-3 max-sm:mt-[72px] max-sm:pt-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
