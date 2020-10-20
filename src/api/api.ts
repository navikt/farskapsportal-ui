import Cookies from 'js-cookie';

import { AlertError } from 'types/error';
import { Kjoenn } from 'types/kjoenn';
import { redirectLoginCookie } from 'utils/cookies';
import { logApiError } from 'utils/logger';

const { LOGIN_URL } = window as never;

/*
 * AUTH
 * Henter informasjon om bruker.
 * Logger ikke 401 eller 403 feil da det forventes.
 * */
export const checkAuthFetchUser = () => {
    const url = '/api/kjoenn';

    return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        credentials: 'include',
    })
        .then(checkAuth)
        .then(checkHttpError)
        .then((res) => res.text() as Promise<Kjoenn>)
        .catch((err: string & AlertError) => {
            const error = {
                code: err.code || 404,
                type: err.type || 'feil',
                text: err.text || err,
            };
            if (error.code !== 401 && error.code !== 403) {
                logApiError(url, error);
            }
            throw error;
        });
};

/*
 * GET
 * */
// const checkAuthFetchJson = (url: string) =>
//     fetch(url, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json;charset=UTF-8' },
//         credentials: 'include',
//     })
//         .then(checkAuth)
//         .then(checkHttpError)
//         .then(parseJson)
//         .catch((err: string & AlertError) => {
//             const error = {
//                 code: err.code || 404,
//                 type: err.type || 'feil',
//                 text: err.text || err,
//             };
//             logApiError(url, error);
//             throw error;
//         });

/*
 * UTILS
 */
// const parseJson = (response: Response) => response.json();

const checkAuth = (response: Response): Response => {
    if (response.status === 401 || response.status === 403) {
        sendToLogin();
    }

    return response;
};

const sendToLogin = () => {
    const to = window.location.pathname + window.location.hash;
    const inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
    const options = { expires: inFiveMinutes };
    Cookies.set(redirectLoginCookie, to, options);
    window.location.assign(`${LOGIN_URL}?redirect=${window.location.origin}`);
};

const checkHttpError = (response: Response): Response => {
    if (response.ok) {
        return response;
    } else {
        const error = {
            code: response.status,
            text: response.statusText,
        };
        throw error;
    }
};
