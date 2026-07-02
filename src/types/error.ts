import { Feilkode } from './feilkode';

export interface HTTPError {
    code: number;
    text: string;
}

export interface AlertError extends HTTPError {
    type: 'feil' | 'advarsel' | 'info' | 'suksess';
    feilkode?: Feilkode | null;
    antallResterendeForsoek: number | null;
    tidspunktForNullstillingAvForsoek: string | null;
}
