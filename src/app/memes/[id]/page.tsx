import MemeBaseInfo from "@/components/memes/details/MemeBaseInfo";
import MemeTabs from "@/components/memes/details/MemeTabs";
import MemeTrade from "@/components/memes/details/MemeTrade";

export default function MemeDetails() {
  return (
    <div className="h-[1618px] p-6 bg-[#fefaf6] justify-center items-start gap-6 inline-flex">
      <MemeBaseInfo meme={{} as any} />
      <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-6 inline-flex">
        <MemeTrade meme={{} as any} />
        <MemeTabs meme={{} as any} />
      </div>
    </div>
  );
}
