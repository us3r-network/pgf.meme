import { ZERO_ADDRESS } from "@/constants/chain";
import {
  PGF_CONTRACT_CHAIN_ID,
  PGF_FACTORY_CONTRACT_ADDRESS,
} from "@/constants/pgf";
import { SPOKE_ABI } from "@/services/contract/abi/spoke-abi";
import {
  getAcrossRoute,
  getFee,
  getSpokeContractAddress,
} from "@/services/contract/across";
import { PGFToken } from "@/services/contract/types";
import { useState } from "react";
import { Address, encodeAbiParameters, formatUnits } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

export function useAcrossContractBuy(token: PGFToken) {
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
  const account = useAccount();
  const [acrossInfoPending, setAcrossInfoPending] = useState(false);
  const buy = async (
    chainId: number,
    inAmount: bigint,
    outAmount: bigint,
    referral: Address | undefined
  ) => {
    // console.log(
    //   "buy token through across",
    //   token,
    //   inAmount,
    //   outAmount,
    //   referral,
    //   chainId
    // );
    if (!account || !account.address) return;
    setAcrossInfoPending(true);
    const acrossRouteInfo = await getAcrossRoute(chainId);
    if (!acrossRouteInfo) return;
    // console.log("across route info", acrossRouteInfo);
    const [fee, timestamp] = await getFee(acrossRouteInfo, inAmount);
    console.log(
      "across fee",
      `${Number(
        formatUnits(fee, account.chain?.nativeCurrency.decimals || 18)
      )} ${account.chain?.nativeCurrency.symbol}`
    );
    setAcrossInfoPending(false);
    const acrossContract = {
      abi: SPOKE_ABI,
      address: getSpokeContractAddress(chainId),
      chainId,
    };
    writeContract({
      ...acrossContract,
      functionName: "depositV3",
      args: [
        account.address,
        PGF_FACTORY_CONTRACT_ADDRESS, // pgfFactory address
        acrossRouteInfo.originToken, // base weth address
        acrossRouteInfo.destinationToken, // ethereum weth address
        inAmount,
        inAmount - BigInt(fee),
        PGF_CONTRACT_CHAIN_ID,
        ZERO_ADDRESS,
        timestamp,
        timestamp + 32400,
        0,
        encodeAbiParameters(
          [
            { name: "buyer", type: "address" },
            { name: "token", type: "address" },
            { name: "min", type: "uint256" },
            { name: "referral", type: "address" },
          ],
          [
            account.address,
            token.contractAddress,
            BigInt(0),
            referral || ZERO_ADDRESS,
          ]
        ),
      ],
      account: account.address,
      value: inAmount,
    });
  };

  return {
    buy,
    transactionReceipt,
    status,
    writeError,
    transationError,
    isPending: writePending || transactionPending || acrossInfoPending,
    isSuccess,
  };
}
