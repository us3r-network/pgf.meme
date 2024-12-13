"use client";
// import {
//   NATIVE_TOKEN_METADATA,
//   WRAP_NATIVE_TOKEN_METADATA,
// } from "@/constants/chain";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
// import { config } from "@/constants/wagmiConfig";
// import { getTokenInfo } from "@/hooks/contract/useERC20Contract";
import { getEvmChainName } from "@/lib/onchain";
import { cn } from "@/lib/utils";
// import { getEthersProvider } from "@/lib/onchain/ethers";
import { PGFToken } from "@/services/contract/types";
import { TokenData } from "@/services/meme/types";
import { useRef, useState } from "react";
// import { SwapWidget, Theme } from "@uniswap/widgets";
// import "@uniswap/widgets/fonts.css";
// import { useEffect, useState } from "react";

export default function MemeSwapWithUniswap({ token }: { token: TokenData }) {
  // const provider = getEthersProvider(config);
  // const [tokenInfo, setTokenInfo] = useState<PGFToken>();
  // useEffect(() => {
  //   getTokenInfo({
  //     contractAddress: token.contractAddress,
  //     chainId: token.chainId,
  //   })
  //     .then((info) => {
  //       setTokenInfo(info);
  //     })
  //     .catch((e) => {
  //       console.error("getTokenInfo error", e);
  //     });
  // }, [token]);

  // const tokenList = tokenInfo
  //   ? [
  //       NATIVE_TOKEN_METADATA,
  //       WRAP_NATIVE_TOKEN_METADATA,
  //       {
  //         name: tokenInfo.name || "",
  //         symbol: tokenInfo.symbol || "",
  //         decimals: tokenInfo.decimals || 0,
  //         chainId: tokenInfo.chainId || 0,
  //         address: tokenInfo.contractAddress,
  //         logoURI: tokenInfo.logoURI,
  //       },
  //     ]
  //   : [];
  // const theme: Theme = {
  //   container: "transparent",
  //   outline: "transparent",
  //   deepShadow: "transparent",
  // };
  // console.log("MY_TOKEN_LIST", tokenList, provider);
  // if (!tokenInfo) {
  //   return (
  //     <div className="h-full w-full  flex items-center justify-center">
  //       <p className="">Loading...</p>
  //     </div>
  //   );
  // }
  const loadingRef = useRef<HTMLDivElement>(null);
  return (
    <div className="w-full h-full relative">
      <iframe
        src={`https://app.uniswap.org/swap?outputCurrency=${
          token.tokenAddress
        }&chain=${getEvmChainName(PGF_CONTRACT_CHAIN_ID)}`}
        className={cn("w-full h-full")}
        onLoad={() => {
          if (loadingRef.current) {
            loadingRef.current.style.display = "none";
          }
        }}
      ></iframe>
      <div
        className="h-full w-full  flex items-center justify-center overflow-hidden absolute top-0 left-0 bg-white"
        ref={loadingRef}
      >
        <p className="">Loading...</p>
      </div>
      {/* Issues: https://github.com/Uniswap/widgets/issues/641 */}

      {/* <SwapWidget
        // provider={provider as any} // Type assertion to fix provider type mismatch
        theme={theme}
        width="100%"
        // className="bg-transparent"
        brandedFooter={false}
        tokenList={tokenList}
        defaultChainId={PGF_CONTRACT_CHAIN_ID}
        defaultInputTokenAddress={NATIVE_TOKEN_METADATA.address} // Use provided amount or default to 2n
        defaultOutputTokenAddress={tokenInfo.tokenAddress}
      /> */}
    </div>
  );
}
