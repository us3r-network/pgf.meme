"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getChain } from "@/lib/onchain";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  Chain,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
} from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";

const chains = [mainnet, arbitrum, base, optimism];

const SwitchChains = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { chain: defaultChain } = useAccount();
  const [selectedChain, setSelectedChain] = useState(defaultChain);
  const { switchChain, status: switchChainStatus } = useSwitchChain();
  if (!selectedChain) return null;
  return (
    <Select
      onValueChange={async(value) => {
        await switchChain({ chainId: Number(value) });
        setSelectedChain(getChain(Number(value)));
      }}
      value={selectedChain?.id.toString()}
    >
      <SelectTrigger className="bg-secondary rounded-r-none text-white px-2">
        <TokenInfo token={selectedChain.nativeCurrency} chain={selectedChain} />
      </SelectTrigger>
      <SelectContent
        className={cn(
          "flex flex-col gap-4 border-4 border-secondary p-4 text-secondary",
          className
        )}
        {...props}
      >
        <div className="flex flex-row items-center gap-4 text-2xl mb-2">
          <img className="size-4" src="/images/switchChain.png" />
          <div>Swap across networks</div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
          {chains
            .filter((chain) => chain !== selectedChain)
            .map((chain) => (
              <SelectItem
                value={chain.id.toString()}
                className="cursor-pointer p-0"
              >
                <TokenInfo token={chain.nativeCurrency} chain={chain} />
              </SelectItem>
            ))}
        </div>
      </SelectContent>
    </Select>
  );
});
export default SwitchChains;

export function TokenInfo({ token, chain }: { token: any; chain?: Chain }) {
  console.log("token", token, chain);
  return (
    <div className="flex flex-row items-center gap-2">
      <img
        className="size-8"
        src={
          token.contractAddress
            ? token.logoURI
            : chain === mainnet || chain === sepolia
            ? "/images/nativeToken/mainnet.png"
            : chain === arbitrum || chain === arbitrumSepolia
            ? "/images/nativeToken/arbitrum.png"
            : chain === base || chain === baseSepolia
            ? "/images/nativeToken/base.png"
            : chain === optimism || chain === optimismSepolia
            ? "/images/nativeToken/optimism.png"
            : null
        }
      />
      <div className="text-2xl">{token.symbol}</div>
    </div>
  );
}
