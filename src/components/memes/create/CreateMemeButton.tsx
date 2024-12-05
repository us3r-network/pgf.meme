"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateMemeForm } from "./CreateMemeForm";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
export function CreateMemeButton({
  variant = "pc",
}: {
  variant?: "pc" | "mobile" | null | undefined;
}) {
  const { openConnectModal } = useConnectModal();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const createBtnEl = (
    <img className="w-[48px] h-[48px]" src="/images/logo.png" />
  );
  if (openConnectModal) {
    return (
      <Button
        className="p-0 m-0 w-[48px] h-[48px]"
        onClick={() => {
          openConnectModal();
        }}
      >
        <img className="w-full h-full rounded-[10px]" src="/images/logo.png" />
      </Button>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-0 m-0 w-[48px] h-[48px]">
          <img
            className="w-full h-full rounded-[10px]"
            src="/images/logo.png"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] gap-8 max-sm:h-screen max-sm:max-h-full max-h-[90%] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Meme</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <CreateMemeForm
            onSuccess={(transactionReceipt) => {
              setOpen(false);
              const tokenAddress = transactionReceipt.logs[0].address;
              console.log("token route", `/memes/${tokenAddress}`);
              router.push(`/memes/${tokenAddress}`);
            }}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
