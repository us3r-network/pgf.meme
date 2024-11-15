import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import acrossContract from "./across-contract.json";
import { AcrossRouteInfo } from "./types";
import { Address } from "viem";

export const getSpokeContractAddress = (chainId: number) => {
  try {
    return (acrossContract as any)[chainId.toString()]["SpokePool"]["address"];
  } catch (e) {
    return undefined;
  }
};

const ACROSS_ROUTE_URL = process.env.NEXT_PUBLIC_TESTNET
  ? "https://testnet.across.to/api/available-routes"
  : "https://app.to/api/available-routes";
export const getAcrossRoute = async (chainId: number) => {
  try {
    const resp = await fetch(ACROSS_ROUTE_URL);
    const data = await resp.json();
    const routes = (data as AcrossRouteInfo[]).filter(
      (item: AcrossRouteInfo) =>
        item.originChainId === chainId &&
        item.destinationChainId === PGF_CONTRACT_CHAIN_ID &&
        item.isNative
    );
    return routes[0];
  } catch (e) {
    return undefined;
  }
};

export const isSupported = async (chainId: number) => {
  const route = await getAcrossRoute(chainId);
  if (route) return true;
  else return false;
};

const ACROSS_ROUTE_FEE_URL = "https://testnet.across.to/api/suggested-fees";
export const getFee = async (route: AcrossRouteInfo, amount: bigint) => {
  const resp = await fetch(
    `${ACROSS_ROUTE_FEE_URL}?inputToken=${route.originToken}&outputToken=${
      route.destinationToken
    }&originChainId=${route.originChainId}&destinationChainId=${
      route.destinationChainId
    }&amount=${amount.toString()}`
  );
  const data = await resp.json();

  const fee = data.lpFee.total;
  const timestamp = Number(data.timestamp);
  return [fee, timestamp];
};
