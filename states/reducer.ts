import { Action, AppState } from './types.js';

export const initialState: AppState = {
  node: '',
  networkType: 0,
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;
    case 'SET_NODE':
      return { ...state, node: action.payload };
    case 'SET_NETWORK_TYPE':
      return { ...state, networkType: action.payload };
    default:
      return state;
  }
};
