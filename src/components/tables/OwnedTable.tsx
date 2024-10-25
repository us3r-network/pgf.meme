type OwnedItem = {
  token: {
    name: string;
  };
  amount: number;
  value: number;
};

export default function OwnedTable({ data }: { data: OwnedItem[] }) {
  return (
    <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
      <div className="self-stretch px-5 justify-between items-center inline-flex">
        <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-5 flex">
          <div className="text-[#858584] text-base font-normal font-['Inter'] leading-snug">
            Token
          </div>
        </div>
        <div className="justify-end items-center gap-5 flex">
          <div className="w-40 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="self-stretch text-[#858584] text-base font-normal font-['Inter'] leading-snug">
              Amount
            </div>
          </div>
          <div className="w-40 flex-col justify-start items-center gap-2.5 inline-flex">
            <div className="text-[#858584] text-base font-normal font-['Inter'] leading-snug">
              Value
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
              <div className="self-stretch text-[#fefaf6] text-base font-normal font-['Inter'] leading-snug">
                224925820
              </div>
            </div>
            <div className="w-40 flex-col justify-start items-center gap-2.5 inline-flex">
              <div className="self-stretch text-center text-[#fefaf6] text-base font-normal font-['Inter'] leading-snug">
                ～ $22.67
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
