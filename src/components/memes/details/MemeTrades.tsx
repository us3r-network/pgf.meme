import { MemeData } from "@/services/meme/types";

export default function MemeTrades({ meme }: { meme: MemeData }) {
  return (
    <div className="self-stretch h-[274px] flex-col justify-start items-start gap-6 flex">
      <div className="self-stretch h-[22px] rounded-[20px] flex-col justify-start items-center gap-2.5 flex">
        <div className="self-stretch px-5 justify-between items-center inline-flex">
          <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-5 flex">
            <div className="text-[#858584] text-base font-normal font-['Inter'] leading-snug">
              User
            </div>
          </div>
          <div className="justify-end items-center gap-5 flex">
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#858584] text-base font-normal font-['Inter'] leading-snug">
                TXN
              </div>
            </div>
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#858584] text-base font-normal font-['Inter'] leading-snug">
                ETH
              </div>
            </div>
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#858584] text-base font-normal font-['Inter'] leading-snug">
                $MEME
              </div>
            </div>
            <div className="w-20 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#858584] text-base font-normal font-['Inter'] leading-snug">
                Date
              </div>
            </div>
            <div className="w-[60px] flex-col justify-start items-center gap-2.5 inline-flex">
              <div className="self-stretch text-center text-[#858584] text-base font-normal font-['Inter'] leading-snug">
                Action
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-16 py-3 bg-[#3b3b3b] rounded-[20px] flex-col justify-start items-center gap-2.5 flex">
        <div className="self-stretch px-5 justify-between items-center inline-flex">
          <div className="grow shrink basis-0 h-10 rounded-[20px] justify-center items-center gap-2 flex">
            <div className="flex-col justify-start items-end inline-flex">
              <div className="w-10 h-10 justify-start items-start gap-2.5 inline-flex">
                <div className="w-10 h-10 justify-center items-center flex">
                  <img
                    className="w-10 h-10 rounded-[100px]"
                    src="https://via.placeholder.com/40x40"
                  />
                </div>
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-center items-start gap-[5px] inline-flex">
              <div className="self-stretch text-[#fefaf6] text-base font-bold font-['Inter'] capitalize leading-snug">
                Jaydon Ekstrom Bothman
              </div>
            </div>
          </div>
          <div className="justify-end items-center gap-5 flex">
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#0b7558] text-base font-normal font-['Inter'] leading-snug">
                Buy
              </div>
            </div>
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#fefaf6] text-base font-normal font-['Inter'] leading-snug">
                6.02
              </div>
            </div>
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#fefaf6] text-base font-normal font-['Inter'] leading-snug">
                12124924
              </div>
            </div>
            <div className="w-20 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="w-20 text-[#fefaf6] text-base font-normal font-['Inter'] leading-snug">
                12h
              </div>
            </div>
            <div className="w-[60px] flex-col justify-start items-center gap-2.5 inline-flex">
              <div className="w-6 h-6 relative" />
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-16 py-3 bg-[#3b3b3b] rounded-[20px] flex-col justify-start items-center gap-2.5 flex">
        <div className="self-stretch px-5 justify-between items-center inline-flex">
          <div className="grow shrink basis-0 h-10 rounded-[20px] justify-center items-center gap-2 flex">
            <div className="flex-col justify-start items-end inline-flex">
              <div className="w-10 h-10 justify-start items-start gap-2.5 inline-flex">
                <div className="w-10 h-10 justify-center items-center flex">
                  <img
                    className="w-10 h-10 rounded-[100px]"
                    src="https://via.placeholder.com/40x40"
                  />
                </div>
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-center items-start gap-[5px] inline-flex">
              <div className="self-stretch text-[#fefaf6] text-base font-bold font-['Inter'] capitalize leading-snug">
                Ruben Carder
              </div>
            </div>
          </div>
          <div className="justify-end items-center gap-5 flex">
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#e01916] text-base font-normal font-['Inter'] leading-snug">
                Sell
              </div>
            </div>
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#fefaf6] text-base font-normal font-['Inter'] leading-snug">
                6.02
              </div>
            </div>
            <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#fefaf6] text-base font-normal font-['Inter'] leading-snug">
                12124924
              </div>
            </div>
            <div className="w-20 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="w-20 text-[#fefaf6] text-base font-normal font-['Inter'] leading-snug">
                12h
              </div>
            </div>
            <div className="w-[60px] flex-col justify-start items-center gap-2.5 inline-flex">
              <div className="w-6 h-6 relative" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
