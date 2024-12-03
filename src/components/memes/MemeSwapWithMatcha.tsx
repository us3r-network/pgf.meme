"use client";
import { PGFToken } from "@/services/contract/types";

export default function MemeSwapWithMatcha({ token }: { token: PGFToken }) {
  return (
    <div className="w-full h-full">
      <iframe
        className="w-full h-full"
        src="https://matcha.xyz/trade?buyAddress=0x2866F53bD9CFcaD8F71115df6203b065A3496ba0&buyChain=8453&ref=castcoin&swapFeeBps=15"
      ></iframe>
    </div>
  );
}
