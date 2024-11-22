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

export const supportedChains = process.env.NEXT_PUBLIC_TESTNET
  ? [sepolia, arbitrumSepolia, baseSepolia, optimismSepolia]
  : [mainnet, arbitrum, base, optimism];

const SwitchChains = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { chain: selectedChain } = useAccount();

  const { switchChain, status: switchChainStatus } = useSwitchChain();
  if (!selectedChain) return null;
  return (
    <Select
      onValueChange={async (value) => {
        console.log("select chain", value);
        await switchChain({ chainId: Number(value) });
      }}
      value={selectedChain?.id.toString()}
      disabled={switchChainStatus === "pending"}
    >
      <SelectTrigger className="bg-secondary rounded-r-none text-white px-2">
        <TokenInfo token={{...selectedChain.nativeCurrency, chainId: selectedChain.id}}  />
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
          {supportedChains
            .filter((chain) => chain !== selectedChain)
            .map((chain) => (
              <SelectItem
                value={chain.id.toString()}
                className="cursor-pointer p-0"
              >
                <TokenInfo token={{...chain.nativeCurrency, chainId: chain.id}} />
              </SelectItem>
            ))}
        </div>
      </SelectContent>
    </Select>
  );
});
export default SwitchChains;

export function TokenInfo({ token }: { token: any}) {
  return (
    <div className="flex flex-row items-center gap-2">
      {token.contractAddress ? (
        <img className="size-8" src={token.logoURI} />
      ) : (
        <ChainLogo chainId={token.chainId} />
      )}
      <div className="text-2xl">{token.symbol}</div>
    </div>
  );
}

export function ChainLogo({ chainId }: { chainId: number }) {
  return (
    <img
      className="size-8"
      src={
        chainId === mainnet.id || chainId === sepolia.id
          ? "/images/nativeToken/mainnet.png"
          : chainId === arbitrum.id || chainId === arbitrumSepolia.id
          ? "/images/nativeToken/arbitrum.png"
          : chainId === base.id || chainId === baseSepolia.id
          ? "/images/nativeToken/base.png"
          : chainId === optimism.id || chainId === optimismSepolia.id
          ? "/images/nativeToken/optimism.png"
          : undefined
      }
    />
  );
}
