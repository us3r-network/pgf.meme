import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import acrossContract from "./across-contract.json";
import { AcrossRouteInfo } from "./types";
import { Address } from "viem";

const ACROSS_API_ROOT = process.env.NEXT_PUBLIC_TESTNET
  ? "https://testnet.across.to/api/"
  : "https://app.to/api/";

export const getSpokeContractAddress = (chainId: number) => {
  try {
    return (acrossContract as any)[chainId.toString()]["SpokePool"]["address"];
  } catch (e) {
    return undefined;
  }
};
export const getMulticallHandlerAddress = (chainId: number) => {
  try {
    return (acrossContract as any)[chainId.toString()]["MulticallHandler"]["address"];
  } catch (e) {
    return undefined;
  }
};

const ACROSS_ROUTE_URL = ACROSS_API_ROOT + "available-routes";
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
    // console.log("available-routes",routes);
    return routes[0];
  } catch (e) {
    return undefined;
  }
};

export const isAcrossSupported = async (chainId: number) => {
  const route = await getAcrossRoute(chainId);
  if (route) return true;
  else return false;
};

const ACROSS_LIMITS_URL = ACROSS_API_ROOT + "limits";
export const getLimits= async (route: AcrossRouteInfo) => {
    const resp = await fetch(
      `${ACROSS_LIMITS_URL}?inputToken=${route.originToken}&outputToken=${
        route.destinationToken
      }&originChainId=${route.originChainId}&destinationChainId=${
        route.destinationChainId
      }`
    );
    const data = await resp.json();
    return data;
  };

const ACROSS_ROUTE_FEE_URL = ACROSS_API_ROOT + "suggested-fees";
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

const ACROSS_DEPOSIT_STATUS_URL = ACROSS_API_ROOT + "deposit/status";
export const getDepositStatus = async (
  originChainId: number,
  depositId: number
) => {
  const resp = await fetch(
    `${ACROSS_DEPOSIT_STATUS_URL}?originChainId=${originChainId}&depositId=${depositId}`
  );
  const data = await resp.json();
  return data;
};
