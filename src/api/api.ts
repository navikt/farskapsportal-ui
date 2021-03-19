import {
    Outbound,
    KontrollerePersonopplysningerRequest,
    OppretteFarskaperklaeringRequest,
    OppretteFarskapserklaeringResponse,
} from 'types/api';
import { AlertError } from 'types/error';
import { Farskapserklaering } from 'types/farskapserklaering';
import { UserInfo } from 'types/user';
import { redirectLoginCookie, setCookie } from 'utils/cookies';
import { isUserNotPermitted } from 'utils/feilkoder';
import { logApiError } from 'utils/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { LOGIN_URL } = window as any;

/*
 * GET
 */
export const checkAuthFetchUser = () => {
    const url = '/api/brukerinformasjon';

    const onlyLogErrorOn = (error: AlertError) => {
        // Logger ikke 400 hvis feilkoden er forventet. F.eks. bruker er under 18 år eller gift
        if (isUserNotPermitted(error)) {
            return false;
        }

        // Logger ikke 401 eller 403 feil da det forventes.
        return error.code !== 401 && error.code !== 403;
    };

    return checkAuthFetchJson(url, onlyLogErrorOn) as Promise<UserInfo>;
};

const checkAuthFetchJson = (url: string, onlyLogErrorOn?: (error: AlertError) => boolean) =>
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
                text: err.text || err,
                type: err.type || 'feil',
                feilkode: err.feilkode,
            };

            if (!onlyLogErrorOn || onlyLogErrorOn(error)) {
                logApiError(url, error);
            }

            throw error;
        });

/*
 *   POST
 */
export const controlFatherInfo = (data: KontrollerePersonopplysningerRequest) => {
    const url = '/api/personopplysninger/far';

    // TODO: endre kode?
    // Logger ikke hvis det er forventet feil, f eks person er kvinne eller person er ikke funnet
    const onlyLogErrorOn = (error: AlertError) => error.code !== 400;

    return checkAuthPostJson(url, data, onlyLogErrorOn);
};

export const opprettFarskapserklaering = (data: OppretteFarskaperklaeringRequest) => {
    const url = '/api/farskapserklaering/ny';

    return checkAuthPostJson(url, data).then(
        parseJson
    ) as Promise<OppretteFarskapserklaeringResponse>;
};

export const setSigneringStatusToken = (statusToken: string) => {
    const url = `/api/farskapserklaering/redirect?status_query_token=${statusToken}`;

    return checkAuthPostJson(url).then(parseJson) as Promise<Farskapserklaering>;
};

const checkAuthPostJson = (
    url: string,
    data?: Outbound,
    onlyLogErrorOn?: (error: AlertError) => boolean
) =>
    fetch(url, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    })
        .then(checkAuth)
        .then(checkHttpError)
        .catch((err: string & AlertError) => {
            const error = {
                code: err.code || 404,
                text: err.text || err,
                type: err.type || 'feil',
                feilkode: err.feilkode,
            };

            if (!onlyLogErrorOn || onlyLogErrorOn(error)) {
                logApiError(url, error);
            }

            throw error;
        });

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
    const redirectTo = window.location.pathname + window.location.search + window.location.hash;
    const inFiveMinutes = new Date(Date.now() + 5 * 60 * 1000);
    setCookie(redirectLoginCookie, redirectTo, inFiveMinutes);
    window.location.assign(`${LOGIN_URL}?redirect=${window.location.origin}`);
};

const checkHttpError = async (response: Response): Promise<Response> => {
    if (response.ok) {
        return response;
    } else {
        const responseErrorData = await parseJson(response);
        const error = {
            code: response.status,
            text: responseErrorData.feilkodebeskrivelse,
            feilkode: responseErrorData.feilkode,
        };
        throw error;
    }
};
