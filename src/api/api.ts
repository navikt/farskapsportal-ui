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
import { isControlFatherValidationError, isUserNotPermitted } from 'utils/feilkoder';
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

    return performGet(url, onlyLogErrorOn).then(parseJson) as Promise<UserInfo>;
};

export const downloadSignedDocument = (erklaeringId: number) => {
    const url = `/api/farskapserklaering/${erklaeringId}/dokument`;

    return performGet(url, undefined).then(parseBlob) as Promise<Blob>;
};

/*
 *   POST
 */
export const controlFatherInfo = (data: KontrollerePersonopplysningerRequest) => {
    const url = '/api/personopplysninger/far';

    // Logger ikke hvis det er forventet feil, f eks person er kvinne eller person er ikke funnet
    const onlyLogErrorOn = (error: AlertError) => !isControlFatherValidationError(error);

    return performPost(url, data, onlyLogErrorOn);
};

export const opprettFarskapserklaering = (data: OppretteFarskaperklaeringRequest) => {
    const url = '/api/farskapserklaering/ny';

    return performPost(url, data).then(parseJson) as Promise<OppretteFarskapserklaeringResponse>;
};

export const getNewRedirectUrl = (erklaeringId: string) => {
    const url = `/api/redirect-url/ny?id_farskapserklaering=${erklaeringId}`;

    return performPost(url).then((res) => res.text()) as Promise<string>;
};

/*
 *   PUT
 */
export const setSigneringStatusToken = (statusToken: string, erklaeringId: string) => {
    const url = `/api/farskapserklaering/redirect?id_farskapserklaering=${erklaeringId}&status_query_token=${statusToken}`;

    return performPut(url).then(parseJson) as Promise<Farskapserklaering>;
};

export const oppdaterFarskapserklaering = (data: OppdatereFarskapserklaeringRequest) => {
    const url = '/api/farskapserklaering/oppdatere';

    return performPut(url, data).then(parseJson) as Promise<OppdatereFarskapserklaeringResponse>;
};

/*
 * UTILS
 */
const performGet = (url: string, onlyLogErrorOn?: (error: AlertError) => boolean) =>
    performApiCall('GET', url, undefined, onlyLogErrorOn);

const performPost = (
    url: string,
    data?: Outbound,
    onlyLogErrorOn?: (error: AlertError) => boolean
) => performApiCall('POST', url, data, onlyLogErrorOn);

const performPut = (
    url: string,
    data?: Outbound,
    onlyLogErrorOn?: (error: AlertError) => boolean
) => performApiCall('PUT', url, data, onlyLogErrorOn);

const performApiCall = (
    method: 'GET' | 'PUT' | 'POST',
    url: string,
    data?: Outbound,
    onlyLogErrorOn?: (error: AlertError) => boolean
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
                text: err.text || err,
                type: err.type || 'feil',
                feilkode: err.feilkode,
                antallResterendeForsoek: err.antallResterendeForsoek,
                tidspunktForNullstillingAvForsoek: err.tidspunktForNullstillingAvForsoek,
            };

            if (!onlyLogErrorOn || onlyLogErrorOn(error)) {
                logApiError(url, error);
            }

            throw error;
        });

const parseJson = (response: Response) => response.json();

const parseBlob = (response: Response) => response.blob();

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
            antallResterendeForsoek: responseErrorData.antallResterendeForsoek,
            tidspunktForNullstillingAvForsoek: responseErrorData.tidspunktForNullstillingAvForsoek,
        };
        throw error;
    }
};
