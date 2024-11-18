import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { getTokenInfo } from "@/hooks/contract/useERC20Contract";
import { getNativeTokenInfo } from "@/hooks/contract/useNativeToken";
import { PGFToken } from "@/services/contract/types";
import { useEffect, useState } from "react";
import { Address, formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import SwitchChains, { TokenInfo } from "./SwitchChains";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";

export function TokenAmountInput({
  contractAddress,
  chainId,
  logoURI,
  onChange,
  minAmount = 0,
}: {
  contractAddress?: Address;
  chainId?: number;
  logoURI?: string;
  onChange: (value: bigint) => void;
  minAmount: number;
}) {
  const account = useAccount();
  const [tokenInfo, setTokenInfo] = useState<PGFToken>();
  useEffect(() => {
    if (contractAddress) {
      getTokenInfo({
        contractAddress,
        chainId: chainId || account.chainId || PGF_CONTRACT_CHAIN_ID,
        account: account?.address,
        logoURI,
      }).then((info) => {
        // console.log("token info", info);
        setTokenInfo(info);
      });
    } else {
      console.log("getNativeTokenInfo", chainId, account.chainId);
      getNativeTokenInfo({
        chainId: chainId || account.chainId || PGF_CONTRACT_CHAIN_ID,
        account: account?.address,
      }).then((info) => {
        // console.log("native token info", info);
        setTokenInfo(info);
      });
    }
  }, [account]);

  useEffect(() => {
    if (!tokenInfo?.balance || tokenInfo.balance < minAmount) setAmount(0n);
    else
      setAmount(
        parseUnits(minAmount?.toString(), tokenInfo?.decimals || 18) || 0n
      );
  }, [tokenInfo?.balance]);

  const [amount, setAmount] = useState<bigint>(
    parseUnits(minAmount?.toString(), tokenInfo?.decimals || 18) || 0n
  );

  const onInputChange = (v: string) => {
    if (Number(v) >= 0) {
      const amount = parseUnits(v, tokenInfo?.decimals || 18);
      setAmount(amount);
    }
  };

  useEffect(() => {
    if (amount >= 0n) {
      onChange(amount);
    }
  }, [amount]);

  const onPercentButtonClick = (percent: number) => {
    if (tokenInfo?.balance) {
      onInputChange(String((tokenInfo.balance * percent) / 100));
    }
  };
  if (!tokenInfo) return null;
  return (
    <div className="flex-col justify-start items-start gap-6 inline-flex w-full">
      <div className="self-stretch justify-start items-center inline-flex">
        {contractAddress ? (
          <div className="h-12 px-4 py-2 bg-secondary rounded-l-lg text-white">
            <TokenInfo token={tokenInfo} />
          </div>
        ) : (
          <SwitchChains className="z-50 " />
        )}
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
