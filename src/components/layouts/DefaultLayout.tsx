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
import SigninButton from "../user/SigninButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import MessageMarquee from "../message/MessageMarquee";
import AboutDialogButton from "../About";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { CreateMemeButton } from "../memes/create/CreateMemeButton";

// const navItems = [
//   { title: "Explore", url: "/" },
//   { title: "Create", url: "/create" },
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
        <header className="w-full flex h-24 shrink-0 items-center border-b px-4 absolute top-0 left-0 gap-2">
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
              <div className="justify-start items-center flex">
                <div className="text-[#16181d] text-2xl font-bold font-['Inter']">
                  pgf.
                </div>
                <div className="text-[#16181d] text-2xl font-bold font-['Inter']">
                  meme
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

          <div className="flex-1 flex-shrink-0 z-10 overflow-hidden">
            <MessageMarquee />
          </div>
          <div className="flex items-center gap-4 z-20">
            <AboutDialogButton />
            <CreateMemeButton />
            {/* <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-[200px] md:w-[300px]"
              />
            </div> */}
            {/* <SigninButton /> */}
            <ConnectButton />
          </div>
        </header>

        <main className="w-full mt-24 p-6 max-w-screen-2xl mx-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
