import { HTTPError } from 'types/error';
import { Feilkode } from 'types/feilkode';
import { Language } from 'types/intl';
import { UserInfo } from 'types/user';

export type Action =
    | { type: 'SET_LANGUAGE'; payload: Language }
    | { type: 'SET_USER_SUCCESS'; payload: UserInfo }
    | { type: 'SET_USER_NOT_PERMITTED'; payload: Feilkode }
    | { type: 'SET_USER_FAILURE'; payload: HTTPError };

export const setLanguage = (language: Language): Action => ({
    type: 'SET_LANGUAGE',
    payload: language,
});

export const setUserSuccess = (userInfo: UserInfo): Action => ({
    type: 'SET_USER_SUCCESS',
    payload: userInfo,
});
export const setUserNotPermitted = (feilkode: Feilkode): Action => ({
    type: 'SET_USER_NOT_PERMITTED',
    payload: feilkode,
});
export const setUserFailure = (error: HTTPError): Action => ({
    type: 'SET_USER_FAILURE',
    payload: error,
});
