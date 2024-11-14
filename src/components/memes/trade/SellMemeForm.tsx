import { Button } from "@/components/ui/button";
import {
  PGF_CONTRACT_CHAIN,
  PGF_CONTRACT_CHAIN_ID,
  PGF_FACTORY_CONTRACT_ADDRESS,
} from "@/constants/pgf";
import { getTokenInfo } from "@/hooks/contract/useERC20Contract";
import { useNativeToken } from "@/hooks/contract/useNativeToken";
import {
  useOutEthAmountAfterFee,
  usePGFFactoryContractSell,
} from "@/hooks/contract/usePGFFactoryContract";
import { toast } from "@/hooks/use-toast";
import { PGFToken } from "@/services/contract/types";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import OnChainActionButtonWarper from "./OnChainActionButtonWarper";
import { TokenAmountInput } from "./TokenAmountInput";
import useSound from "use-sound";

const MIN_IN_AMOUNT = 10000;
export function SellMemeForm({
  token,
  onSuccess,
}: {
  token: PGFToken;
  onSuccess?: (transactionReceipt: any) => void;
}) {
  const account = useAccount();
  const { data: nativeTokenInfo } = useNativeToken(
    account?.address,
    PGF_CONTRACT_CHAIN_ID
  );
  const [tokenInfo, setTokenInfo] = useState<PGFToken>();
  useEffect(() => {
    getTokenInfo({
      contractAddress: token.contractAddress,
      chainId: token.chainId,
      account: account?.address,
    }).then((info) => {
      // console.log("token info", info);
      setTokenInfo(info);
    });
  }, [account]);

  const [inAmount, setInAmount] = useState(
    tokenInfo?.rawBalance
      ? tokenInfo.rawBalance
      : parseUnits("1000000", nativeTokenInfo?.decimals || 18)
  );

  const [debouncedInAmount] = useDebounce(inAmount, 500);
  const { outAmount } = useOutEthAmountAfterFee(token, debouncedInAmount);

  const {
    sell,
    transactionReceipt,
    status,
    writeError,
    transationError,
    isPending,
    isSuccess,
  } = usePGFFactoryContractSell(token);

  const [play] = useSound("/audio/V.mp3");
  const onSubmit = () => {
    if (inAmount && outAmount) {
      sell(inAmount, outAmount);
      play();
    }
  };

  useEffect(() => {
    if (isSuccess && transactionReceipt && tokenInfo && nativeTokenInfo) {
      onSuccess?.(transactionReceipt);
      toast({
        title: "Sell Token",
        description: (
          <pre className="m-2 w-80 p-4">
            <p>
              Sell{" "}
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(
                Number(formatUnits(inAmount!, tokenInfo.decimals!))
              )}{" "}
              {tokenInfo.symbol} and get{" "}
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(
                Number(formatUnits(outAmount!, nativeTokenInfo.decimals))
              )}{" "}
              {nativeTokenInfo.symbol}
            </p>
            {PGF_CONTRACT_CHAIN?.blockExplorers && (
              <p>
                <a
                  href={`${PGF_CONTRACT_CHAIN.blockExplorers.default.url}/tx/${transactionReceipt.transactionHash}`}
                  target="_blank"
                >
                  View Details
                </a>
              </p>
            )}
          </pre>
        ),
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (writeError || transationError) {
      console.log("Sell token failed", writeError, transationError);
      toast({
        title: "Sell Token",
        variant: "destructive",
        description: (
          <pre className="m-2 w-80 p-4">
            <p>Sell token failed!</p>
            <p>{writeError?.message || transationError?.message}</p>
          </pre>
        ),
      });
    }
  }, [writeError, transationError]);

  const allowanceParams =
    account?.address && token?.contractAddress && inAmount
      ? {
          owner: account.address,
          tokenAddress: token?.contractAddress,
          spender: PGF_FACTORY_CONTRACT_ADDRESS,
          value: inAmount,
        }
      : undefined;

  return (
    <div className="flex-col justify-start items-start gap-8 inline-flex w-full">
      <TokenAmountInput
        contractAddress={token.contractAddress}
        chainId={token.chainId}
        onChange={(value) => setInAmount(value)}
        minAmount={MIN_IN_AMOUNT}
      />
      <div className="w-full flex flex-col gap-2 justify-start items-start">
        <OnChainActionButtonWarper
          className="w-full"
          size="lg"
          targetChainId={PGF_CONTRACT_CHAIN_ID}
          allowanceParams={allowanceParams}
          warpedButton={
            <Button
              size="lg"
              className="w-full"
              onClick={onSubmit}
              disabled={
                isPending || !inAmount || !outAmount || !account.address
              }
            >
              {isPending ? "Confirming ..." : "Sell"}
            </Button>
          }
        />
        {nativeTokenInfo?.decimals &&
          nativeTokenInfo?.symbol &&
          tokenInfo?.decimals &&
          tokenInfo?.symbol &&
          inAmount && (
            <div className="text-sm w-full text-center">
              {outAmount
                ? `Sell 
              ${new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(Number(formatUnits(inAmount, tokenInfo.decimals!)))} 
              ${tokenInfo?.symbol} and get 
              ${new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(
                Number(formatUnits(outAmount!, nativeTokenInfo.decimals))
              )} 
              ${nativeTokenInfo.symbol}`
                : "Fetching Price..."}
            </div>
          )}
      </div>
    </div>
  );
}
