import { Language } from 'types/intl';
import { FetchUserInfo } from 'types/user';
import { getCookie, languageCookie } from 'utils/cookies';
import { Action } from './actions';

const getInitialLanguage = () => {
    if (window.location.pathname.includes('/en/')) {
        return 'en';
    }

    if (window.location.pathname.includes('/nn/')) {
        return 'nn';
    }

    if (window.location.pathname.includes('/nb/')) {
        return 'nb';
    }

    const languageFromCookie = getCookie(languageCookie);
    if (languageFromCookie) {
        return languageFromCookie as Language;
    }

    return 'nb';
};

export const initialState: Store = {
    language: getInitialLanguage(),
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
        case 'SET_USER_NOT_PERMITTED':
            return {
                ...state,
                userInfo: {
                    status: 'NOT_PERMITTED',
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
