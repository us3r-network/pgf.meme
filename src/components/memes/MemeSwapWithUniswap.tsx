"use client";
import {
  NATIVE_TOKEN_METADATA,
  WRAP_NATIVE_TOKEN_METADATA,
} from "@/constants/chain";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { config } from "@/constants/wagmiConfig";
import { getTokenInfo } from "@/hooks/contract/useERC20Contract";
import { getEthersProvider } from "@/lib/onchain/ethers";
import { PGFToken } from "@/services/contract/types";
import { SwapWidget, Theme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { useEffect, useState } from "react";

export default function MemeSwapWithUniswap({ token }: { token: PGFToken }) {
  const provider = getEthersProvider(config);
  const [tokenInfo, setTokenInfo] = useState<PGFToken>();
  useEffect(() => {
    getTokenInfo({
      contractAddress: token.contractAddress,
      chainId: token.chainId,
    }).then((info) => {
      setTokenInfo(info);
    });
  }, [token]);

  const tokenList = tokenInfo
    ? [
        NATIVE_TOKEN_METADATA,
        WRAP_NATIVE_TOKEN_METADATA,
        {
          name: tokenInfo.name || "",
          symbol: tokenInfo.symbol || "",
          decimals: tokenInfo.decimals || 0,
          chainId: tokenInfo.chainId || 0,
          address: tokenInfo.contractAddress,
          logoURI: tokenInfo.logoURI,
        },
      ]
    : [];
  const theme: Theme = {
    container: "transparent",
    outline: "transparent",
    deepShadow: "transparent",
  };
  // console.log("MY_TOKEN_LIST", tokenList, provider);
  if (!tokenInfo) {
    return (
      <div className="h-full w-full  flex items-center justify-center">
        <p className="">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <SwapWidget
        // provider={provider as any} // Type assertion to fix provider type mismatch
        theme={theme}
        width="100%"
        className="bg-transparent h-full"
        brandedFooter={false}
        tokenList={tokenList}
        defaultChainId={PGF_CONTRACT_CHAIN_ID}
        defaultInputTokenAddress={NATIVE_TOKEN_METADATA.address} // Use provided amount or default to 2n
        defaultOutputTokenAddress={tokenInfo.contractAddress}
      />
    </div>
  );
}
