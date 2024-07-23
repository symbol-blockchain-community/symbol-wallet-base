import { Action, AppState } from './types';

export const initialState: AppState = {
  node: '',
  networkType: 'testnet',
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;
    case 'SET_NODE':
      return { ...state, node: action.payload };
    case 'SET_NETWORK_TYPE':
      return { ...state, networkType: action.payload };
    case 'GET_NETWORK_TYPE':
      return state;
    default:
      return state;
  }
};
