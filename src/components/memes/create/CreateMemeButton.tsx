import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateMemeForm } from "./CreateMemeForm";

export function CreateMemeButton({
  variant = "pc",
}: {
  variant?: "pc" | "mobile" | null | undefined;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "mobile" ? (
          <Button className="bg-[#FAD719] w-full h-12">
            <span className="text-[#16181D] text-xl">Create a new meme</span>
          </Button>
        ) : (
          <Button>Create</Button>
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
