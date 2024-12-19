"use client";
import { useSound } from "use-sound";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AudioBtn({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { sound, stop, pause }] = useSound("/audio/V.mp3", {
    interrupt: false,
  });
  useEffect(() => {
    sound?.on("play", () => setIsPlaying(true));
    sound?.on("stop", () => setIsPlaying(false));
    sound?.on("end", () => setIsPlaying(false));
    sound?.on("pause", () => setIsPlaying(false));
    return () => {
      if (sound) {
        sound.off("play");
        sound.off("stop");
        sound.off("end");
        sound.off("pause");
      }
    };
  }, [sound]);
  return (
    <Button
      className={cn(
        "p-0 m-0 w-[50px] h-[50px] bg-white hover:bg-white rounded-full",
        className
      )}
      onClick={() => {
        if (isPlaying) {
          stop();
        } else {
          play();
        }
      }}
    >
      {isPlaying ? <PlayingIcon /> : <StopIcon />}
    </Button>
  );
}

function PlayingIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      className={className}
    >
      <rect width="50" height="50" rx="25" fill="white" />
      <g opacity="0.12">
        <path
          d="M34.1 26.5556C36.8062 26.5556 39 24.2921 39 21.5C39 18.7079 36.8062 16.4444 34.1 16.4444V26.5556Z"
          fill="#FF1393"
        />
        <path
          d="M22.2 15H17.3C13.8206 15 11 17.9102 11 21.5C11 25.0899 13.8206 28 17.3 28H22.2L22.2 15Z"
          fill="#FF1393"
        />
      </g>
      <path
        d="M13.8 27.7003L16.0045 36.5968C16.0665 36.847 16.0975 36.9721 16.1342 37.0814C16.4924 38.1485 17.4449 38.8988 18.5579 38.9906C18.6719 39 18.7997 39 19.0553 39C19.3754 39 19.5355 39 19.6703 38.9868C21.003 38.8564 22.0577 37.7923 22.1869 36.4478C22.2 36.3118 22.2 36.1503 22.2 35.8273V15.6945M34.1 26.9941C36.8062 26.9941 39 24.7808 39 22.0505C39 19.3202 36.8062 17.1069 34.1 17.1069M22.55 15.6945H17.3C13.8206 15.6945 11 18.5402 11 22.0505C11 25.5609 13.8206 28.4066 17.3 28.4066H22.55C25.023 28.4066 28.0481 29.744 30.382 31.0276C31.7436 31.7764 32.4243 32.1508 32.8702 32.0957C33.2837 32.0446 33.5963 31.8573 33.8386 31.5155C34.1 31.147 34.1 30.4094 34.1 28.9344V15.1666C34.1 13.6916 34.1 12.9541 33.8386 12.5855C33.5963 12.2437 33.2837 12.0564 32.8702 12.0053C32.4243 11.9502 31.7436 12.3246 30.382 13.0735C28.0481 14.357 25.023 15.6945 22.55 15.6945Z"
        stroke="#FF1393"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function StopIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      className={className}
    >
      <rect width="50" height="50" rx="25" fill="white" />
      <g opacity="0.12">
        <path
          d="M34.1 26.5556C36.8062 26.5556 39 24.2921 39 21.5C39 18.7079 36.8062 16.4444 34.1 16.4444V26.5556Z"
          fill="#FF1393"
        />
        <path
          d="M22.2 15H17.3C13.8206 15 11 17.9102 11 21.5C11 25.0899 13.8206 28 17.3 28H22.2L22.2 15Z"
          fill="#FF1393"
        />
      </g>
      <path
        d="M13.8 27.7003L16.0045 36.5968C16.0665 36.847 16.0975 36.9721 16.1342 37.0814C16.4924 38.1485 17.4449 38.8988 18.5579 38.9906C18.6719 39 18.7997 39 19.0553 39C19.3754 39 19.5355 39 19.6703 38.9868C21.003 38.8564 22.0577 37.7923 22.1869 36.4478C22.2 36.3118 22.2 36.1503 22.2 35.8273V15.6945M34.1 26.9941C36.8062 26.9941 39 24.7808 39 22.0505C39 19.3203 36.8062 17.1069 34.1 17.1069M22.55 15.6945H17.3C13.8206 15.6945 11 18.5402 11 22.0505C11 25.5609 13.8206 28.4066 17.3 28.4066H22.55C25.023 28.4066 28.0481 29.744 30.382 31.0276C31.7436 31.7764 32.4243 32.1508 32.8702 32.0957C33.2837 32.0446 33.5963 31.8573 33.8386 31.5156C34.1 31.147 34.1 30.4094 34.1 28.9344V15.1666C34.1 13.6916 34.1 12.9541 33.8386 12.5855C33.5963 12.2437 33.2837 12.0564 32.8702 12.0053C32.4243 11.9502 31.7436 12.3246 30.382 13.0735C28.0481 14.357 25.023 15.6945 22.55 15.6945Z"
        stroke="#FF1393"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39 11L11 39M11 11L39 39"
        stroke="#FF1393"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
