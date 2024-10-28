export function shareToWhatsApp(url: string, text?: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = text ? encodeURIComponent(text) : "";
  const whatsappUrl = `https://wa.me/?text=${encodedText} ${encodedUrl}`; // 注意空格分隔文本和URL
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}
