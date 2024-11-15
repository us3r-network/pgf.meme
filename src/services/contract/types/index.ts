import { Address } from "viem";

export type PGFToken = {
  contractAddress: Address;
  chainId: number;
  name?: string;
  symbol?: string;
  decimals?: number;
  balance?: number;
  rawBalance?: bigint;
  logoURI?: string;
  imageFile?: File;
  description?: string;
  topicId?: number;
};

export type AcrossRouteInfo = {
    originChainId: number;
    originToken: Address;
    destinationChainId: number;
    destinationToken: Address;
    originTokenSymbol: string;
    destinationTokenSymbol: string;
    isNative: boolean;
}