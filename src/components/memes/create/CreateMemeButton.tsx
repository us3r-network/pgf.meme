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
  if (openConnectModal) {
    return (
      <>
        {variant === "mobile" ? (
          <Button
            className="w-full h-12 font-bold text-xl"
            onClick={() => {
              openConnectModal();
            }}
          >
            Create a new meme
          </Button>
        ) : (
          <Button
            className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary font-bold"
            onClick={() => {
              openConnectModal();
            }}
          >
            Create
          </Button>
        )}
      </>
    );
  }
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === "mobile" ? (
          <Button className="w-full h-12 text-xl font-bold">
            Create a new meme
          </Button>
        ) : (
          <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary font-bold">
            Create
          </Button>
        )}
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
