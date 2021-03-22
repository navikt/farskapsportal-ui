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

export interface OppdatereFarskapserklaeringResponse {
    oppdatertFarskapserklaeringDto: Farskapserklaering;
}

/*
 * OUTBOUND
 */
export type Outbound =
    | KontrollerePersonopplysningerRequest
    | OppretteFarskaperklaeringRequest
    | OppdatereFarskapserklaeringRequest;

export interface KontrollerePersonopplysningerRequest {
    foedselsnummer: string;
    navn: string;
}

export interface OppretteFarskaperklaeringRequest {
    barn: Barn;
    morBorSammenMedFar: boolean;
    opplysningerOmFar: KontrollerePersonopplysningerRequest;
}

export interface OppdatereFarskapserklaeringRequest {
    borSammen: boolean;
    idFarskapserklaering: number;
}
