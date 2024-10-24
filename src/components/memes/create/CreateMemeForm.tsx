import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreateMemeForm() {
  return (
    <div className="rounded-xl flex-col justify-start items-start gap-8 inline-flex">
      <div className="self-stretch h-[98px] flex-col justify-start items-start gap-4 flex">
        <div className="text-[#16181d] text-2xl font-normal">Meme coin</div>
        <Input
          className="self-stretch h-12 px-[29px] rounded-xl border border-[#16181d] text-[#626976] text-base font-normal leading-snug"
          placeholder="Enter your meme coin’s name"
        />
      </div>
      <div className="self-stretch h-[136px] flex-col justify-start items-start gap-4 flex">
        <div className="text-[#16181d] text-2xl font-normal">Image</div>
        <Input
          className="self-stretch h-12 px-[29px] rounded-xl border border-[#16181d] text-[#626976] text-base font-normal leading-snug"
          placeholder="Enter the image address"
        />
        <div className="text-[#16181d] text-base font-normal leading-snug">
          Recommended image dimensions are 800x800px for best display quality.
        </div>
      </div>
      <div className="self-stretch h-[98px] flex-col justify-start items-start gap-4 flex">
        <div className="text-[#16181d] text-2xl font-normal">Description</div>
        <Textarea
          className="self-stretch h-12 px-[29px] rounded-xl border border-[#16181d] text-[#626976] text-base font-normal leading-snug"
          placeholder="Add a short description for your meme coin"
        />
      </div>
      <div className="self-stretch h-[68px] flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch text-center text-[#16181d] text-base font-normal leading-snug">
          *Transaction fees:pgf (1%), Vitalik (15%), Charity Pool (5%).
        </div>
        <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-center text-[#16181d] text-base font-normal leading-snug">
            *Your meme coin can be purchased across multiple blockchains.
          </div>
        </div>
      </div>
      <div className="self-stretch h-12 justify-start items-center gap-10 inline-flex">
        <Button className="grow shrink basis-0 h-12 px-4 py-3 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex">
          <div className="text-[#fefaf6] text-xl font-bold">Create & Share</div>
        </Button>
      </div>
      <div className="self-stretch text-center text-[#626976] text-base font-normal">
        Share your meme coin link to earn 4% commission on every trade through
        your referral.
      </div>
    </div>
  );
}
