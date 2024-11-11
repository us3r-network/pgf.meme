import { Button } from "@/components/ui/button";
import { PGF_CONTRACT_CHAIN, PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { getTokenInfo } from "@/hooks/contract/useERC20Contract";
import { useNativeToken } from "@/hooks/contract/useNativeToken";
import {
  useOutTokenAmountAfterFee,
  usePGFFactoryContractBuy,
} from "@/hooks/contract/usePGFFactoryContract";
import { toast } from "@/hooks/use-toast";
import { PGFToken } from "@/services/contract/types";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { TokenAmountInput } from "./TokenAmountInput";

const MIN_IN_AMOUNT = 0.001;
export function BuyMemeForm({ token }: { token: PGFToken }) {
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

  // console.log("tokens in buy", nativeTokenInfo, tokenInfo);
  const [inAmount, setInAmount] = useState(0n);

  const [debouncedInAmount] = useDebounce(inAmount, 500);
  const { outAmount } = useOutTokenAmountAfterFee(token, debouncedInAmount);

  const {
    buy,
    transactionReceipt,
    status,
    writeError,
    transationError,
    isPending,
    isSuccess,
  } = usePGFFactoryContractBuy(token);

  const onSubmit = () => {
    if (inAmount && outAmount) buy(inAmount, outAmount);
  };

  useEffect(() => {
    if (isSuccess && transactionReceipt && tokenInfo) {
      toast({
        title: "Buy Token",
        description: (
          <pre className="m-2 w-80 p-4">
            <p>
              Buy{" "}
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(
                Number(formatUnits(outAmount!, tokenInfo.decimals!))
              )}{" "}
              {tokenInfo.symbol}
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
      console.log("Buy token failed", writeError, transationError);
      toast({
        title: "Buy Token",
        variant: "destructive",
        description: (
          <pre className="m-2 w-80 p-4">
            <p>Buy token failed!</p>
            <p>{writeError?.message || transationError?.message}</p>
          </pre>
        ),
      });
    }
  }, [writeError, transationError]);

  return (
    <div className="flex-col justify-start items-start gap-8 inline-flex w-full">
      <TokenAmountInput
        chainId={token.chainId}
        onChange={(value) => setInAmount(value)}
        minAmount={MIN_IN_AMOUNT}
      />
      <div className="w-full flex flex-col gap-2 justify-start items-start">
        <Button
          size="lg"
          className="w-full"
          onClick={onSubmit}
          disabled={isPending || !inAmount || !outAmount || !account.address}
        >
          {isPending ? "Confirming ..." : "Buy"}
        </Button>
        {nativeTokenInfo?.decimals &&
          nativeTokenInfo?.symbol &&
          tokenInfo?.decimals &&
          tokenInfo?.symbol &&
          inAmount && (
            <div className="text-sm w-full text-center">
              {outAmount
                ? `Buy 
              ${new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(Number(formatUnits(inAmount, tokenInfo.decimals!)))} 
              ${tokenInfo?.symbol} with 
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
