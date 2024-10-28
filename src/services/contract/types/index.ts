import { Address } from "viem";

export type PGFToken = {
  contractAddress: Address;
  chainId: number;
  name?: string;
  symbol?: string;
  decimals?: number;
  balance?: number;
  rawBalance?: bigint;
  image?: string;
  description?: string;
};
