import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
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
import { formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import OnChainActionButtonWarper from "./OnChainActionButtonWarper";

export function SellMemeForm({ token }: { token: PGFToken }) {
  const account = useAccount();
  const { data: nativeTokenInfo } = useNativeToken(
    account.address,
    PGF_CONTRACT_CHAIN_ID
  );
  const [tokenInfo, setTokenInfo] = useState<PGFToken>();
  useEffect(() => {
    if (account.address) {
      getTokenInfo({
        contractAddress: token.contractAddress,
        chainId: token.chainId,
        account: account.address,
      }).then((info) => {
        console.log("token info", info);
        setTokenInfo(info);
      });
    }
  }, [account]);

  const [inAmount, setInAmount] = useState(
    tokenInfo?.rawBalance ? tokenInfo.rawBalance : 0n
  );
  const { outAmount } = useOutEthAmountAfterFee(token, inAmount);

  const {
    sell,
    transactionReceipt,
    status,
    writeError,
    transationError,
    isPending,
    isSuccess,
  } = usePGFFactoryContractSell(token);

  const onSubmit = () => {
    if (inAmount && outAmount) sell(inAmount, outAmount);
  };

  useEffect(() => {
    if (isSuccess && transactionReceipt && tokenInfo && nativeTokenInfo) {
      toast({
        title: "Sell Token",
        description: (
          <pre className="mt-2 w-[340px] p-4">
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
          <pre className="mt-2 w-[340px] p-4">
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
    <div className="rounded-xl flex-col justify-start items-start gap-8 inline-flex">
      <div className="self-stretch justify-start items-center gap-4 inline-flex">
        <div className="text-[#16181d] text-2xl font-normal leading-[33.60px]">
          {tokenInfo?.name}
        </div>
        {tokenInfo?.decimals && (
          <Input
            value={formatUnits(inAmount, tokenInfo.decimals)}
            onChange={(e) =>
              setInAmount(parseUnits(e.target.value, tokenInfo.decimals!))
            }
            className="grow shrink basis-0 h-12 px-[29px] rounded-xl border border-[#16181d] text-[#626976] text-base font-normal leading-snug"
          />
        )}
      </div>
      {tokenInfo && tokenInfo.rawBalance && tokenInfo.decimals && (
        <Slider
          value={[Number(formatUnits(inAmount, tokenInfo.decimals))]}
          onValueChange={(v) =>
            setInAmount(parseUnits(String(v[0]), tokenInfo.decimals!))
          }
          max={Number(formatUnits(tokenInfo.rawBalance, tokenInfo.decimals))}
          step={
            Number(formatUnits(tokenInfo.rawBalance, tokenInfo.decimals)) / 100
          }
          className="h-6"
        />
      )}
      <div className="self-stretch h-[22px] flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-center text-[#16181d] text-base font-normal leading-snug">
            *Your meme coin can be purchased across multiple blockchains.
          </div>
        </div>
      </div>
      <div className="self-stretch h-12 justify-start items-center gap-10 inline-flex">
        {tokenInfo?.decimals &&
          tokenInfo?.symbol &&
          nativeTokenInfo?.decimals &&
          nativeTokenInfo?.symbol && (
            <OnChainActionButtonWarper
              className="w-full"
              targetChainId={PGF_CONTRACT_CHAIN_ID}
              allowanceParams={allowanceParams}
              warpedButton={
                <Button
                  className="grow shrink basis-0 h-12 px-4 py-3 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex"
                  onClick={onSubmit}
                  disabled={isPending || !inAmount || !outAmount}
                >
                  {isPending ? (
                    <div className="text-[#fefaf6]">Confirming ...</div>
                  ) : outAmount ? (
                    <div className="text-[#fefaf6] text-xl font-bold">
                      Sell{" "}
                      {new Intl.NumberFormat("en-US", {
                        notation: "compact",
                      }).format(
                        Number(formatUnits(inAmount, tokenInfo.decimals!))
                      )}{" "}
                      {tokenInfo?.symbol} and get{" "}
                      {new Intl.NumberFormat("en-US", {
                        notation: "compact",
                      }).format(
                        Number(
                          formatUnits(outAmount!, nativeTokenInfo.decimals)
                        )
                      )}{" "}
                      {nativeTokenInfo.symbol}
                    </div>
                  ) : (
                    <div className="text-[#fefaf6]">Fetching Price ...</div>
                  )}
                </Button>
              }
            />
          )}
      </div>
    </div>
  );
}
