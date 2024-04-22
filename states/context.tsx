import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';

import { reducer, initialState } from './reducer';
import { AppState } from './types';

import useUpdateEffect from '@/hooks/useUpdateEffect';

interface StateContextType {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const storedState = await loadState();
      dispatch({ type: 'LOAD_STATE', payload: storedState || initialState });
    })();
  }, []);

  useUpdateEffect(() => {
    saveState(state);
  }, [state]);

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

const saveState = (state: AppState) => {
  AsyncStorage.default.setItem('state', JSON.stringify(state));
};

const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.default.getItem('state');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    // エラー処理
    console.error('Stateの読み込みに失敗しました。', error);
    return undefined;
  }
};
