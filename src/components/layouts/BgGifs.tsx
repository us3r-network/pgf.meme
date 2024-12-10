import { cn } from "@/lib/utils";
import Image from "next/image";

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
            {Array.from({ length: rowIndex % 2 === 0 ? 5 : 6 }).map(
              (_, colIndex) => (
                <div key={colIndex} className="w-[140px] h-[140px]">
                  {rowIndex % 2 === 0 ? (
                    <Image
                      src="/images/Vitalik-unscreen.gif"
                      alt="Vitalik"
                      width={140}
                      height={140}
                      unoptimized
                    />
                  ) : (
                    <Image
                      src="/images/Toly-unscreen.gif"
                      alt="Toly"
                      width={140}
                      height={140}
                      unoptimized
                    />
                  )}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
