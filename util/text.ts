/**
 * ABCDEFGHIJKLM といった文字列を ABCD...JKLM というフォーマットに変換する
 * 前後で表示する文字列は len にて指定
 */
export function longTextToShort(text: string, len: number = 4): string {
  if (text.length <= len * 2) {
    return text;
  }
  return `${text.substring(0, len)}...${text.substring(text.length - len)}`;
}
