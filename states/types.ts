import { NetworkType } from '@/models/NetworkModels';
// アクションの型定義
export type Action =
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'SET_NODE'; payload: string }
  | { type: 'GET_NODE'; payload: string }
  | { type: 'SET_NETWORK_TYPE'; payload: NetworkType }
  | { type: 'GET_NETWORK_TYPE' };

// 状態の型定義
export interface AppState {
  node: string;
  networkType: NetworkType;
}
