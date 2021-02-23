import { Barn } from './barn';
import { Farskapserklaering } from './farskapserklaering';
import { Feilkode } from './feilkode';
import { Foreldrerolle } from './foreldrerolle';

/*
 * INBOUND
 */
export interface BrukerinformasjonResponse {
    avventerSigneringBruker: Farskapserklaering[] | null;
    avventerSigneringMotpart: Farskapserklaering[] | null;
    avventerRegistrering: Farskapserklaering[] | null;
    feilkodeTilgang: Feilkode | null;
    fnrNyligFoedteBarnUtenRegistrertFar: string[] | null;
    forelderrolle: Foreldrerolle;
    gyldigForelderrolle: boolean;
    kanOppretteFarskapserklaering: boolean;
}

interface FarskapserklaeringResponse {
    feilkodeTilgang: Feilkode | null;
}

export interface OppretteFarskapserklaeringResponse extends FarskapserklaeringResponse {
    redirectUrlForSigneringMor: string;
}

/*
 * OUTBOUND
 */
export type Outbound = KontrollerePersonopplysningerRequest | OppretteFarskaperklaeringRequest;

export interface KontrollerePersonopplysningerRequest {
    foedselsnummer: string;
    navn: string;
}

export interface OppretteFarskaperklaeringRequest {
    barn: Barn;
    opplysningerOmFar: KontrollerePersonopplysningerRequest;
    borSammen: boolean;
}
