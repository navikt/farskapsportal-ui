import { Foreldrerolle } from './foreldrerolle';

export interface Forelder {
    forelderRolle: Foreldrerolle | null;
    foedselsnummer: string;
    fornavn: string;
    mellomnavn: string | null;
    etternavn: string;
}
