import {
  PGF_CONTRACT_CHAIN,
  PGF_CONTRACT_CHAIN_ID,
  PGF_FACTORY_CONTRACT_ADDRESS,
} from "@/constants/pgf";
import { PGFToken } from "@/services/contract/types";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import PGF_FACTORY_CONTRACT_ABI_JSON from "@/services/contract/abi/pgf-factory-abi.json";

const contract = {
  abi: PGF_FACTORY_CONTRACT_ABI_JSON.abi,
  address: PGF_FACTORY_CONTRACT_ADDRESS,
  chainId: PGF_CONTRACT_CHAIN_ID,
};

export const useOutTokenAmountAfterFee = (token: PGFToken, amount: bigint) => {
  const { data, status } = useReadContract({
    ...contract,
    functionName: "getOutTokenAmountAfterFee",
    args: [token.contractAddress, amount],
  });
  const outAmount = data ? ((data as any)[1] as bigint) : undefined;
  // console.log("getOutTokenAmountAfterFee", outAmount);
  return { outAmount, status };
};

export const useOutEthAmountAfterFee = (token: PGFToken, amount: bigint) => {
  const { data, status } = useReadContract({
    ...contract,
    functionName: "getOutEthAmountAfterFee",
    args: [token.contractAddress, amount],
  });
  const outAmount = data ? (data as bigint) : undefined;
  // console.log("getOutEthAmountAfterFee", outAmount);
  return { outAmount, status };
};

export function usePGFFactoryContractLaunch() {
  const {
    writeContract,
    data: hash,
    isPending: writePending,
    error: writeError,
  } = useWriteContract();
  const {
    data: transactionReceipt,
    error: transationError,
    isLoading: transactionPending,
    isSuccess,
    status,
  } = useWaitForTransactionReceipt({
    hash,
  });
  const launch = async (name: string, symbol: string) => {
    console.log("launch token", name, symbol, contract, PGF_CONTRACT_CHAIN);
    writeContract({
      ...contract,
      functionName: "launch",
      args: [name, symbol],
    });
  };

  return {
    launch,
    transactionReceipt,
    status,
    writeError,
    transationError,
    isPending: writePending || transactionPending,
    isSuccess,
  };
}

export function usePGFFactoryContractBuy(token: PGFToken) {
  const {
    writeContract,
    data: hash,
    isPending: writePending,
    error: writeError,
  } = useWriteContract();
  const {
    data: transactionReceipt,
    error: transationError,
    isLoading: transactionPending,
    isSuccess,
    status,
  } = useWaitForTransactionReceipt({
    hash,
  });
  const buy = async (inAmount: bigint, outAmount: bigint) => {
    console.log("buy token", token, inAmount, outAmount);
    writeContract({
      ...contract,
      functionName: "buy",
      args: [token.contractAddress, outAmount],
      value: inAmount,
    });
  };

  return {
    buy,
    transactionReceipt,
    status,
    writeError,
    transationError,
    isPending: writePending || transactionPending,
    isSuccess,
  };
}

export function usePGFFactoryContractSell(token: PGFToken) {
  const {
    writeContract,
    data: hash,
    isPending: writePending,
    error: writeError,
  } = useWriteContract();

  const sell = async (inAmount: bigint, outAmount: bigint) => {
    console.log("sell token", token, inAmount, outAmount);
    writeContract({
      ...contract,
      functionName: "sell",
      args: [token.contractAddress, inAmount, outAmount],
    });
  };

  const {
    data: transactionReceipt,
    error: transationError,
    isLoading: transactionPending,
    isSuccess,
    status,
  } = useWaitForTransactionReceipt({
    hash,
  });
  return {
    sell,
    transactionReceipt,
    status,
    writeError,
    transationError,
    isPending: writePending || transactionPending,
    isSuccess,
  };
}
