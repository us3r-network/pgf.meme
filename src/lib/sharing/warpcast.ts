export const WARPCAST_WEB_HOST = "https://warpcast.com";
export const WARPCAST_APP_HOST = "warpcast://";
export const WARPCAST_CHANNEL_NAME = "degencast";

export const embedsToQueryParams = (embeds?: string[]) => {
  return embeds && embeds.length > 0
    ? embeds.map((embed) => `embeds[]=${embed}`).join("&")
    : "";
};
export const getCreateCastWebUrl = (
  embeds: string[],
  channelId: string,
  text?: string
) => {
  const embedsString = embedsToQueryParams(embeds);
  let params = `text=${text || ""}${embedsString ? `&${embedsString}` : ""}`;
  if (channelId && channelId !== "home") {
    params += `&channelKey=${channelId}`;
  }
  const warpcastAppUrl = encodeURI(`${WARPCAST_APP_HOST}/~/compose?${params}`);
  const webUrl = encodeURI(`${WARPCAST_WEB_HOST}/~/compose?${params}`);

  return webUrl;
};

export const shareToWarpcast = (
  embeds: string[],
  channelId: string,
  text?: string
) => {
  const webUrl = getCreateCastWebUrl(embeds, channelId, text);

  // TODO open app
  window.open(webUrl, "_blank", "noopener,noreferrer");
};
