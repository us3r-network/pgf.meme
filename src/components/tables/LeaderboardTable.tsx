import { shortPubKey } from "@/lib/shortAddress";
import { UserLeaderboardData } from "@/services/user/types";
import Link from "next/link";
export default function LeaderboardTable({
  data,
}: {
  data: UserLeaderboardData[];
}) {
  return (
    <div className="w-full flex-col justify-start items-start gap-6 flex">
      <div className="self-stretch px-5 justify-between items-center inline-flex">
        <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-5 flex">
          <div className="text-[#858584] text-base font-normal font-['Inter'] leading-snug">
            User
          </div>
        </div>
        <div className="justify-end items-center gap-5 flex">
          <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="self-stretch text-[#858584] text-base font-normal font-['Inter'] leading-snug">
              ETH
            </div>
          </div>
          <div className="flex-col justify-start items-end gap-2.5 inline-flex">
            <div className="text-[#858584] text-base font-normal font-['Inter'] leading-snug">
              Proportion
            </div>
          </div>
        </div>
      </div>

      {data.map((item, index) => {
        return (
          <div
            key={`${item.user.walletAddress}_${index}`}
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
                  href={`/u/${item.user.walletAddress}`}
                  className="grow shrink basis-0 flex-col justify-center items-start gap-[5px] inline-flex"
                >
                  <div className="self-stretch text-[#fefaf6] text-base font-bold font-['Inter'] capitalize leading-snug">
                    {shortPubKey(item.user.walletAddress)}
                  </div>
                </Link>
              </div>
              <div className="justify-end items-center gap-5 flex">
                <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div className="self-stretch text-[#fefaf6] text-base font-normal font-['Inter'] leading-snug">
                    {item.ethAmount}
                  </div>
                </div>
                <div className="w-20 flex-col justify-start items-center gap-2.5 inline-flex">
                  <div className="self-stretch text-center text-[#fefaf6] text-base font-normal font-['Inter'] leading-snug">
                    {item.proportion}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
