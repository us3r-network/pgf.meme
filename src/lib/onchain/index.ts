import { config } from "@/constants/wagmiConfig";

/**
 * Gets the chain object for the given chain id.
 * @param chainId - Chain id of the target EVM chain.
 * @returns Viem's chain object.
 */
export function getChain(chainId: number) {
  // console.log("all chains", config.chains);
  for (const chain of Object.values(config.chains)) {
    if (chain.id === chainId) {
      return chain;
    }
  }
  throw new Error(`Chain with id ${chainId} not found`);
}

export function getBlockExploreTxUrl(chainId: number, txHash: string) {
  const chain = getChain(chainId);
  return `${chain.blockExplorers.default.url}/tx/${txHash}`;
}

export const getEvmChainName = (chainId: number) => {
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

export function getScanUrl(chainId: number | "sol", address: string) {
  if (chainId === "sol") {
    return `https://solscan.io/token/${address}`;
  }
  const chain = getChain(chainId);
  return `${chain.blockExplorers.default.url}/address/${address}`;
}

export function getDexTokenUrl(chainId: number | "sol", address: string) {
  if (chainId === "sol") {
    return `https://dexscreener.com/solana/${address}`;
  }
  const chain = getEvmChainName(chainId);
  if (!chain) {
    return "";
  }
  return `https://dexscreener.com/${chain}/${address}`;
}
export function getDexTokenWidgetUrl(
  chainId: number | "sol",
  poolAddress: string
) {
  if (chainId === "sol") {
    return `https://dexscreener.com/solana/${poolAddress}?embed=1&info=0`;
  }
  const chain = getEvmChainName(chainId);
  if (!chain) {
    return "";
  }
  return `https://dexscreener.com/${chain}/${poolAddress}?embed=1&info=0`;
}
export function getGmgnTokenUrl(chainId: number | "sol", address: string) {
  if (chainId === "sol") {
    return `https://gmgn.ai/sol/token/${address}`;
  }
  const chain = getEvmChainName(chainId);
  if (!chain) {
    return "";
  }
  return `https://gmgn.ai/${chain}/token/${address}`;
}

export const dexscreenerIconUrl = "https://dexscreener.com/favicon.ico";
// export const gmgnIconUrl = "https://gmgn.ai/static/favicon2.ico";
// export const solscanIconUrl = "https://solscan.io/favicon.png";
export const gmgnIconUrl = "/images/gmgn-icon.png";
export const solscanIconUrl = "/images/solscan-icon.png";
