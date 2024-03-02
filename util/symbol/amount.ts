/**
 * Mosaic の数量を divisibility を元に 絶対値 より 相対値 へ変換します
 */
export function toRelativeAmount(amount: number, divisibility: number): number {
  return amount * Math.pow(10, divisibility);
}

/**
 * Mosaic の数量を divisibility を元に 相対値 より 絶対値 へ変換します
 */
export function toAbsoluteAmount(amount: number, divisibility: number): number {
  return amount / Math.pow(10, divisibility);
}
