import { MemeData } from "@/services/meme/types";
import JoinTelegramButton from "@/components/telegram/JoinTelegramButton";

export default function PostsInnerMemeInfo({ meme }: { meme: MemeData }) {
  return (
    <div className="w-full flex flex-col gap-6 max-sm:gap-3">
      <div className="w-full flex flex-row gap-2">
        <img
          className="w-[200px] h-[200px] rounded-[20px] object-cover"
          src={meme.image}
        />
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-primary text-lg">
            {meme.name}(${meme.symbol})
          </span>
          <span className="font-normal text-xs">{meme.description}</span>
          {!!meme?.tgPostLink && (
            <div className="mt-auto w-full">
              <JoinTelegramButton link={meme.tgPostLink} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
