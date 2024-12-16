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
        position: "left",
        label: "Hyperliquid",
        image: "/landing-page/images/roadmap/hyperliquid.png",
      },
    ],
  },
  {
    time: "2025 Q2",
    items: [
      {
        position: "right",
        label: "Telegram",
        image: "/landing-page/images/roadmap/telegram.png",
      },
      {
        position: "left",
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
        position: "left",
        label: "iOS",
        image: "/landing-page/images/roadmap/ios.png",
      },
      {
        position: "right",
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
      <div className="relative w-full max-w-4xl mx-auto px-4 py-12">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[10px] bg-pink-500 transform -translate-x-1/2">
          <Line />
        </div>

        {/* Timeline content */}
        <div className="relative">
          {timelineData.map((period, index) => (
            <div key={period.time} className="relative">
              {/* Year marker */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-white px-4 py-1 rounded-full shadow-md">
                <p className="text-primary font-bold">{period.time}</p>
              </div>

              {/* Grid for timeline items */}
              <div
                className="flex flex-col items-center"
                style={{
                  height: `${((period.items.length || 2) - 1) * 410}px`,
                }}
              >
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
    <div
      className={cn(
        "flex flex-row gap-2",
        position === "right" ? " -translate-x-1/2" : "translate-x-1/2",
        "w-full max-w-[200px]"
      )}
    >
      {position === "left" && (
        <div className="bg-primary w-[130px] h-[8px] mr-[24px]" />
      )}
      <div className={cn("flex flex-col items-center")}>
        <p className="absolute bottom-2 left-2 text-white font-bold text-lg shadow-sm">
          {label}
        </p>
        <Image src={image} alt={label} fill className="object-cover" />
      </div>
      {position === "right" && (
        <div className="bg-primary w-[130px] h-[8px] ml-[24px]" />
      )}
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
        height="50%"
        viewBox="0 0 11 50%"
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="50%"
        viewBox="0 0 11 50%"
        fill="none"
      >
        <path
          d="M10.6499 0.37793L0.34375 87.4679V1135L10.6499 1074.9V0.37793Z"
          fill="url(#roadmap_paint0_linear_6415_3416)"
        />
        <defs>
          <linearGradient
            id="roadmap_paint0_linear_6415_3416"
            x1="5.4968"
            y1="0.37793"
            x2="5.4968"
            y2="1135"
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
