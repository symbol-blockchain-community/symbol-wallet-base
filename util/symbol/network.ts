import { InvalidValueError } from '@/models/ErrorModels';
import { NetworkType } from '@/models/NetworkModels';

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
