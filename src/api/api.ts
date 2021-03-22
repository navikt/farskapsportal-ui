import {
    Outbound,
    KontrollerePersonopplysningerRequest,
    OppretteFarskaperklaeringRequest,
    OppretteFarskapserklaeringResponse,
    OppdatereFarskapserklaeringRequest,
    OppdatereFarskapserklaeringResponse,
} from 'types/api';
import { AlertError } from 'types/error';
import { Farskapserklaering } from 'types/farskapserklaering';
import { UserInfo } from 'types/user';
import { redirectLoginCookie, setCookie } from 'utils/cookies';
import { logApiError } from 'utils/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { LOGIN_URL } = window as any;

/*
 * GET
 */
export const checkAuthFetchUser = () => {
    const url = '/api/brukerinformasjon';

    // Logger ikke 401 eller 403 feil da det forventes.
    const onlyLogErrorOn = (errorCode: number) => errorCode !== 401 && errorCode !== 403;

    return performGet(url, onlyLogErrorOn) as Promise<UserInfo>;
};

const performGet = (url: string, onlyLogErrorOn?: (errorCode: number) => boolean) =>
    performApiCall('GET', url, undefined, onlyLogErrorOn).then(parseJson);

/*
 *   POST
 */
export const controlFatherInfo = (data: KontrollerePersonopplysningerRequest) => {
    const url = '/api/personopplysninger/far';

    // TODO: endre kode?
    // Logger ikke hvis det er forventet feil, f eks person er kvinne eller person er ikke funnet
    const onlyLogErrorOn = (errorCode: number) => errorCode !== 400;

    return performPost(url, data, onlyLogErrorOn);
};

export const opprettFarskapserklaering = (data: OppretteFarskaperklaeringRequest) => {
    const url = '/api/farskapserklaering/ny';

    return performPost(url, data).then(parseJson) as Promise<OppretteFarskapserklaeringResponse>;
};

export const setSigneringStatusToken = (statusToken: string) => {
    const url = `/api/farskapserklaering/redirect?status_query_token=${statusToken}`;

    return performPost(url).then(parseJson) as Promise<Farskapserklaering>;
};

const performPost = (
    url: string,
    data?: Outbound,
    onlyLogErrorOn?: (errorCode: number) => boolean
) => performApiCall('POST', url, data, onlyLogErrorOn);

/*
 *   PUT
 */
export const oppdaterFarskapserklaering = (data: OppdatereFarskapserklaeringRequest) => {
    const url = '/api/farskapserklaering/oppdatere';

    return performPut(url, data).then(parseJson) as Promise<OppdatereFarskapserklaeringResponse>;
};

const performPut = (
    url: string,
    data?: Outbound,
    onlyLogErrorOn?: (errorCode: number) => boolean
) => performApiCall('PUT', url, data, onlyLogErrorOn);

/*
 * UTILS
 */
const performApiCall = (
    method: 'GET' | 'PUT' | 'POST',
    url: string,
    data?: Outbound,
    onlyLogErrorOn?: (errorCode: number) => boolean
) =>
    fetch(url, {
        method: method,
        body: data ? JSON.stringify(data) : undefined,
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
            text: responseErrorData.headers?.['Warning']?.[0] ?? '',
        };
        throw error;
    }
};
