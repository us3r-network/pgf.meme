export function shareToTwitter(url: string, text?: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = text ? encodeURIComponent(text) : "";
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  window.open(twitterUrl, "_blank", "noopener,noreferrer");
}
