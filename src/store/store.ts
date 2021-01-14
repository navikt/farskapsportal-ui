import { Language } from 'types/intl';
import { FetchUserInfo } from 'types/user';
import { Action } from './actions';

const initialLanguage = window.location.pathname.includes('/en')
    ? 'en'
    : window.location.pathname.includes('/nn')
    ? 'nn'
    : 'nb';

export const initialState: Store = {
    language: initialLanguage,
    userInfo: { status: 'PENDING' },
};

export interface Store {
    language: Language;
    userInfo: FetchUserInfo;
}

export const reducer = (state: Store, action: Action): Store => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.payload,
            };
        case 'SET_USER_SUCCESS':
            return {
                ...state,
                userInfo: {
                    status: 'SUCCESS',
                    data: action.payload,
                },
            };
        case 'SET_USER_FAILURE':
            return {
                ...state,
                userInfo: {
                    status: 'FAILURE',
                    error: action.payload,
                },
            };
        default:
            return state;
    }
};
