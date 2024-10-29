import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { getBlockExploreTxUrl } from "@/lib/onchain";
import { shortPubKey } from "@/lib/shortAddress";
import { cn } from "@/lib/utils";
import { TradeData } from "@/services/trade/types";
import dayjs from "dayjs";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function TradesTable({ data }: { data: TradeData[] }) {
  return (
    <div className="w-full flex-col justify-start items-start gap-6 flex">
      <div className="self-stretch h-[22px] rounded-[20px] flex-col justify-start items-center gap-2.5 flex">
        <div className="self-stretch px-5 justify-between items-center inline-flex">
          <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-5 flex">
            <div className="text-[#858584] text-base font-normal leading-snug">
              User
            </div>
          </div>
          <div className="justify-end items-center gap-5 flex">
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#858584] text-base font-normal leading-snug">
                TXN
              </div>
            </div>
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#858584] text-base font-normal leading-snug">
                ETH
              </div>
            </div>
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#858584] text-base font-normal leading-snug">
                $MEME
              </div>
            </div>
            <div className="w-20 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#858584] text-base font-normal leading-snug">
                Date
              </div>
            </div>
            <div className="w-[60px] flex-col justify-start items-center gap-2.5 inline-flex">
              <div className="self-stretch text-center text-[#858584] text-base font-normal leading-snug">
                Action
              </div>
            </div>
          </div>
        </div>
      </div>
      {data.map((item, index) => {
        return (
          <div
            key={item.txType + "_" + index}
            className="self-stretch h-16 py-3 bg-[#3b3b3b] rounded-[20px] flex-col justify-start items-center gap-2.5 flex"
          >
            <div className="self-stretch px-5 justify-between items-center inline-flex">
              <div className="grow shrink basis-0 h-10 rounded-[20px] justify-center items-center gap-2 flex">
                {/* <div className="flex-col justify-start items-end inline-flex">
              <div className="w-10 h-10 justify-start items-start gap-2.5 inline-flex">
                <div className="w-10 h-10 justify-center items-center flex">
                  <img
                    className="w-10 h-10 rounded-[100px]"
                    src="https://via.placeholder.com/40x40"
                  />
                </div>
              </div>
            </div> */}
                <Link
                  className="grow shrink basis-0 flex-col justify-center items-start gap-[5px] inline-flex"
                  href={`/u/${item.user.walletAddress}`}
                >
                  <div className="self-stretch text-[#fefaf6] text-base font-bold capitalize leading-snug">
                    {shortPubKey(item.user.walletAddress)}
                  </div>
                </Link>
              </div>
              <div className="justify-end items-center gap-5 flex">
                <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div
                    className={cn(
                      "self-stretch  text-base font-normal leading-snug",
                      item.txType === "buy"
                        ? "text-[#0b7558]"
                        : "text-[#e01916]"
                    )}
                  >
                    {item.txType === "buy" ? "Buy" : "Sell"}
                  </div>
                </div>
                <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div className="self-stretch text-[#fefaf6] text-base font-normal leading-snug">
                    {Intl.NumberFormat("en-US", {
                      maximumFractionDigits: 6,
                    }).format(Number(item.ethAmount))}
                  </div>
                </div>
                <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div className="self-stretch text-[#fefaf6] text-base font-normal leading-snug">
                    {new Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(Number(item.memeAmount))}{" "}
                  </div>
                </div>
                <div className="w-20 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div className="w-20 text-[#fefaf6] text-base font-normal leading-snug">
                    {dayjs(item.date * 1000).fromNow(true)}
                  </div>
                </div>
                <div className="w-[60px] flex-col justify-start items-center gap-2.5 inline-flex">
                  <SquareArrowOutUpRight
                    className=" stroke-[#FEFAF6] size-6 cursor-pointer"
                    onClick={() => {
                      window.open(
                        getBlockExploreTxUrl(PGF_CONTRACT_CHAIN_ID, item.txHash)
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
