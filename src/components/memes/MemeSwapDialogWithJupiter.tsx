import { SOLANA_ENDPOINT } from "@/constants/solana";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import MemeSwapWithJupiter from "./MemeSwapWithJupiter";

export function MemeSwapDialogWithJupiter({
  token,
}: {
  token: {
    address: string;
  };
}) {
  const t = { address: "A53BzB7297SXdF6mguQQ8kzqjVYt8pUeHW5m1i8pD6hf" };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Swap</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] gap-8 max-sm:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Trade on Jupiter</DialogTitle>
        </DialogHeader>
        <div className="h-[420px] rounded-md overflow-hidden">
          <MemeSwapWithJupiter token={t} />
        </div>
      </DialogContent>
    </Dialog>
  );
  // return (
  //   <Button
  //     onClick={() => {
  //       if (!(window as any).Jupiter) {
  //         return;
  //       }
  //       if ((window as any).Jupiter._instance) {
  //         (window as any).Jupiter.resume();
  //       }
  //       (window as any).Jupiter.init({
  //         endpoint: SOLANA_ENDPOINT,
  //         formProps: {
  //           initialInputMint: "So11111111111111111111111111111111111111112",
  //           initialOutputMint: token?.address,
  //         },
  //       });
  //     }}
  //   >
  //     Swap
  //   </Button>
  // );
}