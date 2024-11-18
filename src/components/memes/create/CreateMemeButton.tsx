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
  return (
    <Dialog>
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
        <div className="flex-1 overflow-y-auto">
          <CreateMemeForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
