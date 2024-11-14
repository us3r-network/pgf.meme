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
            className="w-full h-12"
            onClick={() => {
              openConnectModal();
            }}
          >
            <span className="text-xl">Create a new meme</span>
          </Button>
        ) : (
          <Button
            className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary"
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
          <Button className="w-full h-12">
            <span className="text-xl">Create a new meme</span>
          </Button>
        ) : (
          <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary">
            Create
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] gap-8 max-sm:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Meme</DialogTitle>
        </DialogHeader>
        <div className="max-sm:flex-1 max-sm:overflow-y-auto">
          <CreateMemeForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
