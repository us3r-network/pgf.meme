import { config } from "@/components/Providers";

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
