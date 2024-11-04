import Link from "next/link";
import { cn } from "@/lib/utils";

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
      className={cn(
        "w-full h-12 px-4 py-3 bg-[#28a7e8] rounded-[30px] justify-center items-center gap-6 flex",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-white text-xl font-bold">Join Telegram Topic</span>
    </Link>
  );
}
