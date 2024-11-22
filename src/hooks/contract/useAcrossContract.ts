import { ZERO_ADDRESS } from "@/constants/chain";
import {
  PGF_CONTRACT_CHAIN_ID,
  PGF_FACTORY_CONTRACT_ADDRESS,
} from "@/constants/pgf";
import { SPOKE_ABI } from "@/services/contract/abi/spoke-abi";
import {
  getAcrossRoute,
  getDepositStatus,
  getFee,
  getSpokeContractAddress,
  isAcrossSupported,
} from "@/services/contract/across";
import {
  AcrossDepositStatus,
  AcrossRouteInfo,
  PGFToken,
} from "@/services/contract/types";
import { useEffect, useState } from "react";
import { Address, encodeAbiParameters, formatUnits } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

export function useAcrossRouteInfo(chainId: number | undefined) {
  const [isSupported, setIsSupported] = useState(false);
  const [routeInfo, setRouteInfo] = useState<AcrossRouteInfo | undefined>(
    undefined
  );
  useEffect(() => {
    const getRouteInfo = async () => {
      const routeInfo = await getAcrossRoute(chainId!);
      setRouteInfo(routeInfo);
      console.log("routeInfo", routeInfo);
      const supported = await isAcrossSupported(chainId!);
      setIsSupported(supported);
      console.log("supported", supported);
    };
    if (chainId) getRouteInfo();
  }, [chainId]);

  return { routeInfo, isSupported };
}

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
    routeInfo: AcrossRouteInfo,
    inAmount: bigint,
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
    if (!routeInfo) return;
    // console.log("across route info", acrossRouteInfo);
    const [fee, timestamp] = await getFee(routeInfo, inAmount);
    console.log(
      "across fee",
      `${Number(
        formatUnits(fee, account.chain?.nativeCurrency.decimals || 18)
      )} ${account.chain?.nativeCurrency.symbol}`
    );
    setAcrossInfoPending(false);
    const acrossContract = {
      abi: SPOKE_ABI,
      address: getSpokeContractAddress(routeInfo.originChainId),
      chainId: routeInfo.originChainId,
    };
    writeContract({
      ...acrossContract,
      functionName: "depositV3",
      args: [
        account.address,
        PGF_FACTORY_CONTRACT_ADDRESS, // pgfFactory address
        routeInfo.originToken, // originChain eth address
        routeInfo.destinationToken, // ethereum eth address
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

export function useAcrossDepositState(
  depositId: number | undefined,
  chainId: number | undefined
) {
  const [status, setStatus] = useState<AcrossDepositStatus | undefined>(
    undefined
  );
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (chainId && depositId) {
      interval = setInterval(() => {
        console.log("get deposit status", chainId, depositId);
        getDepositStatus(chainId, depositId).then((data) => {
          console.log("deposit status", data);
          setStatus(data);
          if (data.fillStatus === "filled") {
            clearInterval(interval);
          }
        });
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [depositId, chainId]);

  return { status };
}
