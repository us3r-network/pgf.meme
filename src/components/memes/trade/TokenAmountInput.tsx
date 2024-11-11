import { Button } from "@/components/ui/button";
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
  onChange: (value: bigint) => void;
  minAmount: number;
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

  const [amount, setAmount] = useState<bigint>(
    parseUnits(minAmount?.toString(), tokenInfo?.decimals || 18) || 0n
  );

  const onInputChange = (v: string) => {
    if (Number(v) >= 0) {
      const amount = parseUnits(v, tokenInfo?.decimals || 18);
      setAmount(amount);
      onChange(amount);
    }
  };

  const onPercentButtonClick = (percent: number) => {
    if (tokenInfo?.balance) {
      onInputChange(String((tokenInfo.balance * percent) / 100));
    }
  };

  return (
    <div className="flex-col justify-start items-start gap-6 inline-flex w-full">
      <div className="self-stretch justify-start items-center inline-flex">
        <div className="h-12 text-2xl px-4 py-2 bg-secondary text-white rounded-l-lg">{tokenInfo?.symbol}</div>
        {tokenInfo?.decimals && (
          <Input
            value={formatUnits(amount, tokenInfo.decimals)}
            onChange={(e) => onInputChange(e.target.value)}
            className="rounded-l-none"
          />
        )}
      </div>

      {tokenInfo &&
        tokenInfo.rawBalance &&
        tokenInfo.balance &&
        tokenInfo.decimals &&
        tokenInfo.balance > minAmount && (
          <>
            <div className="w-full flex flex-row justify-between">
              <Button
                variant="outline"
                onClick={() => onPercentButtonClick(25)}
              >
                25%
              </Button>
              <Button
                variant="outline"
                onClick={() => onPercentButtonClick(50)}
              >
                50%
              </Button>
              <Button
                variant="outline"
                onClick={() => onPercentButtonClick(75)}
              >
                75%
              </Button>
              <Button
                variant="outline"
                onClick={() => onPercentButtonClick(100)}
              >
                100%
              </Button>
            </div>
            <Slider
              value={[Number(formatUnits(amount, tokenInfo.decimals))]}
              onValueChange={(v) => onInputChange(v[0].toString())}
              min={minAmount}
              max={tokenInfo.balance}
              step={tokenInfo.balance / 100}
            />
          </>
        )}
    </div>
  );
}
