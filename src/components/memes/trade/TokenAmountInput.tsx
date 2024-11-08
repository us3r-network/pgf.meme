import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { getTokenInfo } from "@/hooks/contract/useERC20Contract";
import { getNativeTokenInfo } from "@/hooks/contract/useNativeToken";
import { PGFToken } from "@/services/contract/types";
import { useEffect, useState } from "react";
import { Address, formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";

export function TokenAmountInput({
  contractAddress,
  chainId,
  onChange,
  minAmount = 0,
}: {
  contractAddress?: Address;
  chainId: number;
  onChange:(value:bigint)=>void;
  minAmount:number;
}) {
  const account = useAccount();
  const [tokenInfo, setTokenInfo] = useState<PGFToken>();
  useEffect(() => {
    if (contractAddress) {
      getTokenInfo({
        contractAddress,
        chainId,
        account: account?.address,
      }).then((info) => {
        // console.log("token info", info);
        setTokenInfo(info);
      });
    } else {
      getNativeTokenInfo({
        chainId,
        account: account?.address,
      }).then((info) => {
        // console.log("native token info", info);
        setTokenInfo(info);
      });
    }
  }, [account]);

  const [amount, setAmount] = useState<bigint>(0n);

  const onInputChange = (v: string) => {
    if (Number(v) >= 0) {
      const amount = parseUnits(v, tokenInfo?.decimals || 18)
      setAmount(amount);
      onChange(amount);
    }
  };

  return (
    <div className="flex-col justify-start items-start gap-8 inline-flex w-full">
      <div className="self-stretch justify-start items-center gap-4 inline-flex">
        {tokenInfo?.decimals && (
          <Input
            value={formatUnits(amount, tokenInfo.decimals)}
            onChange={(e) => onInputChange(e.target.value)}
          />
        )}
        <div className="text-2xl">{tokenInfo?.symbol}</div>
      </div>
      {tokenInfo &&
        tokenInfo.rawBalance && tokenInfo.balance &&
        tokenInfo.decimals &&
        tokenInfo.balance > minAmount && (
          <Slider
            value={[Number(formatUnits(amount, tokenInfo.decimals))]}
            onValueChange={(v) => onInputChange(v[0].toString())}
            min={minAmount}
            max={Number(formatUnits(tokenInfo.rawBalance, tokenInfo.decimals))}
            step={
              Number(formatUnits(tokenInfo.rawBalance, tokenInfo.decimals)) /
              100
            }
          />
        )}
    </div>
  );
}
