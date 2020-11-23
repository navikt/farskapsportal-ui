import { createContext, Dispatch, ReactNode, Reducer, useContext, useReducer } from 'react';

import { Action } from './actions';
import { Store } from './store';

interface Props {
    reducer: Reducer<Store, Action>;
    initialState: Store;
    children: ReactNode;
}

const StoreContext = createContext({} as [Store, Dispatch<Action>]);

export function StoreProvider({ reducer, initialState, children }: Props) {
    return (
        <StoreContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStore = () => useContext(StoreContext);
