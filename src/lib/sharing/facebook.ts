export function shareToFacebook(url: string, title?: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = title ? encodeURIComponent(title) : "";
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&t=${encodedTitle}`;
  window.open(facebookUrl, "_blank", "noopener,noreferrer");
}
