import { Mosaic } from '@/models/MosaicModel.js';
import { NetworkType } from '@/models/NetworkModels.js';
import { NETWORK_PROPERTIES } from '@/util/configs/network-properties.js';

/**
 * Mosaic の配列より、主軸通貨とそれ以外に分離します。
 * 絶対値/相対値 の変換や namespace の名前解決は行わず、分離のみを行います。
 */
export function splitCurrency(networkType: NetworkType, mosaic: Mosaic[]): { currency: Mosaic; mosaics: Mosaic[] } {
  const networkProperty = NETWORK_PROPERTIES[networkType];
  const currency = mosaic.find((m) => m.id === networkProperty.currencyMosaicId);
  const mosaics = mosaic.filter((m) => m.id !== networkProperty.currencyMosaicId);

  return {
    mosaics,
    currency: {
      amount: currency?.amount ?? 0,
      id: networkProperty.currencyMosaicId,
      divisivility: networkProperty.currencyDivisibility,
      namespace: networkProperty.currencyNamespaceId,
    },
  };
}
