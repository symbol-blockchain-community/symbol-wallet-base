// アクションの型定義
export type Action =
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'SET_NODE'; payload: string }
  | { type: 'SET_NETWORK_TYPE'; payload: number };

// 状態の型定義
export interface AppState {
  node: string;
  networkType: number;
}
