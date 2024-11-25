import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { Address } from "viem";
import MerkleDistributorAbi from "@/services/contract/abi/merkle-distributor.json";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const MERKLE_DISTRIBUTOR_CONTRACT_CHAIN_ID: number = PGF_CONTRACT_CHAIN_ID;
const MERKLE_DISTRIBUTOR_CONTRACT_ADDRESS: Address = process.env
  .NEXT_PUBLIC_MERKLE_DISTRIBUTOR_CONTRACT_ADDRESS as unknown as Address;

const contract = {
  abi: MerkleDistributorAbi,
  address: MERKLE_DISTRIBUTOR_CONTRACT_ADDRESS,
  chainId: MERKLE_DISTRIBUTOR_CONTRACT_CHAIN_ID,
};
export function useClaim() {
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
  const claim = ({
    token,
    index,
    account,
    amount,
    merkleProof,
  }: {
    token: Address;
    index: number;
    account: Address;
    amount: bigint;
    merkleProof: string[];
  }) => {
    writeContract({
      ...contract,
      functionName: "claim",
      args: [token, index, account, amount, merkleProof],
    });
  };

  return {
    claim,
    transactionReceipt,
    status,
    writeError,
    transationError,
    isPending: writePending || transactionPending,
    isSuccess,
  };
}
