"use client";

import { MemeData } from "@/services/meme/types";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { getDextoolsChainName } from "@/lib/onchain";

const getChartWidgetUrl = ({
  chainId,
  poolAddress,
}: {
  chainId: number;
  poolAddress: string;
}) => {
  const chainName = getDextoolsChainName(chainId);
  if (!chainName || !poolAddress) {
    return "";
  }
  return `https://dexscreener.com/${chainName}/${poolAddress}?embed=1&info=0`;
  // return `https://www.dextools.io/widget-chart/en/${chainID}/pe-light/${poolAddress}?theme=dark&chartType=1&chartResolution=30&drawingToolbars=false&chartInUsd=true`;
};

export default function MemeChartGraduationAfter({ meme }: { meme: MemeData }) {
  const { address } = meme;
  const dexUrl = getChartWidgetUrl({
    chainId: PGF_CONTRACT_CHAIN_ID,
    poolAddress: meme.graduation?.poolAddress || "",
  });

  return <iframe className="w-full aspect-[1/1.3]" src={dexUrl} />;
}
