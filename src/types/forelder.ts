import { Foreldrerolle } from './foreldrerolle';

export interface Forelder {
    etternavn: string;
    foedselsnummer: string;
    forelderrolle: Foreldrerolle | null;
    fornavn: string;
    mellomnavn: string | null;
}
