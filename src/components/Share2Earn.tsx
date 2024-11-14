import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import GuideText from "./GuideText";

export default function Share2EarnDialogButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary font-bold">
          Share2Earn
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] gap-8 max-sm:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Share2Earn</DialogTitle>
        </DialogHeader>
        <div className="flex-col justify-start items-start gap-8 inline-flex max-sm:flex-1 max-sm:overflow-y-auto">
          <GuideText
            guides={[
              {
                title: "Buy memes",
                description:
                  "hold a few tokens to unlock the Share to Earn feature! Once you’ve got them, you’re all set to start sharing and earning rewards!",
              },
              {
                title: "Earn by Sharing",
                description:
                  "Click the “Share2Earn” button to generate your unique link and share it with friends. Once your friend completes a transaction through this link, both of you will receive a 5% token reward!",
              },
              {
                title: "Claim Tokens",
                description:
                  "Go to the “Held” list in your profile to view your earned reward tokens. Once the token launches, the Claim button will be active, and you can collect your rewards!",
              },
            ]}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
