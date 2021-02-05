import { HTTPError } from './error';
import { Farskapserklaering } from './farskapserklaering';
import { Feilkode } from './feilkode';
import { Foreldrerolle } from './foreldrerolle';

export type FetchUserInfo =
    | { status: 'PENDING' }
    | { status: 'SUCCESS'; data: UserInfo }
    | { status: 'FAILURE'; error: HTTPError };

export interface UserInfo {
    farsVentendeFarskapserklaeringer: Farskapserklaering[] | null;
    feilkodeTilgang: Feilkode | null;
    fnrNyligFoedteBarnUtenRegistrertFar: string[] | null;
    forelderrolle: Foreldrerolle;
    gyldigForelderrolle: boolean;
    kanOppretteFarskapserklaering: boolean;
    morsVentendeFarskapserklaeringer: Farskapserklaering[] | null;
}
