import Image from "next/image";
import { cn } from "@/lib/utils";

const timelineData = [
  {
    time: "2024",
    items: [
      {
        position: "left",
        label: "Farcaster",
        image: "/landing-page/images/roadmap/farcaster.png",
      },
      {
        position: "right",
        label: "Solana",
        image: "/landing-page/images/roadmap/solana.png",
      },
      {
        position: "left",
        label: "Ethereum",
        image: "/landing-page/images/roadmap/ethereum.png",
      },
    ],
  },
  {
    time: "2025 Q1",
    items: [
      {
        position: "right",
        label: "Hyperliquid",
        image: "/landing-page/images/roadmap/hyperliquid.png",
      },
    ],
  },
  {
    time: "2025 Q2",
    items: [
      {
        position: "left",
        label: "Telegram",
        image: "/landing-page/images/roadmap/telegram.png",
      },
      {
        position: "right",
        label: "X",
        image: "/landing-page/images/roadmap/x.png",
      },
    ],
  },
  {
    time: "2025 Q3",
    items: [
      {
        position: "left",
        label: "AI",
        image: "/landing-page/images/roadmap/ai.png",
      },
    ],
  },
  {
    time: "2025 Q4",
    items: [
      {
        position: "right",
        label: "iOS",
        image: "/landing-page/images/roadmap/ios.png",
      },
      {
        position: "left",
        label: "Android",
        image: "/landing-page/images/roadmap/android.png",
      },
    ],
  },
];
export default function Roadmap() {
  return (
    <div className="w-full">
      {" "}
      <div className="relative w-full flex flex-col ">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[10px] h-full bg-pink-500 transform -translate-x-1/2">
          <Line />
        </div>

        {/* Timeline content */}
        {timelineData.map((period, index) => (
          <div
            key={period.time}
            className="w-full relative pb-14 min-h-[400px]"
          >
            {/* Year marker */}
            <div className="w-fit bg-white px-4 py-1 rounded-full shadow-md mx-auto mb-10">
              <p className="text-primary text-[32px] font-bold">
                {period.time}
              </p>
            </div>

            {/* Grid for timeline items */}
            <div className="flex flex-col items-center">
              {period.items.map((item, itemIndex) => (
                <TimelineItem
                  key={`${period.time}-${item.label}`}
                  label={item.label}
                  image={item.image}
                  position={item.position as any}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-sm font-normal text-white text-center">
        Cuz 100% according to plan...
      </div>
    </div>
  );
}

interface TimelineItemProps {
  label: string;
  image: string;
  position: "left" | "right";
}

export function TimelineItem({ label, image, position }: TimelineItemProps) {
  return (
    <div className="w-full flex flex-row justify-center items-center h-[200px]">
      <div
        className={cn(
          "flex flex-row gap-2 items-center",
          position === "left" ? " -translate-x-1/2" : "translate-x-1/2"
        )}
      >
        {position === "right" && (
          <div className="bg-primary w-[130px] h-[8px] ml-[24px] rounded-full" />
        )}
        <div className={cn("flex flex-col items-center gap-6 ")}>
          <p className="text-white font-bold text-[40px]">{label}</p>
          <img src={image} alt={label} width={410} loading="lazy" />
        </div>
        {position === "left" && (
          <div className="bg-primary w-[130px] h-[8px] mr-[24px] rounded-full" />
        )}
      </div>
    </div>
  );
}

function Line() {
  return (
    <div className="w-full h-full">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11px"
        height="100%"
        viewBox="0 0 11 100%"
        fill="none"
      >
        <path
          d="M10.3438 0L0.34375 87.09V1134.62L10.3438 1074.52V0Z"
          fill="url(#roadmap_paint0_linear_6415_3415)"
        />
        <defs>
          <linearGradient
            id="roadmap_paint0_linear_6415_3415"
            x1="5.34375"
            y1="0"
            x2="5.34375"
            y2="1134.62"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#F475BC" />
            <stop offset="1" stop-color="#92C7F5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
