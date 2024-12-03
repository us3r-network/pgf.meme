"use client";

import { useEffect, useState } from "react";
import HomeMemesRender from "./HomeMemesRender";
import useTopMemes from "@/hooks/meme/useTopMemes";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chainIdOptions = [
  { value: "base", label: "Base" },
  { value: "solana", label: "Solana" },
];
export default function HomeMemes() {
  const [chainId, setChainId] = useState<"base" | "solana">("base");
  const { items, loading, loadItems } = useTopMemes();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    loadItems(chainId);
  }, [mounted, chainId]);

  return (
    <Card className="w-full">
      <CardContent className="w-full flex-col gap-3 flex p-3">
        <div className="w-full justify-between items-center flex">
          <div className="flex-1  flex items-center gap-6 max-sm:gap-3 justify-between">
            <span className="text-2xl font-bold text-primary max-sm:text-2xl">
              🔥Top Volume
            </span>
            <Select
              onValueChange={(value) => {
                setChainId(value as "base" | "solana");
              }}
              value={chainId}
            >
              <SelectTrigger className="flex-1 bg-primary text-primary-foreground border-none text-2xl font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-primary text-primary-foreground">
                {chainIdOptions.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="  text-2xl font-bold"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <HomeMemesRender memes={items} chainId={chainId} />
      </CardContent>
    </Card>
  );
}
