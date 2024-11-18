"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import { useState } from "react";

type ConnectButtonProps = React.ComponentProps<typeof ConnectButton>;

export const CustomConnectButton = (props: ConnectButtonProps) => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <ConnectButton.Custom {...props}>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");
          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary font-bold"
                      onClick={openConnectModal}
                      type="button"
                    >
                      Connect Wallet
                    </Button>
                  );
                }
                if (chain.unsupported) {
                  return (
                    <Button
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary font-bold"
                      onClick={openChainModal}
                      type="button"
                    >
                      Wrong network
                    </Button>
                  );
                }
                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    {/* <Button
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary font-bold"
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button> */}
                    <DropdownMenuTrigger>
                      <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary font-bold">
                        {/* {account.ensAvatar && (
                          <div
                            style={{
                              background: account.ensAvatar,
                              width: 24,
                              height: 24,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            <img
                              alt={account.ensAvatar ?? "Ens Avatar"}
                              src={account.ensAvatar}
                              style={{ width: 24, height: 24 }}
                            />
                          </div>
                        )} */}
                        {account.displayName}

                        {account.displayBalance ? (
                          <span className="max-sm:hidden">
                            ({account.displayBalance})
                          </span>
                        ) : (
                          ""
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>

      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <Link
            href={`/u/${address}`}
            className="text-primary hover:text-primary font-bold cursor-pointer"
            onClick={() => {
              setOpen(false);
            }}
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            disconnect();
            setOpen(false);
          }}
          className="text-primary hover:text-primary font-bold cursor-pointer"
        >
          <span className="text-primary hover:text-primary font-bold cursor-pointer">
            Disconnect
          </span>
        </DropdownMenuItem>
        {/* <DropdownMenuItem
        onClick={openAccountModal}
        className="text-primary hover:text-primary font-bold cursor-pointer"
      >
        <span className="text-primary hover:text-primary font-bold cursor-pointer">
          My Account
        </span>
      </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
