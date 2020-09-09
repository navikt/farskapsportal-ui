import { AlertError } from 'types/error';
import { logApiError } from 'utils/logger';

const {
    REACT_APP_INNLOGGINGSLINJE_URL,
    REACT_APP_LOGINSERVICE_URL,
    REACT_APP_URL,
} = process.env;

export const checkAuthFetchAuth = () => {
    const url = `${REACT_APP_INNLOGGINGSLINJE_URL}`;
    return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        credentials: 'include',
    })
        .then(checkAuth)
        .then(checkHttpError)
        .then(parseJson)
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
 *   UTILS
 */
const parseJson = (response: Response) => response.json();

const checkAuth = (response: Response): Response => {
    if (response.status === 401 || response.status === 403) {
        sendToLogin();
    }

    return response;
};

export const sendToLogin = () => {
    window.location.assign(
        `${REACT_APP_LOGINSERVICE_URL}?redirect=${REACT_APP_URL}`
    );
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
