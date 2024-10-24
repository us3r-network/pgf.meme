import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function BuyMemeForm() {
  return (
    <div className="rounded-xl flex-col justify-start items-start gap-8 inline-flex">
      <div className="self-stretch justify-between items-start inline-flex">
        <div className="text-[#16181d] text-2xl font-normal leading-[33.60px]">
          Wallet address
        </div>
        <div className="text-black text-2xl font-normal leading-[33.60px]">
          0xe6E...dc0
        </div>
      </div>
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-[#16181d] text-2xl font-normal leading-[33.60px]">
          Chain
        </div>
        <Button className="p-2 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex">
          <img className="w-8 h-8" src="https://via.placeholder.com/32x32" />
          <div className="text-[#fefaf6] text-xl font-normal font-['Inter'] leading-7">
            Polygon
          </div>
        </Button>
      </div>
      <div className="self-stretch justify-start items-center gap-4 inline-flex">
        <div className="text-[#16181d] text-2xl font-normal leading-[33.60px]">
          ETH
        </div>
        <Input className="grow shrink basis-0 h-12 px-[29px] rounded-xl border border-[#16181d] text-[#626976] text-base font-normal leading-snug" />
      </div>
      <Slider defaultValue={[50]} max={100} step={1} className="h-6" />
      <div className="self-stretch h-[22px] flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-center text-[#16181d] text-base font-normal leading-snug">
            *Your meme coin can be purchased across multiple blockchains.
          </div>
        </div>
      </div>
      <div className="self-stretch h-12 justify-start items-center gap-10 inline-flex">
        <Button className="grow shrink basis-0 h-12 px-4 py-3 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex">
          <div className="text-[#fefaf6] text-xl font-bold">Buy</div>
        </Button>
      </div>
    </div>
  );
}
