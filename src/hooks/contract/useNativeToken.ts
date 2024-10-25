import { useBalance } from "wagmi";

export function useNativeToken(
  address: `0x${string}` | undefined,
  chainId: number
) {
  if (!address || !chainId) return { token: undefined };
  // console.log("useUserNativeToken", address, chainId);
  const { data, refetch } = useBalance({
    address,
    chainId,
  });
  return { data, refetch };
}
