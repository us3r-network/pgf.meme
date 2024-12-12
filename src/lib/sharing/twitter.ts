export function getCreateTweetWebUrl(url: string, text?: string) {
  const encodedUrl = url ? encodeURIComponent(url) : "";
  const encodedText = text ? encodeURIComponent(text) : "";
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  return twitterUrl;
}
export function shareToTwitter(url: string, text?: string) {
  const twitterUrl = getCreateTweetWebUrl(url, text);
  window.open(twitterUrl, "_blank", "noopener,noreferrer");
}
