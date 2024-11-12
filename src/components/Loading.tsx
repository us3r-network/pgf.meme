import { cn } from "@/lib/utils";

export default function Loading({
  className,
  ...props
}: {
  className?: string;
}) {
  return (
    <img
      src="/images/loading.gif"
      alt="loading"
      className={cn("object-cover w-52 h-14", className)}
      {...props}
    />
  );
}
