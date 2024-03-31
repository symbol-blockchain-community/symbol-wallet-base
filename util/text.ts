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

/**
 * お問い合わせ番号等、セキュアである必要はないランダムなIDを生成します
 * 引数 num は桁数を指定します。
 */
export function generateUnsecureRandomId(num: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < num; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${new Date().getTime().toString()}-${id}`;
}
