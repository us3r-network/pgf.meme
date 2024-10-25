export type MemeData = {
  id: number;
  name: string;
  image: string;
  stats?: MemeStats;
  createdAt: string;
  lastModifiedAt: string;
};

export type MemeStats = {
  base_token_price_usd: string;
  base_token_price_native_currency: string;
  quote_token_price_usd: string;
  quote_token_price_native_currency: string;
  base_token_price_quote_token: string;
  quote_token_price_base_token: string;
  address: string;
  name: string;
  pool_created_at: string;
  token_price_usd: string;
  fdv_usd: string;
  market_cap_usd: string;
  price_change_percentage: PriceChangePercentage;
  transactions: {
    m5: TradeTransactionStats;
    m15: TradeTransactionStats;
    m30: TradeTransactionStats;
    h1: TradeTransactionStats;
    h24: TradeTransactionStats;
  };
  volume_usd: {
    m5: string;
    h1: string;
    h6: string;
    h24: string;
  };
  reserve_in_usd: string;
};

export type PriceChangePercentage = {
  m5: string;
  h1: string;
  h6: string;
  h24: string;
};

export type TradeTransactionStats = {
  buys: number;
  sells: number;
  buyers: number;
  sellers: number;
};

export enum SortBy {
  trending = "trending",
  owned = "owned",
  created = "created",
  newest = "newest",
  launching = "launching",
  marketCap = "marketCap",
}
