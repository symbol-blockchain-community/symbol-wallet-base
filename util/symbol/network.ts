import { InvalidValueError } from '@/models/ErrorModels.js';
import { NetworkType } from '@/models/NetworkModels.js';

export function strNetworkTypeToHexadecimal(networkType: NetworkType): number {
  switch (networkType) {
    case 'mainnet':
      return 0x68;
    case 'testnet':
      return 0x98;
    default:
      throw new InvalidValueError('Invalid network type: ' + networkType);
  }
}

export function hexToStrNetworkType(hexadecimal: number): NetworkType {
  switch (hexadecimal) {
    case 0x68:
      return 'mainnet';
    case 0x98:
      return 'testnet';
    default:
      throw new InvalidValueError('Invalid network type: ' + hexadecimal);
  }
}

/**
 * アドレスの先頭アルファベット（ T or N or any）よりネットワークタイプを識別する
 */
export function getNetworkTypeToAddressChatAt0(str: string): NetworkType {
  switch (str.charAt(0)) {
    case 'T':
      return 'testnet';
    case 'N':
      return 'mainnet';
    default:
      throw new InvalidValueError('Invalid network type: ' + str.charAt(0));
  }
}

type ExplorerType = 'transactions' | 'accounts' | 'namespaces' | 'mosaics' | 'nodes' | 'blocks';

/**
 * Explorer の URL を生成する
 * https://symbol.fyi/${type}/${value}
 */
export function getExplorerUrl(networkType: NetworkType, type: ExplorerType, value: string | number): string {
  switch (networkType) {
    case 'mainnet':
      return `https://symbol.fyi/${type}/${value.toString()}`;
    case 'testnet':
      return `https://testnet.symbol.fyi/${type}/${value.toString()}`;
    default:
      throw new InvalidValueError('Invalid network type: ' + networkType);
  }
}
