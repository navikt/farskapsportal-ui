import { Foreldrerolle } from './foreldrerolle';

export interface Forelder {
    foedselsnummer: string;
    forelderrolle: Foreldrerolle | null;
    navn: Navn | null;
}

export interface Navn {
    fornavn: string;
    etternavn: string;
    mellomnavn: string | null;
}
