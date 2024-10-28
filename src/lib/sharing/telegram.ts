export function shareToTelegramWeb(url: string, text?: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = text ? encodeURIComponent(text) : "";
  const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
  window.open(telegramUrl, "_blank", "noopener,noreferrer");
}
