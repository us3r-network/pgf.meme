import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
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
import { formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";

const MIN_IN_AMOUNT = "0.001";
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
  const [inAmount, setInAmount] = useState(
    nativeTokenInfo?.value
      ? nativeTokenInfo.value / 10n
      : parseUnits("0.01", nativeTokenInfo?.decimals || 18)
  );

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
    if (isSuccess && transactionReceipt && tokenInfo && nativeTokenInfo) {
      toast({
        title: "Buy Token",
        description: (
          <pre className="mt-2 w-[340px] p-4">
            <p>
              Buy{" "}
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(
                Number(formatUnits(outAmount!, tokenInfo.decimals!))
              )}{" "}
              {tokenInfo.symbol} with{" "}
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(
                Number(formatUnits(inAmount!, nativeTokenInfo.decimals))
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
      console.log("Buy token failed", writeError, transationError);
      toast({
        title: "Buy Token",
        variant: "destructive",
        description: (
          <pre className="mt-2 w-[340px] p-4">
            <p>Buy token failed!</p>
            <p>{writeError?.message || transationError?.message}</p>
          </pre>
        ),
      });
    }
  }, [writeError, transationError]);

  const onInputChange = (v: string) => {
    if (Number(v) >= 0) {
      setInAmount(parseUnits(v, nativeTokenInfo?.decimals || 18));
    }
  };
  return (
    <div className="flex-col justify-start items-start gap-8 inline-flex w-full">
      <div className="self-stretch justify-start items-center gap-4 inline-flex">
        {nativeTokenInfo?.decimals && (
          <Input
            value={formatUnits(inAmount, nativeTokenInfo.decimals)}
            onChange={(e) => onInputChange(e.target.value)}
            className="grow shrink basis-0 h-12 px-[29px] rounded-xl border border-[#16181d] text-[#626976] text-base font-normal leading-snug"
          />
        )}
        <div className="text-[#16181d] text-2xl font-normal leading-[33.60px]">
          {nativeTokenInfo?.symbol}
        </div>
      </div>
      {nativeTokenInfo &&
        nativeTokenInfo.value &&
        nativeTokenInfo.decimals &&
        nativeTokenInfo.value >
          parseUnits(MIN_IN_AMOUNT, nativeTokenInfo.decimals || 18) && (
          <Slider
            value={[Number(formatUnits(inAmount, nativeTokenInfo.decimals))]}
            onValueChange={(v) => onInputChange(v[0].toString())}
            min={Number(MIN_IN_AMOUNT)}
            max={Number(
              formatUnits(nativeTokenInfo.value, nativeTokenInfo.decimals)
            )}
            step={
              Number(
                formatUnits(nativeTokenInfo.value, nativeTokenInfo.decimals)
              ) / 100
            }
            className="h-6"
          />
        )}
      <div className="self-stretch h-12 justify-start items-center gap-10 inline-flex">
        {tokenInfo?.decimals && tokenInfo?.symbol && (
          <Button
            className="grow shrink basis-0 h-12 px-4 py-3 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex"
            onClick={onSubmit}
            disabled={isPending || !inAmount || !outAmount || !account.address}
          >
            {isPending ? (
              <div className="text-[#fefaf6]">Confirming ...</div>
            ) : outAmount ? (
              <div className="text-[#fefaf6] text-xl font-bold">
                Buy{" "}
                {new Intl.NumberFormat("en-US", {
                  notation: "compact",
                }).format(
                  Number(formatUnits(outAmount, tokenInfo.decimals))
                )}{" "}
                {tokenInfo?.symbol}
              </div>
            ) : (
              <div className="text-[#fefaf6]">Fetching Price ...</div>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
