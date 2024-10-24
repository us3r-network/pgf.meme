import { MemeData } from "@/services/meme/types";
import { BuyMemeButton } from "../buy/BuyMemeButton";
import { SellMemeButton } from "../sell/SellMemeButton";

export default function MemeTrade({ meme }: { meme: MemeData }) {
  return (
    <div className="w-full">
      <img
        className="self-stretch h-[642px] rounded-[20px]"
        src="https://via.placeholder.com/1043x642"
      />
      <div className="self-stretch  items-center gap-6 flex mt-6">
        <div className="justify-start items-start gap-6 flex">
          <div className="text-[#16181d] text-4xl font-bold font-['Inter']">
            Market Cap:
          </div>
        </div>
        <div className="text-right text-[#16181d] text-4xl font-bold font-['Inter']">
          {" "}
          $24K
        </div>
        <div className="grow shrink basis-0 text-right text-[#0b7558] text-4xl font-bold font-['Inter'] leading-[50.40px]">
          +10%
        </div>
        <div className="justify-start items-center gap-2 flex">
          <BuyMemeButton />
          <SellMemeButton />
        </div>
      </div>
    </div>
  );
}