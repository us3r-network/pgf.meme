import { NATIVE_TOKEN_ADDRESS } from "@/constants/chain";
import { getChain } from "@/lib/onchain";
import { Address, createPublicClient, formatUnits, http } from "viem";
import { useBalance } from "wagmi";

export function useNativeToken(address: Address | undefined, chainId: number) {
  if (!chainId) return { data: undefined };
  if (!address)
    return { data: { ...getChain(chainId).nativeCurrency, value: 0n } };
  // console.log("useUserNativeToken", address, chainId);
  const { data, refetch } = useBalance({
    address,
    chainId,
  });
  return { data, refetch };
}

export async function getNativeTokenInfo({
  chainId,
  account,
}: {
  chainId: number | undefined;
  account?: Address;
}) {
  if (!chainId) return undefined;
  const chain = getChain(chainId);
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  });
  const rawBalance = account
    ? await publicClient.getBalance({
        address: account,
      })
    : undefined;
  return {
    ...chain.nativeCurrency,
    contractAddress: NATIVE_TOKEN_ADDRESS,
    chainId,
    rawBalance,
    balance: rawBalance
      ? Number(formatUnits(rawBalance, chain.nativeCurrency.decimals))
      : undefined,
  };
}
