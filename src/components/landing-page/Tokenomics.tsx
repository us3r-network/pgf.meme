import Image from "next/image";

export default function Tokenomics() {
  const tokenomics = {
    totalSupply: 100000000000,
    community: 60,
    liquidityReserve: 15,
    teamEcosystemSupport: 15,
    farcasterEcoGrant: 5,
    publicGoodFunding: 5,
  };
  return (
    <div className="w-full">
      <span className="text-center text-2xl font-normal text-white leading-[140%]">
        {tokenomics.community}% of the supply is allocated to the community. An
        additional {tokenomics.liquidityReserve}% was used to establish the
        initial liquidity pool, while another {tokenomics.teamEcosystemSupport}%
        is dedicated to supporting the team, investors, and the broader
        ecosystem. Furthermore, {tokenomics.farcasterEcoGrant}% is reserved for
        public good funding, and {tokenomics.publicGoodFunding}% is allocated to
        the Farcaster Eco Grant, supporting developers and providing free
        onboarding for new users.
      </span>
      <div className="w-full mt-12 flex flex-row gap-3 items-center justify-between">
        <div className="flex-1 border-4 p-12 border-primary bg-white rounded-lg max-sm:w-full max-sm:h-[458px] flex-col justify-start items-start gap-6 flex">
          <div className="flex-col justify-start items-start gap-8 flex text-2xl">
            <div className="text-center">
              <span className="font-bold">Total Supply: </span>
              <span className="font-normal">
                {/* 格式化数据 */}
                {tokenomics.totalSupply.toLocaleString()}
              </span>
            </div>
            <div className="text-center">
              <span className="font-bold">Community: </span>
              <span className="font-normal">
                {tokenomics.community}% (
                {(
                  (tokenomics.totalSupply * tokenomics.community) /
                  100
                ).toLocaleString()}
                )
              </span>
            </div>
            <div className="text-center">
              <span className="font-bold">Liquidity Reserve: </span>
              <span className="font-normal">
                {tokenomics.liquidityReserve}% (
                {(
                  (tokenomics.totalSupply * tokenomics.liquidityReserve) /
                  100
                ).toLocaleString()}
                )
              </span>
            </div>
            <div className="text-center">
              <span className="font-bold">Team & Ecosystem Support: </span>
              <span className="font-normal">
                {tokenomics.teamEcosystemSupport}% (
                {(
                  (tokenomics.totalSupply * tokenomics.teamEcosystemSupport) /
                  100
                ).toLocaleString()}
                )
              </span>
            </div>
            <div className="text-center">
              <span className="font-bold">Farcaster Eco Grant: </span>
              <span className="font-normal">
                {tokenomics.farcasterEcoGrant}% (
                {(
                  (tokenomics.totalSupply * tokenomics.farcasterEcoGrant) /
                  100
                ).toLocaleString()}
                )
              </span>
            </div>
            <div className="text-center">
              <span className="font-bold">Public Good Funding: </span>
              <span className="font-normal">
                {tokenomics.publicGoodFunding}% (
                {(
                  (tokenomics.totalSupply * tokenomics.publicGoodFunding) /
                  100
                ).toLocaleString()}
                )
              </span>
            </div>
          </div>
        </div>
        <div className="w-[523px] h-[460px] relative">
          <Image
            src="/landing-page/images/tokenomics-chart.png"
            alt="tokenomics"
            fill
          />
        </div>
      </div>
    </div>
  );
}
