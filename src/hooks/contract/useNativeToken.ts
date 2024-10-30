import { getChain } from "@/lib/onchain";
import { useBalance } from "wagmi";

export function useNativeToken(
  address: `0x${string}` | undefined,
  chainId: number
) {
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
