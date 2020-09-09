import { AlertError } from 'types/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { frontendlogger } = window as any;

export const logApiError = (url: string, err: AlertError) => {
    switch (err.type) {
        case 'advarsel':
            console.warn(url, err);
            break;
        case 'feil':
            console.error(url, err);
            break;
        default:
            console.log(url, err);
            break;
    }

    const error = `Feil ved henting av data: ${url} - ${err.code} ${err.text}`;
    const title = 'farskapsportal.apiclient.error';

    const tags = {};
    const fields = {
        status: err.code,
        statusText: err.text,
        url,
    };

    if (frontendlogger) {
        frontendlogger.error(error);
        frontendlogger.event(title, fields, tags);
    }
};
