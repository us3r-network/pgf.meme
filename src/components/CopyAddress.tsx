import { useToast } from "@/hooks/use-toast";
import { shortPubKey } from "@/lib/shortAddress";
import { Copy } from "lucide-react";

export default function CopyAddress({
  address,
  label,
}: {
  address: string;
  label?: string;
}) {
  const { toast } = useToast();
  const copyEl = (
    <div
      className="flex flex-row items-center gap-2 line-clamp-1 w-fit cursor-pointer "
      onClick={() => {
        navigator.clipboard.writeText(address);
        toast({
          title: "Address copied",
          description: address,
        });
      }}
    >
      <span className="font-normal">{shortPubKey(address)}</span>
      <Copy className=" size-6" />
    </div>
  );
  if (!label) {
    return copyEl;
  }
  return (
    <div className="w-full flex flex-row justify-between items-center gap-6">
      <div className="text-secondary font-bold line-clamp-1">{label}</div>
      {copyEl}
    </div>
  );
}
