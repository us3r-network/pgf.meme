import { hashToHSL } from "@/lib/color";
import { cn } from "@/lib/utils";

export default function DefaultUserAvatar({
  address,
  className,
}: {
  address: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        className
      )}
      style={{
        backgroundColor: hashToHSL(address),
      }}
    >
      <img className="w-full h-full" src="/images/dog.png" />
    </div>
  );
}
