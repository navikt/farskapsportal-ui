import { Barn } from './barn';
import { Farskapserklaering } from './farskapserklaering';
import { Feilkode } from './feilkode';
import { Foreldrerolle } from './foreldrerolle';
import { Skriftspraak } from './skriftspraak';

/*
 * INBOUND
 */
export interface FarskapserklaeringFeilResponse {
    feilkode: Feilkode | null;
    feilkodebeskrivelse: string | null;
    antallResterendeForsoek: number | null;
    tidspunktForNullstillingAvForsoek: string | null;
}

export interface BrukerinformasjonResponse {
    avventerSigneringBruker: Farskapserklaering[] | null;
    avventerSigneringMotpart: Farskapserklaering[] | null;
    avventerRegistrering: Farskapserklaering[] | null;
    fnrNyligFoedteBarnUtenRegistrertFar: string[] | null;
    forelderrolle: Foreldrerolle;
    brukersFornavn: string | null;
    gyldigForelderrolle: boolean;
    kanOppretteFarskapserklaering: boolean;
}

export interface OppretteFarskapserklaeringResponse {
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
    opplysningerOmFar: KontrollerePersonopplysningerRequest;
    skriftspraak: Skriftspraak;
}

export interface OppdatereFarskapserklaeringRequest {
    farBorSammenMedMor: boolean;
    idFarskapserklaering: number;
}
