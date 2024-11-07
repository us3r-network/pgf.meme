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
        "w-full h-12 px-4 py-3 bg-primary rounded-[30px] justify-center items-center gap-6 flex",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="24"
        viewBox="0 0 30 24"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.51087 10.3318C10.2847 6.94489 15.4685 4.712 18.0623 3.63318C25.4679 0.552929 27.0067 0.0178568 28.0097 0.000188385C28.2303 -0.00369759 28.7235 0.0509728 29.043 0.310224C29.3128 0.529131 29.387 0.824843 29.4226 1.03239C29.4581 1.23994 29.5023 1.71274 29.4671 2.08217C29.0658 6.2988 27.3294 16.5315 26.4459 21.2541C26.0721 23.2525 25.3361 23.9225 24.6235 23.9881C23.0749 24.1306 21.899 22.9647 20.3991 21.9815C18.0521 20.443 16.7262 19.4853 14.448 17.984C11.8152 16.249 13.5219 15.2954 15.0224 13.737C15.4151 13.3291 22.2382 7.12301 22.3702 6.56002C22.3867 6.48961 22.4021 6.22715 22.2461 6.08856C22.0902 5.94997 21.8601 5.99736 21.694 6.03505C21.4586 6.08848 17.7092 8.56668 10.4459 13.4697C9.38161 14.2005 8.41765 14.5565 7.55397 14.5379C6.60183 14.5173 4.7703 13.9995 3.40875 13.5569C1.73874 13.0141 0.411459 12.7271 0.527035 11.8051C0.587235 11.3249 1.24851 10.8338 2.51087 10.3318Z"
          fill="white"
        />
      </svg>
      <span className="text-white text-xl font-bold max-sm:text-base">
        Join Telegram Topic
      </span>
    </Link>
  );
}
