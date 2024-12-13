import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export function OpenLink({
  label,
  href,
  iconUrl,
  icon,
  text,
}: {
  label: string;
  href: string;
  iconUrl?: string;
  icon?: React.ReactNode;
  text: string;
}) {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <span className="text-secondary font-bold">{label}</span>
      <Link
        className="flex flex-row gap-1 items-center"
        href={href}
        target={href.startsWith("http") ? "_blank" : ""}
      >
        {icon ? (
          icon
        ) : iconUrl ? (
          <Avatar className="w-6 h-6">
            <AvatarImage src={iconUrl} className="w-full h-full" />
            <AvatarFallback className="w-full h-full"></AvatarFallback>
          </Avatar>
        ) : null}
        <span className="font-normal line-clamp-1">{text}</span>
      </Link>
    </div>
  );
}
