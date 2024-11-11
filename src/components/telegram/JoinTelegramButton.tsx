import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function JoinTelegramButton({
  className,
  link,
}: {
  className?: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("w-full", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <Button size={"lg"} className="w-full">
        Join Chat Room
      </Button>
    </Link>
  );
}
