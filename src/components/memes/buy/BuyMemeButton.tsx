import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { BuyMemeForm } from "./BuyMemeForm";

export function BuyMemeButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-12 px-4 py-3 rounded-[30px] w-[150px]">Buy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] gap-8">
        <DialogHeader>
          <DialogTitle>Buy Meme</DialogTitle>
        </DialogHeader>
        <BuyMemeForm />
      </DialogContent>
    </Dialog>
  );
}
