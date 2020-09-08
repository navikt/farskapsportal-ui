import { AlertStripeType } from 'nav-frontend-alertstriper';

export interface HTTPError {
    code: number;
    text: string;
}

export interface AlertError extends HTTPError {
    type: AlertStripeType;
}
