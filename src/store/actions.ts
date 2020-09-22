import { HTTPError } from 'types/error';
import { Language } from 'types/intl';
import { UserInfo } from 'types/user';

export type Action =
    | { type: 'SET_LANGUAGE'; payload: Language }
    | { type: 'SET_USER_SUCCESS'; payload: UserInfo }
    | { type: 'SET_USER_FAILURE'; payload: HTTPError };

export const setLanguage = (language: Language): Action => ({ type: 'SET_LANGUAGE', payload: language });

export const setUserSuccess = (userInfo: UserInfo): Action => ({ type: 'SET_USER_SUCCESS', payload: userInfo });
export const setUserFailure = (error: HTTPError): Action => ({ type: 'SET_USER_FAILURE', payload: error });
