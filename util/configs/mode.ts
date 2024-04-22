import { NetworkType } from '@/models/NetworkModels.js';

/**
 * TODO: .env* ファイルの LOAD に成功しない為、暫定として本 config ファイルを使用する
 */
export const modeConfig = {
  APPLICATION_NAME: 'Base Wallet',
  DEFAULT_NETWORK_TYPE: 'testnet' as NetworkType,
};
