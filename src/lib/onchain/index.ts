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

export function getBlockExploreAddressUrl(chainId: number, address: string) {
  const chain = getChain(chainId);
  return `${chain.blockExplorers.default.url}/address/${address}`;
}

export const getDextoolsChainName = (chainId: number) => {
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

export function getDexscreenerTokenUrl(chainId: number, address: string) {
  const chain = getDextoolsChainName(chainId);
  if (!chain) {
    return "";
  }
  return `https://dexscreener.com/${chain}/${address}`;
}

export const dexscreenerIconUrl = "https://dexscreener.com/favicon.ico";
