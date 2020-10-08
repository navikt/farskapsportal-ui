import { AlertError } from 'types/error';
import { Kjoenn } from 'types/kjoenn';
import { logApiError } from 'utils/logger';

const { REACT_APP_LOGINSERVICE_URL, REACT_APP_URL } = process.env;

export const fetchUser = () => checkAuthFetchJson('/api/kjoenn') as Promise<Kjoenn>;

const checkAuthFetchJson = (url: string) =>
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        credentials: 'include',
    })
        .then(checkAuth)
        .then(checkHttpError)
        // .then(parseJson)
        .then((res) => res.text())
        .catch((err: string & AlertError) => {
            const error = {
                code: err.code || 404,
                type: err.type || 'feil',
                text: err.text || err,
            };
            logApiError(url, error);
            throw error;
        });

/*
 *   UTILS
 */
// const parseJson = (response: Response) => response.json();

const checkAuth = (response: Response): Response => {
    if (response.status === 401 || response.status === 403) {
        sendToLogin();
    }

    return response;
};

const sendToLogin = () => {
    window.location.assign(`${REACT_APP_LOGINSERVICE_URL}?redirect=${REACT_APP_URL}`);
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
