import { ZERO_ADDRESS } from "@/constants/chain";
import { PGF_FACTORY_CONTRACT_ADDRESS } from "@/constants/pgf";
import { config } from "@/constants/wagmiConfig";
import PGF_FACTORY_CONTRACT_ABI_JSON from "@/services/contract/abi/pgf-factory-abi.json";
import {
  getAcrossRoute,
  getMulticallHandlerAddress,
  isAcrossSupported,
  getLimits,
} from "@/services/contract/across";
import { AcrossRouteInfo, PGFToken } from "@/services/contract/types";
import {
  createAcrossClient,
  TransactionProgress,
} from "@across-protocol/app-sdk";
import { useEffect, useState } from "react";
import { Address, encodeFunctionData, TransactionReceipt } from "viem";
import { useAccount, useWalletClient } from "wagmi";

export function useAcrossRouteInfo(chainId: number | undefined) {
  const [isSupported, setIsSupported] = useState(false);
  const [routeInfo, setRouteInfo] = useState<AcrossRouteInfo | undefined>(
    undefined
  );
  const [limits, setLimits] = useState<any | undefined>(undefined);
  useEffect(() => {
    const getRouteInfo = async () => {
      const routeInfo = await getAcrossRoute(chainId!);
      setRouteInfo(routeInfo);
      // console.log("routeInfo", routeInfo);
      const supported = await isAcrossSupported(chainId!);
      setIsSupported(supported);
      // console.log("supported", supported);
      if (routeInfo) {
        const limits = await getLimits(routeInfo);
        // console.log("limits", limits);
        setLimits(limits);
      }
    };
    if (chainId) getRouteInfo();
  }, [chainId]);

  return { routeInfo, isSupported, limits };
}

const client = createAcrossClient({
  integratorId: "0xdead", // 2-byte hex string
  chains: config.chains,
  useTestnet: true,
});

export function useAcrossSDKBuy(token: PGFToken) {
  const account = useAccount();
  const { data: wallet } = useWalletClient();
  const [acrossInfoPending, setAcrossInfoPending] = useState(false);
  const [progress, setProgress] = useState<TransactionProgress | undefined>(
    undefined
  );

  const buy = async (
    routeInfo: AcrossRouteInfo,
    inputAmount: bigint,
    referral: Address | undefined
  ) => {
    if (!account || !account.address || !wallet) return;
    if (!routeInfo) return;

    const generateBuyCallData = (inputAmount: bigint) => {
      return encodeFunctionData({
        abi: PGF_FACTORY_CONTRACT_ABI_JSON.abi,
        functionName: "buy",
        args: [token.contractAddress, BigInt(0), referral || ZERO_ADDRESS],
      });
    };

    const route = {
      originChainId: routeInfo.originChainId,
      destinationChainId: routeInfo.destinationChainId,
      inputToken: routeInfo.originToken,
      outputToken: routeInfo.destinationToken,
      isNative: routeInfo.isNative,
    };
    const buyMessage = {
      actions: [
        {
          target: PGF_FACTORY_CONTRACT_ADDRESS,
          callData: generateBuyCallData(inputAmount),
          value: inputAmount,
          // we only update the calldata since the unwrap call is non-payable, but we DO care about the output amount.
          // update: (amount: bigint) => {
          //   return {
          //     callData: generateBuyCallData(amount),
          //   };
          // },
        },
      ],
      fallbackRecipient: account.address,
    };
    // console.log("buyMessage", route, buyMessage);

    setAcrossInfoPending(true);
    const quote = await client.getQuote({
      route,
      inputAmount,
      recipient: getMulticallHandlerAddress(routeInfo.originChainId),
      crossChainMessage: buyMessage,
    });
    console.log("quote", quote);
    setAcrossInfoPending(false);

    await client.executeQuote({
      walletClient: wallet,
      deposit: quote.deposit, // returned by `getQuote`
      onProgress: (progress) => {
        console.log("progress", progress);
        setProgress(progress);
        if (progress.step === "approve" && progress.status === "txSuccess") {
          // if approving an ERC20, you have access to the approval receipt
          const { txReceipt } = progress;
        }
        if (progress.step === "deposit" && progress.status === "txSuccess") {
          // once deposit is successful you have access to depositId and the receipt
          const { depositId, txReceipt } = progress;
        }
        if (progress.step === "fill" && progress.status === "txSuccess") {
          // if the fill is successful, you have access the following data
          const { fillTxTimestamp, txReceipt, actionSuccess } = progress;
          // actionSuccess is a boolean flag, telling us if your cross chain messages were successful
        }
      },
    });
  };

  return {
    buy,
    progress,
    isPending: acrossInfoPending || progress?.status === "txPending",
    isSuccess: progress?.step === "fill" && progress?.status === "txSuccess",
    transactionReceipt:
      progress?.step === "fill" && progress?.status === "txSuccess"
        ? progress?.txReceipt
        : undefined,
  };
}
