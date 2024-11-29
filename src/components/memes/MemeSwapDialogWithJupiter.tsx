import { JUPITER_ENDPOINT } from "@/constants/jupiter";
import { Button } from "../ui/button";

export function MemeSwapDialogWithJupiter({
  token,
}: {
  token: {
    address: string;
  };
}) {
  return (
    <Button
      onClick={() => {
        if (!(window as any).Jupiter) {
          return;
        }
        if ((window as any).Jupiter._instance) {
          (window as any).Jupiter.resume();
        }
        (window as any).Jupiter.init({
          endpoint: JUPITER_ENDPOINT,
          formProps: {
            initialInputMint: "So11111111111111111111111111111111111111112",
            initialOutputMint: token?.address,
          },
        });
      }}
    >
      Swap
    </Button>
  );
}
