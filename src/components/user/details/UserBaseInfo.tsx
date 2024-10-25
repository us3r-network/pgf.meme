import { Button } from "@/components/ui/button";

export default function UserBaseInfo({ address }: { address: string }) {
  return (
    <div className="w-[325px] flex-col justify-start items-start gap-6 inline-flex">
      <div className="w-[325px] h-[325px] rounded-[20px] flex-col justify-start items-start gap-2.5 flex">
        <img
          className="self-stretch grow shrink basis-0 rounded-[20px]"
          src="https://via.placeholder.com/325x325"
        />
      </div>

      <div className="w-[325px] justify-start items-center gap-2.5 inline-flex">
        <div className="text-[#626976] text-base font-bold capitalize leading-relaxed">
          Aderess
        </div>
        <div className="grow shrink basis-0 text-right text-[#16181d] text-base font-bold leading-snug">
          pgf421...2425
        </div>
      </div>

      <div className="self-stretch justify-start items-center gap-10 inline-flex">
        <Button className="grow shrink basis-0 h-12 px-4 py-3 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex">
          <div className="text-[#fefaf6] text-xl font-bold">
            Earn by Sharing
          </div>
        </Button>
      </div>
    </div>
  );
}
