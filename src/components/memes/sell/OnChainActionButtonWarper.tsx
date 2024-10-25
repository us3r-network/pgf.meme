import { Button } from "@/components/ui/button";
import { useERC20Approve } from "@/hooks/contract/useERC20Contract";
import { useCapabilities } from "wagmi/experimental";
import { useCallback } from "react";
import { Address } from "viem";
import {
  useAccount,
  useChainId,
  useChains,
  useConnect,
  useSwitchChain,
} from "wagmi";

type OnChainActionButtonWarperProps = React.ComponentPropsWithoutRef<
  typeof Button
> & {
  warpedButton?: React.ReactElement;
  approveText?: string;
};

export default function OnChainActionButtonWarper({
  warpedButton,
  approveText,
  targetChainId,
  allowanceParams,
  ...props
}: OnChainActionButtonWarperProps & {
  allowanceParams?: AllowanceProps;
} & SwitchChainButtonProps) {
  //AA
  const account = useAccount();
  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });
  const supportAtomicBatch = useCallback(
    (chainId: number | undefined) => {
      if (availableCapabilities && chainId) {
        const capabilitiesForChain = availableCapabilities[chainId];
        if (capabilitiesForChain?.atomicBatch?.supported) {
          return true;
        }
      }
      return false;
    },
    [availableCapabilities]
  );
  // const supportAuxiliaryFunds = useCallback(
  //   (chainId: number | undefined) => {
  //     if (availableCapabilities && chainId) {
  //       const capabilitiesForChain = availableCapabilities[chainId];
  //       if (capabilitiesForChain?.auxiliaryFunds?.supported) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   },
  //   [availableCapabilities],
  // );
  // const getPaymasterService = useCallback(
  //   (chainId: number | undefined) => {
  //     if (availableCapabilities && chainId) {
  //       const capabilitiesForChain = availableCapabilities[chainId];
  //       if (capabilitiesForChain?.paymasterService?.supported) {
  //         return {
  //           paymasterService: {
  //             url: PAYMASTER_AND_BUNDLER_ENDPOINT,
  //           },
  //         };
  //       }
  //     }
  //     return {};
  //   },
  //   [availableCapabilities],
  // );
  if (!allowanceParams || (targetChainId && supportAtomicBatch(targetChainId)))
    return (
      <SwitchChainButtonWarper
        targetChainId={targetChainId}
        warpedButton={warpedButton}
        {...props}
      />
    );
  return (
    <ApproveButtonWarper
      allowanceParams={allowanceParams}
      text={approveText}
      warpedButton={
        <SwitchChainButtonWarper
          targetChainId={targetChainId}
          warpedButton={warpedButton}
          {...props}
        />
      }
      {...props}
    />
  );
}

type ApproveButtonProps = {
  allowanceParams: AllowanceProps;
  text?: string;
};

type AllowanceProps = {
  owner: Address;
  tokenAddress: Address;
  spender: Address;
  value: bigint;
};

function ApproveButtonWarper({
  warpedButton,
  allowanceParams,
  text,
  ...props
}: OnChainActionButtonWarperProps & ApproveButtonProps) {
  const { owner, tokenAddress, spender, value } = allowanceParams;
  const { allowance, approve, waiting, writing } = useERC20Approve({
    owner,
    tokenAddress,
    spender,
  });
  // console.log("allowance", allowance);
  if (allowance === 0n || (!!allowance && allowance < value))
    return (
      <Button
        disabled={waiting || writing}
        onClick={async () => {
          await approve(value);
        }}
        {...props}
      >
        {text || "Approve"}
      </Button>
    );
  else return warpedButton;
}

type SwitchChainButtonProps = {
  targetChainId?: number;
};

function SwitchChainButtonWarper({
  warpedButton,
  targetChainId,
  ...props
}: OnChainActionButtonWarperProps & SwitchChainButtonProps) {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChain, status: switchChainStatus } = useSwitchChain();
  const chainId = useChainId();
  const chains = useChains();
  const targetChain = chains.find((c) => c.id === targetChainId);
  if (targetChainId && targetChain && targetChainId !== chainId) {
    if (!isConnected) {
      return (
        <Button
          disabled={switchChainStatus === "pending"}
          onClick={async () => {
            connect({ connector: connectors[0] });
          }}
          {...props}
        >
          Connect Wallet
        </Button>
      );
    }
    return (
      <Button
        disabled={switchChainStatus === "pending"}
        onClick={async () => {
          await switchChain({ chainId: targetChainId });
        }}
        {...props}
      >
        Switch to {targetChain.name}
      </Button>
    );
  } else return warpedButton;
}
