import { Barn } from './barn';
import { Farskapserklaering } from './farskapserklaering';
import { Feilkode } from './feilkode';
import { Foreldrerolle } from './foreldrerolle';

/*
 * INBOUND
 */
export interface FarskapserklaeringFeilResponse {
    feilkode: Feilkode | null;
    feilkodebeskrivelse: string | null;
    antallResterendeForsoek: number | null;
}

export interface BrukerinformasjonResponse {
    avventerSigneringBruker: Farskapserklaering[] | null;
    avventerSigneringMotpart: Farskapserklaering[] | null;
    avventerRegistrering: Farskapserklaering[] | null;
    fnrNyligFoedteBarnUtenRegistrertFar: string[] | null;
    forelderrolle: Foreldrerolle;
    gyldigForelderrolle: boolean;
    kanOppretteFarskapserklaering: boolean;
}

export interface OppretteFarskapserklaeringResponse {
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
    morBorSammenMedFar: boolean;
    opplysningerOmFar: KontrollerePersonopplysningerRequest;
}
