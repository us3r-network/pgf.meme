import { useEffect } from "react";
import { Address, erc20Abi, formatUnits } from "viem";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { readContracts } from "@wagmi/core";
import { config } from "@/constants/wagmiConfig";
import { getChain } from "@/lib/onchain";

const MAX_ALLOWANCE = BigInt(2) ** BigInt(256) - BigInt(1);

export function useERC20Approve({
  owner,
  tokenAddress,
  spender,
}: {
  owner: Address;
  tokenAddress: Address;
  spender: Address;
}) {
  // 1. Read from ERC20 contract. Does spender (0x Exchange Proxy) have an allowance?
  const { data: allowance, refetch } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [owner, spender],
  });

  // 2. (Only if no allowance): Write to ERC20, approve 0x Exchange Proxy to spend max integer
  const {
    writeContract,
    data: hash,
    isPending: writing,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    data: transactionReceipt,
    error: transationError,
    isLoading: waiting,
    isSuccess,
    status,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const approve = async (value?: bigint) => {
    writeContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, value || MAX_ALLOWANCE],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (writeError || transationError) {
      reset();
    }
  }, [writeError, transationError]);

  return {
    allowance,
    approve,
    refetch,
    writing,
    waiting,
  };
}

export function useERC20Transfer({
  contractAddress,
}: {
  contractAddress: Address;
}) {
  const {
    writeContract,
    data: hash,
    isPending,
    error,
    reset,
  } = useWriteContract();

  const {
    data: transactionReceipt,
    error: transationError,
    isLoading: transationLoading,
    isSuccess,
    status: transationStatus,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const transfer = async (to: Address, amount: bigint) => {
    console.log("transfer", to, amount, contractAddress);
    writeContract({
      address: contractAddress,
      abi: erc20Abi,
      functionName: "transfer",
      args: [to, amount],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error || transationError) {
      reset();
    }
  }, [error, transationError]);

  return {
    transfer,
    error,
    isPending,
    isSuccess,
    transactionReceipt,
    transationError,
    transationLoading,
    transationStatus,
  };
}

export async function getTokenInfo({
  contractAddress,
  chainId,
  logoURI,
  account,
}: {
  contractAddress: Address;
  chainId: number;
  logoURI?: string;
  account?: Address;
}) {
  if (!contractAddress || !chainId) return undefined;
  const chain = getChain(chainId);
  if (!chain) return undefined;
  const contract = {
    address: contractAddress,
    abi: erc20Abi,
    chainId: chain.id,
  };

  const contracts = [
    {
      ...contract,
      functionName: "name",
    },
    {
      ...contract,
      functionName: "symbol",
    },
    {
      ...contract,
      functionName: "decimals",
    },
  ];

  if (account) {
    contracts.push({
      ...contract,
      functionName: "balanceOf",
      args: [account],
    } as any);
  }
  console.log("contracts", contracts);

  const data = await readContracts(config, {
    contracts,
  });

  if (!data || data.length < (account ? 4 : 3)) return undefined;

  const hasError = data.some((d, i) => d.error && (account ? true : i < 3));
  if (hasError) return undefined;

  return {
    contractAddress,
    chainId,
    logoURI,
    name: data[0].result as string,
    symbol: data[1].result as string,
    decimals: data[2].result as number,
    rawBalance: account ? (data[3].result as bigint) : undefined,
    balance: account
      ? Number(
          formatUnits(
            data[3].result as bigint,
            data[2].result as unknown as number
          )
        )
      : undefined,
  };
}
