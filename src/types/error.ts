import { AlertStripeType } from 'nav-frontend-alertstriper';

import { Feilkode } from './feilkode';

export interface HTTPError {
    code: number;
    text: string;
}

export interface AlertError extends HTTPError {
    type: AlertStripeType;
    feilkode?: Feilkode | null;
    antallResterendeForsoek: number | null;
}
