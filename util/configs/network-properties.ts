import { NetworkProperty } from '@/models/NetworkModels.js';

type INetworkProperties = {
  /** `NetworkType` と同一の値とする */
  mainnet: NetworkProperty;
  /** `NetworkType` と同一の値とする */
  testnet: NetworkProperty;
};

/**
 * 各 Network Property の既定値
 */
export const NETWORK_PROPERTIES: INetworkProperties = {
  mainnet: {
    identifier: 'mainnet',
    currencyMosaicId: '6BED913FA20223F8',
    currencyDivisibility: 6,
    currencyNamespaceId: 'symbol.xym',
    epochAdjustment: 1615853185,
    generationHashSeed: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
    explorerServerUrl: 'https://symbol.fyi',
    statisticsNodeServerUrl: 'https://symbol.services/nodes',
  },
  testnet: {
    identifier: 'testnet',
    currencyMosaicId: '72C0212E67A08BCE',
    currencyDivisibility: 6,
    currencyNamespaceId: 'symbol.xym',
    epochAdjustment: 1667250467,
    generationHashSeed: '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4',
    explorerServerUrl: 'https://testnet.symbol.fyi',
    statisticsNodeServerUrl: 'https://testnet.symbol.services/nodes',
  },
};
