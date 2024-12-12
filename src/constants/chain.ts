import { getChain } from "@/lib/onchain";
import { Address } from "viem";
import { base, baseSepolia } from "viem/chains";

export const TESTNET = process.env.NEXT_PUBLIC_TESTNET === "true";

export const DEFAULT_CHAINID: number = TESTNET ? baseSepolia.id : base.id;
export const DEFAULT_CHAIN = getChain(DEFAULT_CHAINID);

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const NATIVE_TOKEN_ADDRESS: Address =
  (process.env.EXPO_PUBLIC_NATIVE_TOKEN_ADDRESS as Address) ||
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"; //ETH
export const WRAP_NATIVE_TOKEN_ADDRESS: Address =
  (process.env.EXPO_PUBLIC_WRAP_NATIVE_TOKEN_ADDRESS as Address) ||
  "0x4200000000000000000000000000000000000006"; //ETH

export const NATIVE_TOKEN_METADATA = {
  chainId: DEFAULT_CHAINID,
  address: NATIVE_TOKEN_ADDRESS,
  name: DEFAULT_CHAIN.nativeCurrency.name,
  decimals: DEFAULT_CHAIN.nativeCurrency.decimals,
  symbol: DEFAULT_CHAIN.nativeCurrency.symbol,
  logoURI:
    "https://assets.coingecko.com/coins/images/31013/large/wrapped-eth-mantle-bridge.png",
};

export const WRAP_NATIVE_TOKEN_METADATA = {
  chainId: DEFAULT_CHAINID,
  address: WRAP_NATIVE_TOKEN_ADDRESS,
  name: DEFAULT_CHAIN.nativeCurrency.name,
  decimals: DEFAULT_CHAIN.nativeCurrency.decimals,
  symbol: DEFAULT_CHAIN.nativeCurrency.symbol,
  logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
};
