import { HTTPError } from 'types/error';
import { Language } from 'types/intl';
import { FetchUserInfo, UserInfo } from 'types/user';

export const initialState: Store = {
    locale: 'nb',
    userInfo: { status: 'PENDING' } as FetchUserInfo,
};

export interface Store {
    locale: Language;
    userInfo: FetchUserInfo;
}

export type Action =
    | { type: 'SET_LOCALE'; payload: Language }
    | { type: 'SET_USER_SUCCESS'; payload: UserInfo }
    | { type: 'SET_USER_FAILURE'; payload: HTTPError };

export const reducer = (state: Store, action: Action): Store => {
    switch (action.type) {
        case 'SET_LOCALE':
            return {
                ...state,
                locale: action.payload,
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
