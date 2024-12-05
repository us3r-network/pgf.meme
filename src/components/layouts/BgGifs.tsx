import { cn } from "@/lib/utils";
import Image from "next/image";

const gifs = [
  { src: "/images/Vitalik-unscreen.gif", alt: "Vitalik" },
  { src: "/images/Toly-unscreen.gif", alt: "Toly" },
];

export default function BgGifs() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 -z-10 overflow-hidden mt-[80px] max-sm:mt-[70px]">
      <div className="min-w-screen min-h-screen flex flex-col justify-between gap-14 ">
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "flex flex-row items-center justify-around w-screen overflow-hidden",
              rowIndex % 2 === 0 ? "justify-around" : "justify-between"
            )}
          >
            {Array.from({ length: 5 }).map((_, colIndex) => (
              <div key={colIndex} className="w-[140px] h-[140px]">
                <Image
                  src={gifs[rowIndex % 2].src}
                  alt={gifs[rowIndex % 2].alt}
                  width={140}
                  height={140}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
