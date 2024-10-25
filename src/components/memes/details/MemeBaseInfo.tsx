"use client";

import { Button } from "@/components/ui/button";
import { MemeData } from "@/services/meme/types";

export default function MemeBaseInfo({ meme }: { meme: MemeData }) {
  return (
    <div className="w-[325px] flex-col justify-start items-start gap-6 inline-flex">
      <div className="text-[#16181d] text-4xl font-bold capitalize leading-[50.40px]">
        Meme name
      </div>
      <div className="justify-start items-start gap-6 inline-flex">
        <div className="text-[#16181d] text-4xl font-bold">$SYMBOL</div>
      </div>
      <div className="w-full h-[325px] rounded-[20px] flex-col justify-start items-start gap-2.5 flex">
        <img
          className="w-full h-full grow shrink basis-0 rounded-[20px] object-cover"
          src="https://picsum.photos/325/400?random=1"
        />
      </div>
      <div className="w-full justify-start items-center gap-10 inline-flex">
        <Button className="grow shrink basis-0 h-12 px-4 py-3 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex">
          <div className="text-[#fefaf6] text-xl font-bold">
            Earn by Sharing
          </div>
        </Button>
      </div>
      <div className="w-full justify-start items-start gap-2.5 inline-flex">
        <div className="text-[#626976] text-base font-bold capitalize leading-relaxed">
          Created By
        </div>
        <div className="grow shrink basis-0 h-6 rounded-[20px] justify-end items-center gap-1 flex">
          <div className="justify-start items-start gap-2.5 flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <img
                className="w-6 h-6 rounded-[120px]"
                src="https://via.placeholder.com/24x24"
              />
            </div>
          </div>
          <div className="text-[#16181d] text-base font-bold capitalize leading-snug">
            Orbitian
          </div>
        </div>
      </div>
      <div className="w-full justify-start items-center gap-2.5 inline-flex">
        <div className="text-[#626976] text-base font-bold capitalize leading-relaxed">
          Progress
        </div>
        <div className="grow shrink basis-0 text-right text-[#16181d] text-base font-bold leading-snug">
          5%
        </div>
      </div>
      <div className="w-full justify-start items-center gap-2.5 inline-flex">
        <div className="text-[#626976] text-base font-bold capitalize leading-relaxed">
          Aderess
        </div>
        <div className="grow shrink basis-0 text-right text-[#16181d] text-base font-bold leading-snug">
          pgf421...2425
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-2.5 flex">
        <div className="text-[#626976] text-[22px] font-bold capitalize leading-9">
          Description
        </div>
        <div className="text-[#16181d] text-base font-medium leading-relaxed">
          The Orbitians
          <br />
          is a collection of 10,000 unique NFTs on the Ethereum blockchain,
          There are all sorts of beings in the NFT Universe. The most advanced
          and friendly of the bunch are Orbitians. They live in a metal space
          machines, high up in the sky and only have one foot on Earth.
          <br />
          These Orbitians are a peaceful race, but they have been at war with a
          group of invaders for many generations. The invaders are called
          Upside-Downs, because of their inverted bodies that live on the
          ground, yet do not know any other way to be. Upside-Downs believe that
          they will be able to win this war if they could only get an eye into
          Orbitian territory, so they've taken to make human beings their
          target.
        </div>
      </div>
    </div>
  );
}
