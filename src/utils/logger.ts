import * as Sentry from '@sentry/react';

import { AlertError } from 'types/error';

export const logApiError = (url: string, error: AlertError) => {
    switch (error.type) {
        case 'advarsel':
            console.warn(url, error);
            break;
        case 'feil':
            console.error(url, error);
            break;
        default:
            console.log(url, error);
            break;
    }

    const errorMessage = `Feil ved henting av data: ${url} - ${error.code} ${error.text}`;

    Sentry.captureMessage(errorMessage);
};
