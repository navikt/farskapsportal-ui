import Cookies from 'js-cookie';

import { Outbound, OutboundFather, OutboundOpprettFarskapserklaering } from 'types/api';
import { AlertError } from 'types/error';
import { UserInfo } from 'types/user';
import { redirectLoginCookie } from 'utils/cookies';
import { logApiError } from 'utils/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { LOGIN_URL } = window as any;

/*
 * GET
 * */
export const checkAuthFetchUser = () => {
    const url = '/api/brukerinformasjon';

    // Logger ikke 401 eller 403 feil da det forventes.
    const onlyLogErrorOn = (errorCode: number) => errorCode !== 401 && errorCode !== 403;

    return checkAuthFetchJson(url, onlyLogErrorOn) as Promise<UserInfo>;
};

const checkAuthFetchJson = (url: string, onlyLogErrorOn?: (errorCode: number) => boolean) =>
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
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

            if (!onlyLogErrorOn || onlyLogErrorOn(error.code)) {
                logApiError(url, error);
            }

            throw error;
        });

/*
 *   POST
 */
export const controlFatherInfo = (data: OutboundFather) => {
    const url = '/api/personopplysninger/far';

    // TODO: endre kode?
    // Logger ikke hvis det er forventet feil, f eks person er kvinne eller person er ikke funnet
    const onlyLogErrorOn = (errorCode: number) => errorCode !== 400;

    return checkAuthPostJson(url, data, onlyLogErrorOn);
};

export const opprettFarskapserklaering = (data: OutboundOpprettFarskapserklaering) => {
    const url = '/api/farskapserklaering/ny';

    return checkAuthPostJson(url, data);
};

const checkAuthPostJson = (
    url: string,
    data: Outbound,
    onlyLogErrorOn?: (errorCode: number) => boolean
) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    })
        .then(checkAuth)
        .then(checkHttpError)
        .catch((err: string & AlertError) => {
            const error = {
                code: err.code || 404,
                type: err.type || 'feil',
                text: err.text || err,
            };

            if (!onlyLogErrorOn || onlyLogErrorOn(error.code)) {
                logApiError(url, error);
            }

            throw error;
        });
};

/*
 * UTILS
 */
const parseJson = (response: Response) => response.json();

const checkAuth = (response: Response): Response => {
    if (response.status === 401 || response.status === 403) {
        sendToLogin();
    }

    return response;
};

const sendToLogin = () => {
    const to = window.location.pathname + window.location.hash;
    const inFiveMinutes = new Date(Date.now() + 5 * 60 * 1000);
    const options = { expires: inFiveMinutes };
    Cookies.set(redirectLoginCookie, to, options);
    window.location.assign(`${LOGIN_URL}?redirect=${window.location.origin}`);
};

const checkHttpError = async (response: Response): Promise<Response> => {
    if (response.ok) {
        return response;
    } else {
        const responseErrorData = await parseJson(response);
        const error = {
            code: response.status,
            text: responseErrorData.body,
        };
        throw error;
    }
};
