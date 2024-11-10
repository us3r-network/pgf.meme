"use client";

import { MemeData } from "@/services/meme/types";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";

const getDextoolsChainId = (chainId: number) => {
  switch (chainId) {
    case 8453:
      return "base";
    case 11155111:
      return "sepolia";
    case 1:
      return "ether";
    default:
      return "";
  }
};
const getChartWidgetUrl = ({
  chainId,
  poolAddress,
}: {
  chainId: number;
  poolAddress: string;
}) => {
  const chainID = getDextoolsChainId(chainId);
  if (!chainID || !poolAddress) {
    return "";
  }
  return `https://www.geckoterminal.com/${chainID}/pools/${poolAddress}?embed=1&info=0&swaps=0&grayscale=1`;
  // return `https://www.dextools.io/widget-chart/en/${chainID}/pe-light/${poolAddress}?theme=dark&chartType=1&chartResolution=30&drawingToolbars=false&chartInUsd=true`;
};

export default function MemeChartGraduationAfter({ meme }: { meme: MemeData }) {
  const { address } = meme;
  const dexUrl = getChartWidgetUrl({
    chainId: PGF_CONTRACT_CHAIN_ID,
    poolAddress: meme.graduation?.poolAddress || "",
  });

  return <iframe className="w-full h-full" src={dexUrl} />;
}
