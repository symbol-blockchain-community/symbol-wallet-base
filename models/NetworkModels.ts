import { NetworkService } from '@/services/NetworkService';

export type NetworkType = 'testnet' | 'mainnet';
export type ConnectionStatus = 'connected' | 'disconnected';

export interface NodeInfo {
  networkIdentifier: 104 | 152;
  restGatewayUrl: string;
  websocketUrl: string;
  friendlyName: string;
}

export interface NetworkInfo {
  network: NetworkService;
  connection: ConnectionStatus;
}

export interface NetworkProperty {
  identifier: string;
  currencyMosaicId: string;
  currencyDivisibility: number;
  currencyNamespaceId: string;
  generationHashSeed: string;
  epochAdjustment: number;
  explorerServerUrl: string;
  statisticsNodeServerUrl: string;
}
