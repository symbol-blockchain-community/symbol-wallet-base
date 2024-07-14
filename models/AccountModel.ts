import { NetworkType } from '@/models/NetworkModels';

export interface WalletModel {
  /** PrivateKeyModel との参照 */
  privateKeyId: string | null;
  publicKey: string;
  height: number | null; // mnemonic path height
  networkType: NetworkType;
  name: string;
  id: string; // uuid
}

export interface PrivateKeyModel {
  id: string; // uuid
  networkType: NetworkType;
  privateKey: string;
}

export interface MnemonicModel {
  mnemonic: string;
  label?: string;
}

/** 連絡帳向け */
export interface ContactModel {
  /** uuid */
  id: string;
  /** ネットワークタイプ */
  networkType: string;
  /** 任意の名称 */
  name: string;
  /** アドレス */
  address: string;
  /** 公開鍵 */
  publicKey: string;
  /** メモ */
  remark: string;
  /** グループ */
  group: string;
}
