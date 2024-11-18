export function hashToHSL(hash: string) {
  let hashValue = 0;
  for (let i = 0; i < hash.length; i++) {
    hashValue = hash.charCodeAt(i) + ((hashValue << 5) - hashValue);
  }
  const h = Math.abs(hashValue % 360); // 取余数作为色相
  const s = 70 + (hashValue % 30); // 饱和度
  const l = 50 + (hashValue % 20); // 亮度

  return `hsl(${h}, ${s}%, ${l}%)`;
}
