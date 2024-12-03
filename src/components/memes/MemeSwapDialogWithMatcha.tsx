import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PGFToken } from "@/services/contract/types";
import { Button } from "../ui/button";
import MemeSwapWithMatcha from "./MemeSwapWithMatcha";

export default function MemeSwapDialogWithMatcha({
  token,
}: {
  token: PGFToken;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Swap</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] gap-8 max-sm:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Trade on Matcha</DialogTitle>
        </DialogHeader>
        <MemeSwapWithMatcha token={token} />
      </DialogContent>
    </Dialog>
  );
}
